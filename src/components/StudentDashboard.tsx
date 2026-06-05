import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Award, PlayCircle, BookOpen, Clock, 
  ChevronRight, ArrowRight, Trophy, CheckCircle2, ListChecks 
} from 'lucide-react';
import { Course } from '../types';
import { COURSES } from '../data';

interface StudentDashboardProps {
  currentUser: { name: string; email: string; company?: string; profession?: string };
  setTab: (tab: string) => void;
  onSelectCourse: (course: Course) => void;
  onContinueCourse: (course: Course, lessonId: string) => void;
}

export default function StudentDashboard({ 
  currentUser, 
  setTab, 
  onSelectCourse, 
  onContinueCourse 
}: StudentDashboardProps) {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [courseProgress, setCourseProgress] = useState<Record<string, { completed: string[], percent: number }>>({});
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<string[]>([]);

  useEffect(() => {
    const email = currentUser.email.toLowerCase();
    
    // Load enrolled slugs
    const savedEnrolls: string[] = JSON.parse(localStorage.getItem(`sf_enrolls_${email}`) || '[]');
    const courses = COURSES.filter(c => savedEnrolls.includes(c.slug));
    setEnrolledCourses(courses);

    // Load progress for each enrolled course
    const progressMap: Record<string, { completed: string[], percent: number }> = {};
    courses.forEach(c => {
      const completed: string[] = JSON.parse(localStorage.getItem(`sf_completed_lessons_${email}_${c.slug}`) || '[]');
      const totalLessons = c.syllabus.reduce((acc, module) => acc + module.lessons.length, 0);
      const percent = totalLessons > 0 ? Math.round((completed.length / totalLessons) * 100) : 0;
      progressMap[c.slug] = { completed, percent };
    });
    setCourseProgress(progressMap);

    // Load recent activity
    const activity: any[] = JSON.parse(localStorage.getItem(`sf_recent_activity_${email}`) || '[]');
    setRecentActivity(activity.slice(0, 3)); // show last 3

    // Load certificates
    const certs: string[] = JSON.parse(localStorage.getItem(`sf_completed_courses_${email}`) || '[]');
    setCertificates(certs);
  }, [currentUser]);

  // Determine standard African Greeting Time
  const getGreeting = () => {
    const hours = new Date().getHours();
    const firstName = currentUser.name.split(' ')[0] || currentUser.name;
    if (hours < 12) return `Good morning, ${firstName}. Keep going.`;
    if (hours < 17) return `Good afternoon, ${firstName}. Elevate your career.`;
    return `Good evening, ${firstName}. Perfect time to build.`;
  };

  const getNextLessonToPlay = (course: Course) => {
    const email = currentUser.email.toLowerCase();
    const completed: string[] = JSON.parse(localStorage.getItem(`sf_completed_lessons_${email}_${course.slug}`) || '[]');
    
    // Find first lesson that is not completed
    for (const module of course.syllabus) {
      for (const lesson of module.lessons) {
        if (!completed.includes(lesson.id)) {
          return lesson.id;
        }
      }
    }
    // If all completed, return first lesson
    return course.syllabus[0]?.lessons[0]?.id || '';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10" id="student-portal-dashboard">
      
      {/* Top Banner with greeting */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0F2044] via-[#1E3A8A] to-[#0F2044] text-white p-6 sm:p-8 rounded-2xl mb-10 shadow-xl border border-blue-900/40">
        <div className="absolute top-0 right-0 w-[300px] h-full bg-linear-to-l from-amber-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-[10px] font-black uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5" /> STUDENT PORTAL ACTIVE
            </span>
            <h1 className="text-2.5xl sm:text-3.5xl font-black tracking-tight mt-1">
              {getGreeting()}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl">
              Track your syllabus progression, download official certificate credentials, or dive back into custom simulation projects.
            </p>
          </div>

          <div className="flex gap-4 shrink-0 font-mono">
            {/* Completed stats */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center md:min-w-[120px]">
              <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">CERTIFICATES</span>
              <span className="text-3xl font-black text-amber-400 mt-1 block">
                {certificates.length}
              </span>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center md:min-w-[120px]">
              <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">ACTIVE COURSES</span>
              <span className="text-3xl font-black text-white mt-1 block">
                {enrolledCourses.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column - Enrolled Courses */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-navy-950 tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#F59E0B]" />
              My Registered Curricula
            </h2>
            <button 
              onClick={() => setTab('courses')}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 font-mono uppercase tracking-wider"
            >
              Browse More →
            </button>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="bg-slate-50 border border-gray-100 rounded-2xl p-10 text-center space-y-4" id="dashboard-empty-state">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-500">
                <ListChecks className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-navy-950">No courses enrolled yet</h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                You haven't enrolled in any SkillForge courses. Start taking live virtual cohorts or self-paced courses.
              </p>
              <button
                onClick={() => setTab('courses')}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-navy-950 font-black text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Browse Our Curricula
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="dashboard-course-cards-grid">
              {enrolledCourses.map(course => {
                const progress = courseProgress[course.slug] || { completed: [], percent: 0 };
                const totalLessons = course.syllabus.reduce((acc, module) => acc + module.lessons.length, 0);
                const nextLessonId = getNextLessonToPlay(course);
                const isFinished = progress.percent === 100;

                return (
                  <div 
                    key={course.id} 
                    className="flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-xs hover:border-gray-200 transition-all hover:shadow-md"
                  >
                    {/* Header Image */}
                    <div className="relative aspect-video w-full overflow-hidden bg-[#0F2044]">
                      <img 
                        src={course.thumbnailUrl} 
                        alt={course.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-90"
                      />
                      <div className="absolute top-2.5 right-2.5 bg-navy-950/80 backdrop-blur-md text-white text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded">
                        {course.format}
                      </div>
                      
                      {isFinished && (
                        <div className="absolute top-2.5 left-2.5 bg-emerald-500 text-white text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" /> Complete
                        </div>
                      )}
                    </div>

                    {/* Content padding elements */}
                    <div className="p-5 flex-grow flex flex-col justify-between text-left">
                      <div>
                        <span className="text-[9px] font-mono font-extrabold text-[#F59E0B] tracking-wider uppercase bg-amber-50 px-2 py-0.5 rounded">
                          {course.category}
                        </span>
                        <h3 className="text-base font-extrabold text-navy-950 tracking-tight mt-1.5 leading-snug line-clamp-1">
                          {course.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1 leading-relaxed">
                          {course.subtitle}
                        </p>
                      </div>

                      {/* Progress representation */}
                      <div className="mt-5 space-y-1.5">
                        <div className="flex justify-between items-center text-[11px] font-mono font-bold leading-none">
                          <span className="text-gray-400">
                            {progress.completed.length} of {totalLessons} modules/lessons
                          </span>
                          <span className="text-navy-950">{progress.percent}%</span>
                        </div>
                        {/* Progress bar container */}
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              isFinished ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${progress.percent}%` }}
                          />
                        </div>
                      </div>

                      {/* Launch/Continue CTA button */}
                      <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between gap-4">
                        <button
                          onClick={() => onSelectCourse(course)}
                          className="text-xs font-extrabold text-gray-400 hover:text-navy-950 cursor-pointer"
                        >
                          View Syllabus
                        </button>

                        <button
                          onClick={() => onContinueCourse(course, nextLessonId)}
                          className={`inline-flex items-center gap-1 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all shadow-xs cursor-pointer ${
                            isFinished 
                              ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-100'
                              : 'bg-amber-500 hover:bg-amber-600 text-navy-950 font-black'
                          }`}
                        >
                          {isFinished ? (
                            <>
                              <span>Review Class</span>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              <span>Continue</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column - Secondary Panels */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Recent Activity Log */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-xs text-left" id="dashboard-recent-activity-box">
            <h3 className="text-sm font-black text-navy-950 tracking-tight uppercase font-mono border-b border-gray-50 pb-3 mb-4 flex items-center gap-1.5 text-amber-600">
              <Clock className="w-4 h-4" />
              Recent Activity
            </h3>

            {recentActivity.length === 0 ? (
              <p className="text-xs text-gray-400 leading-relaxed text-center py-4">
                No lessons watched recently. Select are course and play your first video!
              </p>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((act, idx) => (
                  <div key={idx} className="flex gap-3 text-xs border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                    <div className="p-1.5 bg-[#0F2044]/5 text-[#0F2044] rounded-lg h-fit shrink-0">
                      <PlayCircle className="w-4 h-4 text-navy-950" />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-950 line-clamp-1">{act.lessonTitle}</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{act.courseTitle}</p>
                      <span className="text-[9px] font-mono text-gray-300 mt-1 block">
                        {new Date(act.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Cert Promotion */}
          <div className="bg-gradient-to-br from-amber-500/5 to-[#0F2044]/5 border border-amber-100 rounded-2xl p-5 sm:p-6 shadow-xs text-left" id="dashboard-certificates-badge">
            <div className="flex gap-3">
              <div className="p-2 bg-amber-500 text-white rounded-xl text-center shadow-xs">
                <Trophy className="w-5 h-5 fill-amber-500 animate-bounce stroke-white" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-navy-950">Certified Competency</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Earn 100% progress on any registered template to lock down verified certificate codes linked to your profile credentials.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setTab('certificates');
                window.scrollTo({ top: 0 });
              }}
              className="w-full mt-4 py-2.5 bg-navy-950 hover:bg-navy-900 border border-navy-950 text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1"
            >
              <span>Manage My Certificates</span>
              <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
