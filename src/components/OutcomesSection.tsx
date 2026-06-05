import { Quote, Briefcase, TrendingUp, DollarSign } from 'lucide-react';
import { OUTCOME_CARDS } from '../data';

export default function OutcomesSection() {
  // Give each student card a custom background accent indicator
  const ICONS = [
    <TrendingUp className="w-5 h-5 text-emerald-500" />,
    <Briefcase className="w-5 h-5 text-blue-500" />,
    <DollarSign className="w-5 h-5 text-amber-500" />
  ];

  return (
    <section id="outcomes-section" className="py-20 bg-white border-t border-gray-50 text-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-extrabold text-[#F59E0B] tracking-[0.2em] uppercase font-mono">
            STUDENT RESULTS
          </span>
          <h2 className="text-3xl sm:text-4.5xl font-extrabold text-[#0f2044] mt-3 tracking-tight leading-tight">
            What happens after you complete a course
          </h2>
          <p className="text-base text-gray-500 mt-4 leading-relaxed max-w-xl mx-auto">
            Our curricula are structured for application, not just completion. See how active graduates transformed their day-to-day work.
          </p>
        </div>

        {/* Outcomes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {OUTCOME_CARDS.map((student, idx) => (
            <div 
              key={student.id}
              id={`outcome-card-${student.id}`}
              className="flex flex-col h-full bg-slate-50/50 rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
            >
              {/* Picture & Highlight Segment */}
              <div className="relative h-64 bg-slate-900 overflow-hidden">
                <img 
                  src={student.imageUrl} 
                  alt={student.studentName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Float indicator logo */}
                <div className="absolute top-4 right-4 p-2 bg-white rounded-xl shadow-md z-10 flex items-center justify-center">
                  {ICONS[idx]}
                </div>

                {/* Name & Outcome Label overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#F59E0B] uppercase">
                    SUCCESS STORY
                  </span>
                  <h3 className="text-lg font-black text-white mt-1 leading-tight">
                    {student.studentName}
                  </h3>
                  <p className="text-xs text-white/80 font-medium font-mono mt-0.5">
                    {student.relativeTimeText}
                  </p>
                </div>
              </div>

              {/* Instagram-style Quote Block */}
              <div className="flex-1 p-6 flex flex-col justify-between text-left">
                <div className="relative">
                  <Quote className="absolute -top-3 -left-2 w-8 h-8 text-amber-500/10 rotate-180" />
                  <p className="text-xs text-gray-600 leading-relaxed font-serif italic relative z-10 pl-5">
                    "{student.quote}"
                  </p>
                </div>

                {/* Promotional Milestone Segment */}
                <div className="mt-6 pt-5 border-t border-gray-100/80">
                  <div className="text-[10px] font-extrabold text-[#0D9488] uppercase tracking-wider font-mono">
                    Career Milestone achieved
                  </div>
                  <p className="text-sm font-black text-navy-950 mt-1 leading-snug">
                    {student.outcomeText}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
