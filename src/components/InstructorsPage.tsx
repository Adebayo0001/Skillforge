import { Award, Mail, GraduationCap, ChevronRight, Briefcase } from 'lucide-react';
import { Instructor, Course } from '../types';
import { INSTRUCTORS, COURSES } from '../data';

interface InstructorsPageProps {
  onSelectCourse: (course: Course) => void;
}

export default function InstructorsPage({ onSelectCourse }: InstructorsPageProps) {
  return (
    <article id="instructors-page-wrapper" className="bg-white text-navy-950 min-h-screen">
      
      {/* Page Header banner */}
      <header className="relative bg-[#0F2044] text-white py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center sm:text-left relative z-10">
          <span className="text-xs font-extrabold text-amber-400 tracking-[0.2em] font-mono uppercase">
            FACULTY LEADERSHIP
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mt-3 tracking-tight text-white">
            Meet internal architects, not external theorists.
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mt-4 leading-relaxed max-w-2xl">
            Our academy strictly rejects generic lecturers. Every advisor below leads operational product pipelines, manages massive databases, and ships fintech infrastructure in active daily intervals.
          </p>
        </div>
      </header>

      {/* Faculty list columns */}
      <main className="py-16 max-w-4xl mx-auto px-4 sm:px-8 space-y-16">
        {INSTRUCTORS.map((instructor) => {
          // Dynamically obtain courses managed by this instructor
          const taughtCourses = COURSES.filter(c => c.instructorId === instructor.id);

          return (
            <section 
              key={instructor.id}
              id={`faculty-section-${instructor.id}`}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-gray-100 pb-16 last:border-0"
            >
              
              {/* Profile Avatar Column */}
              <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left gap-4">
                <div className="relative w-36 h-36 rounded-2xl overflow-hidden border border-gray-100 shadow-md bg-slate-50">
                  <img 
                    src={instructor.imageUrl} 
                    alt={instructor.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-navy-950 leading-tight">
                    {instructor.name}
                  </h2>
                  <p className="text-xs font-medium text-gray-500 mt-1">
                    {instructor.title}
                  </p>
                  <p className="text-xs font-bold text-amber-600 font-mono mt-0.5">
                    @{instructor.company}
                  </p>
                </div>
              </div>

              {/* Bio & Courses managed column */}
              <div className="md:col-span-8 space-y-6 text-left">
                
                {/* Tenureship box info */}
                <div className="flex flex-wrap gap-2.5">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/5 text-[10px] font-bold font-mono text-amber-800 rounded">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    {instructor.experienceText}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-gray-100 text-[10px] font-bold font-mono text-gray-600 rounded">
                    <Briefcase className="w-3.5 h-3.5 text-navy-900" />
                    Active Practitioner
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-4">
                  <h3 className="text-xs font-bold text-navy-950 uppercase tracking-widest font-mono">
                    Professional Background
                  </h3>
                  <p className="leading-relaxed">
                    {instructor.bio}
                  </p>
                  <p className="leading-relaxed">
                    With extensive expertise built inside fast-growth tech channels across West Africa, {instructor.name.split(' ')[0]} designs active lessons mapping raw commercial tasks to student screens.
                  </p>
                </div>

                {/* Courses curated layout block */}
                <div className="space-y-3 pt-4 border-t border-gray-50">
                  <h4 className="text-xs font-bold text-navy-950 uppercase tracking-widest font-mono">
                    Active Courses Under Tutelage
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id={`faculty-courses-grid-${instructor.id}`}>
                    {taughtCourses.map((course) => (
                      <div 
                        key={course.id}
                        id={`faculty-course-item-${course.id}`}
                        onClick={() => onSelectCourse(course)}
                        className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-amber-50 rounded-lg border border-gray-100/60 cursor-pointer transition-all"
                      >
                        <div className="flex flex-col min-w-0 pr-2">
                          <span className="text-[10px] font-mono font-bold text-gray-400 capitalize">
                            {course.category}
                          </span>
                          <span className="text-xs font-bold text-navy-950 truncate mt-0.5">
                            {course.title}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-amber-500 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </section>
          );
        })}
      </main>

    </article>
  );
}
