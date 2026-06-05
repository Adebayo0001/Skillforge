import { useState } from 'react';
import { HelpCircle, ChevronDown, Check, ShieldCheck, HelpCircleIcon } from 'lucide-react';
import { FAQS } from '../data';

export default function PricingFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="pricing-and-faqs" className="py-20 bg-white text-navy-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14" id="pricing-hdr-container">
          <span className="text-xs sm:text-sm font-extrabold text-[#F59E0B] tracking-[0.2em] uppercase font-mono">
            TUITION & GENERAL POLICIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2044] mt-2 tracking-tight">
            Straightforward pricing
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-3 leading-relaxed">
            All courses are priced individually. No monthly active subscriptions. No hidden surprises or extra exam fees.
          </p>
        </div>

        {/* Pricing Range Tagcard */}
        <div 
          id="pricing-billing-card"
          className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-navy-900 to-[#1e293b] text-white text-center shadow-xl border border-white/5 mb-16 relative overflow-hidden"
        >
          {/* Anvil shape backdrop pattern */}
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

          <p className="text-xs font-bold text-amber-400 tracking-widest uppercase font-mono">
            TUITION SCHEDULE
          </p>
          <h3 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">
            Courses from ₦25,000 to ₦150,000
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-md mx-auto leading-relaxed">
            Pick only the skills you need today. Gain lifetime syllabus materials, community access, and custom certificate verification codes upon course completion.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 mt-6 pt-6 border-t border-white/10 text-xs text-gray-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              50/50 Instalment Available
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              7-Day Refund Period
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              Verified Certificate Code
            </span>
          </div>
        </div>

        {/* Accordion FAQ Grid */}
        <div className="mt-12 text-left max-w-3xl mx-auto" id="faq-accordion-block">
          <h3 className="text-xl font-bold font-sans text-navy-950 mb-6 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
            <HelpCircleIcon className="w-5 h-5 text-amber-500 shrink-0" />
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index}
                  id={`faq-item-${index}`}
                  className="rounded-xl border border-gray-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <button
                    id={`btn-faq-toggle-${index}`}
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-4.5 text-left text-navy-950 font-extrabold text-sm sm:text-base leading-snug cursor-pointer focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown 
                      className={`w-4 h-4 text-gray-400 shrink-0 transform transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-amber-500' : ''
                      }`} 
                    />
                  </button>
                  
                  {/* Expandable segment */}
                  {isOpen && (
                    <div 
                      id={`faq-answer-${index}`}
                      className="px-4.5 pb-4 leading-relaxed text-xs sm:text-sm text-gray-500 border-t border-gray-100/50 pt-2 animate-fade-in"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
