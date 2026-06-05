import { GraduationCap, Award, Compass, Target, ShieldCheck, Users } from 'lucide-react';

export default function AboutPage() {
  const VALUES = [
    {
      title: 'Action-First Curriculum',
      desc: 'We cut the abstract academic fluff. Every single lesson starts with an active production requirement, meaning you learn by building actual tools, databases, or wireplates.',
      icon: <Target className="w-5 h-5 text-amber-500" />
    },
    {
      title: 'Time-Respecting Architecture',
      desc: 'Scheduled for professionals learning on commutes, during lunch breaks, and between dense office meetings. All lectures are recorded and optimized for bandwidth.',
      icon: <Compass className="w-5 h-5 text-[#0F2044]" />
    },
    {
      title: 'Strict Industry Accountability',
      desc: 'Backed by mentors from Flutterwave, Paystack, and Access Bank. We grade based on genuine business-ready competency to ensure your work stands out.',
      icon: <ShieldCheck className="w-5 h-5 text-amber-500" />
    }
  ];

  return (
    <article id="about-page-wrapper" className="bg-white text-navy-950 min-h-screen">
      
      {/* Editorial Page Header */}
      <header className="relative bg-[#0F2044] text-white py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center sm:text-left relative z-10">
          <span className="text-xs font-extrabold text-amber-400 tracking-[0.2em] font-mono uppercase">
            WHO WE ARE
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mt-3 tracking-tight leading-none text-white">
            We forge competence.
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mt-4 leading-relaxed max-w-2xl">
            SkillForge Academy was founded in Lagos in response to a major systemic disconnect: university classrooms teach abstract theorems, while modern companies pay only for execute-first agility.
          </p>
        </div>
      </header>

      {/* Main Narrative editorial section */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-8 text-left">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Main Story column */}
          <div className="md:col-span-8 space-y-6 text-sm text-gray-600 leading-relaxed" id="about-narrative-p1">
            <h2 className="text-xl font-bold text-navy-950 font-sans tracking-tight mb-2 uppercase border-b border-gray-100 pb-2">
              Our Origin & Vision
            </h2>
            <p>
              Technological platforms like Flutterwave, Paystack, and Access Bank have proven that Nigeria possesses some of the most resilient and ambitious engineering, product, and data minds on earth. Yet, the path to entering these organizations remains heavily obscured by outdated textbooks and predatory certificates.
            </p>
            <p className="font-semibold text-navy-900 border-l-4 border-amber-500 pl-4 bg-slate-50 py-3 rounded-r-lg">
              "We designed SkillForge to be the bridge. Our curriculum is tailored directly alongside active corporate managers who know precisely what skills are in demand this quarter."
            </p>
            <p>
              By focusing heavily on live cohort peer groups and compact portfolios, we make professional training both accountable and achievable. You study when your schedule permits—on your morning commute, between executive align meetings, and during lunch intervals—using assets fully compressed for light bandwidth footprints.
            </p>
          </div>

          {/* Quick Metrics sidebar Column */}
          <div className="md:col-span-4 bg-slate-50 border border-gray-100 rounded-2xl p-6 space-y-6" id="about-metrics-sidebar">
            <h3 className="text-xs font-bold text-navy-950 uppercase tracking-widest font-mono">
              Academy Registry
            </h3>

            <div>
              <div className="text-3xl font-black text-[#F59E0B] font-mono">847+</div>
              <p className="text-xs text-gray-500 mt-1 font-medium">Active Professionals Matriculated</p>
            </div>

            <div className="border-t border-gray-200/50 pt-4">
              <div className="text-3xl font-black text-navy-950 font-mono">12</div>
              <p className="text-xs text-gray-500 mt-1 font-medium">Actionable Engineering & Business Curricula</p>
            </div>

            <div className="border-t border-gray-200/50 pt-4">
              <div className="text-3xl font-black text-emerald-600 font-mono">92%</div>
              <p className="text-xs text-gray-500 mt-1 font-medium">Graduate Retention & Salary Boost</p>
            </div>
          </div>

        </div>
      </section>

      {/* Corporate values segment */}
      <section className="py-16 bg-slate-50 border-t border-b border-gray-100 text-left">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <h2 className="text-2xl font-black text-[#0f2044] mb-8 font-sans tracking-tight">
            How we maintain absolute standards
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((val, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 border border-gray-100 rounded-xl flex flex-col items-start gap-4 hover:shadow-md transition-shadow"
              >
                <div className="p-2.5 bg-amber-50 rounded-lg">
                  {val.icon}
                </div>
                <h3 className="text-sm font-bold text-navy-950 font-sans">
                  {val.title}
                </h3>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Alignment Banner */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-8 text-center" id="about-hiring-alignment">
        <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest font-mono">
          CORPORATE PLACEMENT
        </h3>
        <h2 className="text-2.5xl font-extrabold text-[#0f2044] mt-2 max-w-xl mx-auto">
          Need custom, verified talent for your company?
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-3 leading-relaxed max-w-md mx-auto">
          We work alongside HR directors at Access Bank, MTN, PwC and Flutterwave to provide fast pathways to fully validated product managers, frontend engineers and analysts.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-3 bg-[#0F2044] hover:bg-navy-900 text-white font-bold text-xs sm:text-sm rounded-lg transition-all cursor-pointer">
            Explore Retainer Program
          </button>
          <button className="px-6 py-3 bg-white hover:bg-slate-50 border border-gray-200 text-navy-950 font-semibold text-xs sm:text-sm rounded-lg transition-all cursor-pointer">
            Read Corporate Success Story
          </button>
        </div>
      </section>

    </article>
  );
}
