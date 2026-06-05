import { Award, Briefcase, Calendar, GraduationCap } from 'lucide-react';
import { Instructor } from '../types';
import { INSTRUCTORS } from '../data';

interface InstructorSectionProps {
  onSelectInstructor?: (instructor: Instructor) => void;
}

export default function InstructorSection({ onSelectInstructor }: InstructorSectionProps) {
  const featured = INSTRUCTORS.filter(inst => inst.isFeatured);

  return (
    <section id="instructors-homepage-section" className="py-20 bg-white text-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-extrabold text-[#F59E0B] tracking-[0.2em] uppercase font-mono">
            COACHES & MENTORS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2044] mt-2 tracking-tight">
            Learn from practitioners, not just teachers
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-3 leading-relaxed max-w-xl mx-auto">
            Our curators do not run abstract lectures. They are active managers who build products, design infrastructures, and lead fintech teams in Lagos every single day.
          </p>
        </div>

        {/* Instructor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((instructor) => (
            <div 
              key={instructor.id}
              id={`instructor-highlight-card-${instructor.id}`}
              onClick={() => onSelectInstructor?.(instructor)}
              className="group flex flex-col bg-slate-50 border border-gray-100 rounded-2xl p-6 text-left cursor-pointer hover:border-amber-300 hover:shadow-lg transition-all duration-300"
            >
              {/* Photo & Background Ring */}
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-white shadow-md mb-6 shrink-0 bg-white">
                <img 
                  src={instructor.imageUrl} 
                  alt={instructor.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Identity block */}
              <h3 className="text-lg font-black text-navy-950 group-hover:text-amber-600 transition-colors">
                {instructor.name}
              </h3>
              <p className="text-xs font-bold text-gray-500 mt-1 leading-snug">
                {instructor.title} at <span className="text-navy-950">{instructor.company}</span>
              </p>

              {/* Key credential text box */}
              <div className="mt-4 flex items-center gap-1.5 p-2 px-3 rounded bg-amber-500/10 border border-amber-500/5 text-xs text-amber-700 font-bold font-mono">
                <Award className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{instructor.experienceText}</span>
              </div>

              <p className="text-xs text-gray-400 mt-4 leading-relaxed line-clamp-3">
                {instructor.bio}
              </p>

              {/* Counts indicator footer */}
              <div className="mt-6 pt-4 border-t border-gray-200/50 flex justify-between items-center text-xs text-gray-500 font-medium font-mono">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-amber-500" />
                  <span>Curator of {instructor.courseCount} Courses</span>
                </span>
                <span className="text-[11px] font-extrabold text-amber-600 group-hover:underline uppercase tracking-wider">
                  Profile →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
