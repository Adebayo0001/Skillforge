import { useState } from 'react';
import { 
  Star, Clock, BookOpen, MessageSquare, Users, ChevronDown, Check, 
  ArrowLeft, Share2, Shield, Calendar, Play, CirclePlay, HelpCircle, 
  Copy, CheckSquare, Sparkles, Smile, GraduationCap, ArrowRight, Video
} from 'lucide-react';
import { Course, SyllabusModule, SyllabusLesson } from '../types';
import { INSTRUCTORS } from '../data';

interface CourseDetailPageProps {
  course: Course;
  onBack: () => void;
  onEnrol: (course: Course) => void;
}

export default function CourseDetailPage({ course, onBack, onEnrol }: CourseDetailPageProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>(course.syllabus[0]?.id || null);
  const [activePreviewLesson, setActivePreviewLesson] = useState<SyllabusLesson | null>(null);
  const [showShareNotification, setShowShareNotification] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Find associated instructor
  const instructor = INSTRUCTORS.find(inst => inst.id === course.instructorId);

  // Count total lessons
  const totalLessons = course.syllabus.reduce((acc, curr) => acc + curr.lessons.length, 0);

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareNotification(true);
    setTimeout(() => {
      setShowShareNotification(false);
    }, 2000);
  };

  const startVideoPreview = (lesson: SyllabusLesson) => {
    setActivePreviewLesson(lesson);
    setIsVideoPlaying(true);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <article id={`course-detail-page-${course.id}`} className="bg-white text-navy-950 min-h-screen text-left pb-24 md:pb-12 relative">
      
      {/* Top Breadcrumb bar */}
      <div className="bg-slate-50 border-b border-gray-100 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-gray-500 font-medium">
          <button 
            id="btn-back-to-catalogue"
            onClick={onBack}
            className="flex items-center gap-1 hover:text-[#0F2044] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Courses</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-1.5" id="breadcrumb-links">
            <span className="hover:underline cursor-pointer" onClick={onBack}>Home</span>
            <span>/</span>
            <span className="hover:underline cursor-pointer" onClick={onBack}>Courses</span>
            <span>/</span>
            <span className="text-[#0F2044] font-semibold">{course.category}</span>
          </div>
        </div>
      </div>

      {/* Hero Banner Area */}
      <header className="relative bg-[#0F2044] text-white py-14 sm:py-20 overflow-hidden px-4 sm:px-8">
        <div className="absolute inset-0 bg-radial-gradient from-black/50 via-navy-950 to-navy-950 pointer-events-none" />
        {/* Background Image structure */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none bg-cover bg-center" 
          style={{ backgroundImage: `url(${course.thumbnailUrl})` }}
        />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 flex flex-col items-start gap-4" id="detail-hero-content">
            {/* Badges block */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-500 text-navy-950 text-[10px] font-extrabold font-mono tracking-widest uppercase px-2.5 py-1 rounded">
                {course.format}
              </span>
              <span className="bg-white/10 border border-white/20 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded">
                Level: {course.level}
              </span>
              <span className="bg-white/10 border border-white/20 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded font-mono">
                {course.category}
              </span>
            </div>

            <h1 
              id="detail-course-title"
              className="text-2.5xl sm:text-4.5xl leading-[1.1] font-black text-white tracking-tight leading-none text-left"
            >
              {course.title}
            </h1>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl text-left">
              {course.subtitle}
            </p>

            {/* Ratings Summary */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-2 text-xs text-gray-300">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current stroke-current" />
                  ))}
                </div>
                <span className="font-bold text-white">{course.rating}</span>
                <span className="text-gray-400">({course.reviewCount} Reviews)</span>
              </div>

              <div className="flex items-center gap-1.5 font-mono">
                <Users className="w-4 h-4 text-amber-500" />
                <span>{course.enrolledCount} Students Enrolled</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Main Split Column Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column (65%) */}
        <div className="col-span-1 lg:col-span-8 space-y-12" id="detail-left-column">
          
          {/* FREE TRIAL INTERACTIVE VIDEO PLAYER */}
          <div className="bg-slate-50 border border-gray-100 rounded-2xl p-4 sm:p-6" id="video-simulator-box">
            <h3 className="text-sm font-extrabold text-[#0f2044] uppercase tracking-wider font-mono flex items-center gap-2 mb-4">
              <Video className="w-4.5 h-4.5 text-[#F59E0B] animate-pulse" />
              Free Trial: Watch First Lesson
            </h3>

            {isVideoPlaying ? (
              <div className="aspect-video w-full rounded-xl bg-[#0F2044] flex flex-col items-center justify-center relative overflow-hidden border border-gray-200">
                {/* Simulated playback interface */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80 pointer-events-none" />
                
                <div className="text-center p-6 max-w-md relative z-10 space-y-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto text-navy-950 animate-bounce">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    {activePreviewLesson ? activePreviewLesson.title : 'Preview Lesson Playing...'}
                  </h4>
                  <p className="text-[11px] text-gray-300 leading-relaxed font-mono">
                    [Trial player loaded successfully and authenticated] • 1080p Ultra compressed format optimized for Nigerian ISPs.
                  </p>
                  
                  {/* Progress tracker bar */}
                  <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full animate-pulse" style={{ width: '40%' }} />
                  </div>

                  <button
                    onClick={() => setIsVideoPlaying(false)}
                    className="text-xs bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-4 py-1.5 rounded cursor-pointer transition-colors"
                  >
                    Pause Player
                  </button>
                </div>
              </div>
            ) : (
              <div 
                className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-gray-200 flex flex-col items-center justify-center cursor-pointer group"
                onClick={() => startVideoPreview(course.syllabus[0].lessons[0])}
              >
                <img 
                  src={course.thumbnailUrl} 
                  alt="Play preview"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-102 transition-transform duration-500"
                />
                
                {/* Glowing play icon */}
                <div className="w-16 h-16 bg-amber-500 group-hover:bg-amber-600 rounded-full flex items-center justify-center text-navy-950 relative z-10 shadow-lg transform group-hover:scale-105 transition-all">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center z-10">
                  <p className="text-xs font-black text-white">
                    Click to Play Preview: {course.syllabus[0].lessons[0].title} (FREE)
                  </p>
                  <p className="text-[10px] font-mono text-amber-500 mt-1 font-bold">
                    Dur: {course.syllabus[0].lessons[0].duration} • Low data consumption format
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* WHAT YOU WILL LEARN section */}
          <div className="space-y-4" id="section-outcomes-list">
            <h2 className="text-lg sm:text-xl font-bold font-sans text-navy-950 tracking-tight flex items-center gap-1.5">
              <CheckSquare className="w-5 h-5 text-amber-500 shrink-0" />
              What you will learn
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1.5">
              {course.learningOutcomes.map((outcome, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl border border-gray-100 bg-slate-50/20"
                >
                  <Check className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {outcome}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* WHO THIS COURSE IS FOR */}
          <div className="space-y-4" id="section-audience-profile">
            <h2 className="text-lg sm:text-xl font-bold font-sans text-navy-950 tracking-tight flex items-center gap-1.5">
              <Smile className="w-5 h-5 text-[#F59E0B] shrink-0" />
              Who this course is for
            </h2>
            
            <div className="space-y-3 pt-1.5">
              {course.targetAudience.map((audience, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm text-gray-600 leading-relaxed border-l-3 border-amber-400 pl-4 py-1 bg-slate-20/50"
                >
                  <span>{audience}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CURRICULUM SYLLABUS ACCORDION */}
          <div className="space-y-4" id="section-syllabus-accordion">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold font-sans text-navy-950 tracking-tight flex items-center gap-1.5">
                <BookOpen className="w-5 h-5 text-amber-500" />
                Course Curriculum
              </h2>
              <span className="text-xs font-semibold text-gray-400 font-mono">
                {course.syllabus.length} Modules • {totalLessons} Lessons
              </span>
            </div>

            <div className="space-y-3 pt-1.5">
              {course.syllabus.map((mod) => {
                const isExpanded = expandedModule === mod.id;
                return (
                  <div 
                    key={mod.id}
                    className="border border-gray-100 rounded-xl overflow-hidden shadow-xs bg-slate-50/55 hover:bg-slate-50 transition-colors"
                  >
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="w-full flex justify-between items-center p-4 text-left font-bold text-xs sm:text-sm text-navy-950 cursor-pointer focus:outline-none focus:bg-slate-50"
                    >
                      <span className="pr-3 leading-snug">{mod.title}</span>
                      <ChevronDown 
                        className={`w-4 h-4 text-gray-400 shrink-0 transform transition-transform ${
                          isExpanded ? 'rotate-180 text-[#F59E0B]' : ''
                        }`} 
                      />
                    </button>
                    
                    {isExpanded && (
                      <div className="bg-white border-t border-gray-100 px-4.5 py-2.5 text-xs text-gray-600 space-y-2 animate-fade-in">
                        {mod.lessons.map((lesson) => (
                          <div 
                            key={lesson.id}
                            className={`flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0 hover:bg-slate-50/50 px-1.5 rounded transition-colors ${
                              lesson.isPreview ? 'text-amber-600 font-semibold' : ''
                            }`}
                          >
                            <span className="flex items-center gap-2 pr-2">
                              {lesson.isPreview ? (
                                <span className="bg-amber-100 text-amber-700 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold shrink-0">
                                  FREE PREVIEW
                                </span>
                              ) : (
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full shrink-0" />
                              )}
                              <span className="truncate leading-relaxed">{lesson.title}</span>
                            </span>
                            
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-[10px] text-gray-400 font-mono font-medium">{lesson.duration}</span>
                              {lesson.isPreview && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startVideoPreview(lesson);
                                  }}
                                  className="p-1 text-amber-500 hover:text-amber-700 hover:bg-amber-50 rounded cursor-pointer"
                                  title="Play free lesson"
                                >
                                  <CirclePlay className="w-5 h-5 shrink-0" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* INSTRUCTOR BIO CARD */}
          {instructor && (
            <div className="p-6 bg-slate-50 border border-gray-100 rounded-2xl text-left" id="section-instructor-fullcard">
              <span className="text-[10px] font-bold text-amber-600 tracking-widest uppercase font-mono bg-amber-100/40 px-2 py-0.5 rounded">
                CURATING COACH
              </span>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mt-4">
                <img 
                  src={instructor.imageUrl} 
                  alt={instructor.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-xs shrink-0 bg-white"
                />
                
                <div className="space-y-2 text-center sm:text-left">
                  <h3 className="text-base sm:text-md font-extrabold text-navy-950">
                    {instructor.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium leading-none">
                    {instructor.title} at <strong className="text-[#0i2044]">{instructor.company}</strong>
                  </p>
                  
                  <div className="flex justify-center sm:justify-start gap-1 pb-1">
                    <span className="text-[10px] px-2 py-0.5 bg-white border border-gray-200 text-amber-700 font-bold font-mono rounded">
                      {instructor.experienceText}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed max-w-lg">
                    {instructor.bio}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STUDENT REVIEWS LISTING */}
          <div className="space-y-4" id="section-student-reviews-list">
            <h2 className="text-lg sm:text-xl font-bold font-sans text-navy-950 tracking-tight flex items-center gap-1.5">
              <MessageSquare className="w-5 h-5 text-amber-500 shrink-0" />
              Approved Student Reviews
            </h2>

            <div className="pt-2 space-y-4">
              <div className="p-4 bg-white border border-gray-100 rounded-xl space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-navy-950">Tunde Aiyetoro</span>
                  <span className="text-[11px] text-gray-400 font-mono">June 1, 2026</span>
                </div>
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <p className="text-gray-500 italic">
                  "This curriculum upgraded my direct capacity. The layout spacing theories of typography that Seun taught transformed my daily Figma wireframes. I was able to defend our new design retainers to our UK SaaS clients instantly."
                </p>
              </div>

              <div className="p-4 bg-white border border-gray-100 rounded-xl space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-navy-950">Chidinma Nwosu</span>
                  <span className="text-[11px] text-gray-400 font-mono">May 24, 2026</span>
                </div>
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <p className="text-gray-500 italic">
                  "Excellent formatting. The files download quickly. Sprints and metrics frameworks mapped perfectly corresponding to MTN standards."
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Sidebar (35%) - Sticky on desktop */}
        <aside className="col-span-1 lg:col-span-4 lg:sticky lg:top-[96px]" id="detail-right-sidebar">
          
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xl space-y-6">
            
            {/* Aspect image decoration */}
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100">
              <img 
                src={course.thumbnailUrl} 
                alt={course.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tuition Block */}
            <div className="space-y-1.5" id="sidebar-tuition-block">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono block">
                ONE-TIME TUITION FEE
              </span>
              
              <div className="flex items-baseline gap-2">
                <span className="text-2.5xl sm:text-3xl font-black font-mono text-navy-950">
                  ₦{course.price.toLocaleString()}
                </span>
                {course.oldPrice && (
                  <span className="text-sm font-semibold line-through text-gray-400 font-mono">
                    ₦{course.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>
              
              <p className="text-xs text-emerald-600 font-semibold italic flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                No extra subscription charges. Lifelong billing.
              </p>
            </div>

            {/* Core CTA Enrol primary button */}
            <button
              id="sidebar-btn-enrol"
              onClick={() => onEnrol(course)}
              className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-navy-950 font-black text-sm tracking-wide shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all cursor-pointer text-center"
            >
              Enrol in {course.title}
            </button>

            {/* Inclusions checklist list */}
            <div className="space-y-3.5 border-t border-gray-100 pt-5 text-xs text-gray-500 font-medium">
              <span className="text-[10px] font-bold text-gray-400 tracking-wider font-mono block uppercase">
                THIS CURRICULUM INCLUDES
              </span>

              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#F59E0B]" shrink-0 />
                <span>Downloadable video lessons ({course.durationHours} Hours total)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#F59E0B]" shrink-0 />
                <span>Interactive capstone worksheets & resources</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#F59E0B]" shrink-0 />
                <span>Official verified certificate of completion Code</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#F59E0B]" shrink-0 />
                <span>Admittance to private peer WhatsApp Community</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#F59E0B]" shrink-0 />
                <span>Unlimited lifetime access & roadmap updates</span>
              </div>
            </div>

            {/* Cohort information dates */}
            {course.cohortDates && course.cohortDates.length > 0 && (
              <div className="border-t border-gray-100 pt-4 text-xs text-gray-500 font-medium">
                <span className="text-[10px] font-bold text-gray-400 tracking-wider font-mono block uppercase mb-2">
                  ACTIVE COHORT ADMISSIONS
                </span>
                <div className="flex items-start gap-2 bg-amber-50 border border-amber-100/50 p-3 rounded-lg text-amber-900">
                  <Calendar className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-xs leading-none">Starting {course.cohortDates[0]}</p>
                    <p className="text-[10px] text-amber-700 mt-1">Cohort capacity limited to 45 seats for quality.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom auxiliary indicators */}
            <div className="flex justify-between items-center border-t border-gray-100 pt-4">
              {/* Guarantee indicator */}
              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase font-mono">
                <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>7-Day Refund Scheme</span>
              </div>

              {/* Share triggers */}
              <div className="relative">
                <button
                  id="btn-sidebar-share"
                  onClick={handleShare}
                  className="flex items-center gap-1 px-3 py-1.5 border border-gray-100 rounded-lg hover:bg-slate-50 text-xs font-semibold text-gray-500 shrink-0 cursor-pointer transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>

                {showShareNotification && (
                  <span className="absolute bottom-full right-0 mb-2 p-1.5 bg-navy-950 text-white text-[9px] rounded shadow-md whitespace-nowrap animate-bounce font-mono">
                    ✓ Link Copied!
                  </span>
                )}
              </div>
            </div>

          </div>

        </aside>

      </div>

      {/* MOBILE TRIGGER BUTTON BAR- anchored of bottom on screens less than desktop */}
      <div 
        id="mobile-bottom-anchor-trigger"
        className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 p-4 shrink-0 flex items-center justify-between z-40 shadow-xl"
      >
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-mono tracking-wider text-gray-400 uppercase leading-none">TUITION RATE</span>
          <span className="text-xl font-black font-mono mt-1 text-navy-950 leading-none">
            ₦{course.price.toLocaleString()}
          </span>
        </div>

        <button
          id="btn-enrol-mobile-anchor"
          onClick={() => onEnrol(course)}
          className="px-6 py-3 bg-[#F59E0B] hover:bg-amber-600 text-navy-950 font-extrabold text-xs tracking-wider rounded-lg shadow cursor-pointer text-center"
        >
          Enrol in Course
        </button>
      </div>

    </article>
  );
}
