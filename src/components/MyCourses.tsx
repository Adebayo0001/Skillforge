import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, Clock, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { Course } from '../types';
import { COURSES } from '../data';

interface MyCoursesProps {
  currentUser: { name: string; email: string };
  setTab: (tab: string) => void;
  onSelectCourse: (course: Course) => void;
  onContinueCourse: (course: Course, lessonId: string) => void;
}

export default function MyCourses({ 
  currentUser, 
  setTab, 
  onSelectCourse, 
  onContinueCourse 
}: MyCoursesProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseProgress, setCourseProgress] = useState<Record<string, { completedCount: number, percent: number }>>({});

  useEffect(() => {
    const email = currentUser.email.toLowerCase();
    
    // Fetch enrolled courses
    const savedEnrolls: string[] = JSON.parse(localStorage.getItem(`sf_enrolls_${email}`) || '[]');
    const enrolledList = COURSES.filter(c => savedEnrolls.includes(c.slug));
    setCourses(enrolledList);

    // Fetch progress for each
    const progressMap: Record<string, { completedCount: number, percent: number }> = {};
    enrolledList.forEach(c => {
      const completed: string[] = JSON.parse(localStorage.getItem(`sf_completed_lessons_${email}_${c.slug}`) || '[]');
      const totalLessons = c.syllabus.reduce((acc, m) => acc + m.lessons.length, 0);
      const percent = totalLessons > 0 ? Math.round((completed.length / totalLessons) * 100) : 0;
      progressMap[c.slug] = { completedCount: completed.length, percent };
    });
    setCourseProgress(progressMap);
  }, [currentUser]);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10" id="student-my-courses-view">
      
      {/* Page Header */}
      <div className="text-left max-w-2xl mb-10">
        <span className="text-xs font-extrabold text-[#F59E0B] tracking-[0.2em] font-mono uppercase bg-amber-50 px-2.5 py-1 rounded inline-block">
          MY CLASSES & CURRICULUMS
        </span>
        <h1 className="text-3xl font-black text-[#0f2044] mt-2.5 tracking-tight">
          Active Student Enrolments
        </h1>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          Unlock maximum focus. Your curriculum includes fully detailed lesson syllabuses, video player environments, practical assignment resources, and automated certificates.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="bg-slate-50 border border-gray-150 rounded-2xl p-12 text-center max-w-lg mx-auto space-y-5" id="my-courses-empty-card">
          <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-black text-navy-950">No classes registered</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We process payments seamlessly in Nigerian Naira using sandboxed API simulators. Tap courses to select any course and simulate an instant test enrolment!
            </p>
          </div>
          <button
            onClick={() => setTab('courses')}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-navy-950 font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Browse Course Catalogue
          </button>
        </div>
      ) : (
        <div className="space-y-6" id="my-courses-list-view">
          {courses.map(course => {
            const progress = courseProgress[course.slug] || { completedCount: 0, percent: 0 };
            const totalLessons = course.syllabus.reduce((acc, m) => acc + m.lessons.length, 0);
            const isFinished = progress.percent === 100;
            const nextLessonId = getNextLessonToPlay(course);

            return (
              <div 
                key={course.id} 
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-gray-200 transition-all p-5 sm:p-6 flex flex-col md:flex-row items-center gap-6 text-left"
              >
                {/* Course Image */}
                <div className="relative aspect-video w-full md:w-[220px] rounded-xl overflow-hidden shrink-0 bg-navy-950">
                  <img 
                    src={course.thumbnailUrl} 
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {isFinished && (
                    <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Certified
                    </div>
                  )}
                </div>

                {/* Course core description */}
                <div className="flex-grow space-y-4 w-full">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wider font-mono bg-amber-50 px-2.5 py-0.5 rounded">
                        {course.category}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        {course.durationWeeks} WEEKS
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-navy-950 tracking-tight leading-snug line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {course.subtitle}
                    </p>
                  </div>

                  {/* Progress panel row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-mono font-black uppercase leading-none text-gray-400">
                        <span>Course syllabus progress</span>
                        <span className="text-navy-950">{progress.percent}% Completed</span>
                      </div>
                      <div className="w-full h-2 bg-gray-50 border border-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isFinished ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${progress.percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-6 justify-start sm:justify-end text-xs text-gray-400 font-mono">
                      <div className="flex flex-col">
                        <span className="font-bold text-navy-950 uppercase leading-none mb-1 text-[10px]">Lessons watched</span>
                        <span>{progress.completedCount} of {totalLessons} modules</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Action Link Column */}
                <div className="shrink-0 flex sm:flex-col gap-3 w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 text-center">
                  <button
                    onClick={() => onContinueCourse(course, nextLessonId)}
                    className="flex-1 md:flex-grow-0 px-5 py-3 bg-amber-500 hover:bg-amber-600 font-black text-xs uppercase tracking-wider text-navy-950 rounded-xl transition-all shadow-sm shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{isFinished ? 'Replay Lessons' : 'Resume Learning'}</span>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                  </button>

                  <button
                    onClick={() => onSelectCourse(course)}
                    className="flex-1 md:flex-grow-0 px-5 py-3 border border-gray-200 hover:border-gray-300 text-navy-950 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
