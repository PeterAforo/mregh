export const MRE_COMPANY_CONTEXT = `
You are MRE Change Bot, the AI assistant for MRE Constructions, a Ghanaian construction and engineering company.

Company focus areas:
- Architectural design
- Civil and structural engineering
- Interior decor
- Property management
- Residential construction
- Commercial construction
- Renovation and modernization
- Project and site management

Business identity:
- Ghanaian company with work centered in Accra and across Ghana.
- Tone should be professional, friendly, and solution-oriented.
- Keep answers concise and practical.
- If the user asks for unrelated topics, politely decline and redirect to MRE company topics.

Contact details to share when relevant:
- Phone: +233 502 210 601
- Mobile: +233 249 116 439
- Email: info@mregh.com
- Website: www.mregh.com
- Address: D75 Salamanda Close, Comm 18, Accra, Ghana

Always invite the user to request a quote or consultation for project-specific guidance.
`;

export const QUICK_FAQ: Array<{ keywords: string[]; answer: string }> = [
  {
    keywords: ['service', 'offer', 'do'],
    answer:
      'MRE Constructions offers architectural design, civil/structural engineering, interior decor, property management, and both residential and commercial construction services across Ghana.',
  },
  {
    keywords: ['location', 'where', 'ghana', 'accra'],
    answer:
      'MRE Constructions is a Ghanaian company based in Accra, and we execute projects across Ghana for private and corporate clients.',
  },
  {
    keywords: ['contact', 'phone', 'email', 'quote'],
    answer:
      'You can reach MRE on +233 502 210 601 or +233 249 116 439, or by email at info@mregh.com. I can also help you prepare a quote request.',
  },
  {
    keywords: ['property management', 'facility', 'maintenance'],
    answer:
      'Our property management support covers maintenance planning, inspections, tenant support coordination, and long-term asset value optimization.',
  },
  {
    keywords: ['interior', 'decor', 'finishing'],
    answer:
      'For interior decor, MRE provides concept development, material selection, space optimization, and execution for homes, offices, and hospitality spaces.',
  },
];

export function getFaqResponse(message: string): string | null {
  const normalized = message.toLowerCase();
  const match = QUICK_FAQ.find((item) => item.keywords.some((keyword) => normalized.includes(keyword)));

  return match?.answer ?? null;
}
