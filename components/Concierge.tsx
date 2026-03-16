import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { sendMessageToConcierge } from '../services/geminiService';
import { ChatMessage, LoadingState } from '../types';

export const Concierge: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: t('concierge.initialMessage'), timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) setTimeout(() => {
      if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, 100);
  }, [messages.length]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || loadingState === LoadingState.LOADING) return;
    const userMsg: ChatMessage = { role: 'user', text: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoadingState(LoadingState.LOADING);
    try {
      const text = await sendMessageToConcierge(userMsg.text);
      setMessages(prev => [...prev, { role: 'model', text, timestamp: new Date() }]);
      setLoadingState(LoadingState.SUCCESS);
    } catch {
      setLoadingState(LoadingState.ERROR);
      setMessages(prev => [...prev, { role: 'model', text: t('concierge.errorMessage'), timestamp: new Date() }]);
    }
  };

  return (
    <section id="concierge" className="py-16 md:py-28 bg-sardinia-dark">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left: description */}
          <div className="lg:col-span-1 reveal">
            <p className="text-sardinia-accent text-[11px] tracking-[0.25em] uppercase mb-4">Assistente</p>
            <h2 className="font-serif text-white font-light leading-tight mb-6" style={{ fontSize: 'clamp(28px,3vw,40px)' }}>
              {t('concierge.title')}
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">{t('concierge.subtitle')}</p>
          </div>

          {/* Right: chat */}
          <div className="lg:col-span-2 reveal reveal-d1">
            <div className="border border-white/10 bg-sardinia-dark flex flex-col" style={{ height: '460px' }}>
              {/* Messages */}
              <div ref={chatRef} className="flex-1 overflow-y-auto p-5 space-y-4 chat-scroll bg-black/20">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-sardinia-terra text-white'
                        : 'bg-white/8 border border-white/10 text-white/80'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loadingState === LoadingState.LOADING && (
                  <div className="flex justify-start">
                    <div className="bg-white/8 border border-white/10 px-4 py-3">
                      <div className="flex gap-1.5">
                        {[0,1,2].map(i => (
                          <div key={i} className="w-1.5 h-1.5 bg-sardinia-accent/60 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-white/10 p-4">
                <form onSubmit={handleSend} className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder={t('concierge.placeholder')}
                    className="flex-1 bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-2.5 text-sm outline-none focus:border-sardinia-accent/50 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loadingState === LoadingState.LOADING || !inputValue.trim()}
                    className="bg-sardinia-terra text-white px-5 py-2.5 text-xs font-medium tracking-widest uppercase hover:bg-sardinia-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {t('concierge.send')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
