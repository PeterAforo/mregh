import { NextResponse } from 'next/server';
import { MRE_COMPANY_CONTEXT, getFaqResponse } from '@/lib/companyKnowledge';

const OPENAI_URL = 'https://api.openai.com/v1/responses';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    if (!message) {
      return NextResponse.json({ reply: 'Please type a question so I can help.' }, { status: 400 });
    }

    const fallback = getFaqResponse(message);
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply:
          fallback ??
          'I can help with MRE Constructions topics such as architectural, civil/structural engineering, interior decor, property management, and residential/commercial construction. Please share your project type for a tailored answer.',
      });
    }

    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        input: [
          {
            role: 'system',
            content: [{ type: 'input_text', text: MRE_COMPANY_CONTEXT }],
          },
          {
            role: 'user',
            content: [{ type: 'input_text', text: message }],
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({
        reply:
          fallback ??
          'I had trouble reaching the AI service, but I can still help with MRE Constructions services, locations, timelines, and quote preparation.',
      });
    }

    const data = await response.json();
    const reply = typeof data?.output_text === 'string' && data.output_text
      ? data.output_text
      : fallback ?? 'Thanks for your question. Could you share your project type, location, and target budget?';

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      {
        reply:
          'Something went wrong while processing your question. Please try again, or contact MRE directly at info@mregh.com.',
      },
      { status: 500 },
    );
  }
}
