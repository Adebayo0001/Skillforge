import { Search, CreditCard, Users, Award, ChevronRight } from 'lucide-react';

export default function HowItWorks() {
  const STEPS = [
    {
      num: '01',
      title: 'Choose Your Course',
      desc: 'Browse by tech, data, business or creative area and pick your schedule (live cohort accountability or self-paced).',
      icon: <Search className="w-5 h-5 text-amber-500" />
    },
    {
      num: '02',
      title: 'Enrol and Pay',
      desc: 'Secure payment via Paystack integrations in under 2 minutes. Installment options are automatically available at checkout.',
      icon: <CreditCard className="w-5 h-5 text-[#0F2044]" />
    },
    {
      num: '03',
      title: 'Learn With Others',
      desc: 'Join interactive bi-weekly live sessions and access a focused, supportive WhatsApp community of high-ambition peers.',
      icon: <Users className="w-5 h-5 text-amber-500" />
    },
    {
      num: '04',
      title: 'Get Your Certificate',
      desc: 'Complete core portfolio assignments to download and share your official, employer-trusted certificate on LinkedIn.',
      icon: <Award className="w-5 h-5 text-[#0F2044]" />
    }
  ];

  return (
    <section id="how-it-works-section" className="py-20 bg-slate-50 text-navy-950 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-extrabold text-[#F59E0B] tracking-[0.2em] uppercase font-mono">
            THE METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2044] mt-2 tracking-tight">
            How SkillForge Works
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-3 leading-relaxed">
            Four streamlined phases designed specifically for working professionals with busy regular job schedules.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {STEPS.map((step, idx) => (
            <div 
              key={step.num}
              id={`step-card-${step.num}`}
              className="relative flex flex-col items-start bg-white p-6 rounded-2xl border border-gray-100/80 shadow-xs hover:shadow-md transition-all text-left"
            >
              {/* Floating connector lines for desktop */}
              {idx < 3 && (
                <div className="hidden lg:block absolute top-10 -right-4 w-8 border-t-2 border-dashed border-gray-200 z-10" />
              )}

              {/* Number and Icon Header */}
              <div className="flex justify-between items-center w-full mb-6">
                <span className="text-3xl font-extrabold text-slate-100 font-mono leading-none">
                  {step.num}
                </span>
                <div className="p-2.5 bg-amber-50 rounded-xl">
                  {step.icon}
                </div>
              </div>

              {/* Text elements */}
              <h3 className="text-base font-extrabold text-navy-950 font-sans tracking-tight">
                {step.title}
              </h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
