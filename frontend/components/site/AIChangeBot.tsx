'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, SendHorizontal, Sparkles, X } from 'lucide-react';
import { gsap } from 'gsap';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

const SUGGESTIONS = [
  'What services does MRE Constructions offer?',
  'Do you handle structural engineering for commercial buildings?',
  'How can I request a quote in Ghana?',
];

export default function AIChangeBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hi, I'm MRE Change Bot 👷🏾‍♂️. Ask me anything about MRE Constructions in Ghana — services, timelines, project planning, and quote preparation.",
    },
  ]);

  const pulseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!pulseRef.current || open) return;

    const tween = gsap.to(pulseRef.current, {
      boxShadow: '0 0 0 14px rgba(204, 0, 0, 0)',
      repeat: -1,
      duration: 1.8,
      ease: 'power2.out',
    });

    return () => {
      tween.kill();
    };
  }, [open]);

  const canSend = useMemo(() => input.trim().length > 1 && !isLoading, [input, isLoading]);

  const sendMessage = async (messageText: string) => {
    const text = messageText.trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-u`,
      role: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      const reply = typeof data?.reply === 'string' ? data.reply : 'I can help with MRE company-related questions only.';

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-a`,
          role: 'assistant',
          text: reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-e`,
          role: 'assistant',
          text: 'I could not reach the AI service right now. Please try again in a moment.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        ref={pulseRef}
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-white shadow-xl transition hover:bg-brand-red-dark"
        aria-label="Open MRE Change Bot"
      >
        <Bot size={24} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.28 }}
            className="fixed bottom-24 right-6 z-[80] flex h-[70vh] max-h-[620px] w-[92vw] max-w-md flex-col overflow-hidden rounded-2xl border border-white/15 bg-dark-100 shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-white/10 bg-dark-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-brand-red" />
                <p className="text-sm font-semibold text-white">MRE Change Bot</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="text-gray-400 transition hover:text-white" aria-label="Close chat">
                <X size={18} />
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-brand-red text-white'
                        : 'bg-dark-200 text-gray-100 border border-white/10'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isLoading && <p className="text-xs text-gray-400">MRE Change Bot is thinking...</p>}
            </div>

            <div className="border-t border-white/10 px-4 py-3">
              <div className="mb-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => sendMessage(item)}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs text-gray-300 transition hover:border-brand-red/60 hover:text-white"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void sendMessage(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about MRE services, pricing, process..."
                  className="h-11 flex-1 rounded-xl border border-white/10 bg-dark-200 px-3 text-sm text-white outline-none ring-brand-red/40 placeholder:text-gray-500 focus:ring"
                />
                <button
                  type="submit"
                  disabled={!canSend}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red text-white transition hover:bg-brand-red-dark disabled:cursor-not-allowed disabled:bg-gray-600"
                  aria-label="Send message"
                >
                  <SendHorizontal size={16} />
                </button>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
