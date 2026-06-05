import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, 
  ChevronLeft, ChevronRight, CheckCircle2, Circle, Menu, 
  MapPin, HelpCircle, FileText, Download, Award, X, Sparkles, Sliders 
} from 'lucide-react';
import { Course, SyllabusLesson } from '../types';
import { getOrCreateLessonQuiz } from '../quiz_data';

interface CoursePlayerProps {
  course: Course;
  initialLessonId?: string;
  currentUser: { name: string; email: string };
  onBack: () => void;
  setTab: (tab: string) => void;
  onTakeQuiz: (quizId: string) => void;
}

export default function CoursePlayer({
  course,
  initialLessonId,
  currentUser,
  onBack,
  setTab,
  onTakeQuiz
}: CoursePlayerProps) {
  const email = currentUser.email.toLowerCase();

  // Find all lessons sequentially to ease prev/next routing
  const flatLessons = course.syllabus.flatMap(m => m.lessons);
  const totalLessonsCount = flatLessons.length;

  // Active state
  const [activeLesson, setActiveLesson] = useState<SyllabusLesson>(() => {
    if (initialLessonId) {
      const match = flatLessons.find(l => l.id === initialLessonId);
      if (match) return match;
    }
    return flatLessons[0];
  });

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  // Custom Video Player States
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // desktop sidebar
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false); // mobile drawer
  const [isSpeedSheetOpen, setIsSpeedSheetOpen] = useState(false); // speed bottom sheet for mobile

  // Toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Video controller reference
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Sync completed lessons on start
  useEffect(() => {
    const loadedList = JSON.parse(localStorage.getItem(`sf_completed_lessons_${email}_${course.slug}`) || '[]');
    setCompletedLessons(loadedList);
    setIsPlaying(false);
    
    // Add lesson play log to recent activity
    logActivity(activeLesson);
  }, [course, activeLesson]);

  const logActivity = (lesson: SyllabusLesson) => {
    const recent: any[] = JSON.parse(localStorage.getItem(`sf_recent_activity_${email}`) || '[]');
    const newLog = {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      courseTitle: course.title,
      courseSlug: course.slug,
      date: new Date().toISOString()
    };
    // Exclude duplicates and limit to 10 logs
    const filtered = recent.filter(r => !(r.lessonId === lesson.id && r.courseSlug === course.slug));
    filtered.unshift(newLog);
    localStorage.setItem(`sf_recent_activity_${email}`, JSON.stringify(filtered.slice(0, 10)));
  };

  // Safe path for video loops matching dynamic course material
  const getVideoSrc = () => {
    // Return high throughput scenic video assets
    if (course.id.includes('python') || course.id.includes('engineering')) {
      return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    }
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4";
  };

  // Video controls handling
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Play failed: ", err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    
    // Check 80% mark
    const currentDur = videoRef.current.duration;
    if (currentDur > 0) {
      setDuration(currentDur);
      const progressPercent = (videoRef.current.currentTime / currentDur) * 100;
      
      if (progressPercent >= 80 && !completedLessons.includes(activeLesson.id)) {
        triggerLessonCompletion(activeLesson.id);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const v = parseFloat(e.target.value);
    setVolume(v);
    videoRef.current.volume = v;
    setIsMuted(v === 0);
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    videoRef.current.muted = nextMute;
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setIsSpeedSheetOpen(false);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Complete lesson logic flow
  const triggerLessonCompletion = (lessonId: string) => {
    const updated = [...completedLessons, lessonId];
    setCompletedLessons(updated);
    
    // Save to local storage
    localStorage.setItem(`sf_completed_lessons_${email}_${course.slug}`, JSON.stringify(updated));

    // Calculate progression percentage across full syllabus
    const pct = Math.round((updated.length / totalLessonsCount) * 100);
    localStorage.setItem(`sf_progress_pct_${email}_${course.slug}`, pct.toString());

    // Check if this module is fully complete!
    const activeModule = course.syllabus.find(m => m.lessons.some(l => l.id === lessonId));
    if (activeModule) {
      const moduleLessonIds = activeModule.lessons.map(l => l.id);
      const allModuleDone = moduleLessonIds.every(id => updated.includes(id));
      if (allModuleDone) {
        showTemporaryToast(`🎉 ${activeModule.title} Complete!`);
      }
    }

    // Check if entire course is completed!
    if (updated.length === totalLessonsCount) {
      handleCourseFullCompletion();
    }
  };

  const handleCourseFullCompletion = () => {
    // 1. Mark enrolment as completed
    const completedCourses: string[] = JSON.parse(localStorage.getItem(`sf_completed_courses_${email}`) || '[]');
    if (!completedCourses.includes(course.slug)) {
      completedCourses.push(course.slug);
      localStorage.setItem(`sf_completed_courses_${email}`, JSON.stringify(completedCourses));
    }

    // 2. Clear progress banner states and display Celebration Dialog
    setShowCelebration(true);
    showTemporaryToast(`🎓 CONGRATULATIONS! You completed ${course.title}!`);

    // Simulate sending Completion email sequence
    console.log(`[EMAIL SEND SIMULATOR] Sending course completion credentials to ${email} for ${course.title}. Authenticity tag matches SF-GRAD-2026.`);
  };

  const showTemporaryToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Navigation callbacks
  const activeIndex = flatLessons.findIndex(l => l.id === activeLesson.id);
  const handlePrevLesson = () => {
    if (activeIndex > 0) {
      setActiveLesson(flatLessons[activeIndex - 1]);
    }
  };
  const handleNextLesson = () => {
    if (activeIndex < totalLessonsCount - 1) {
      setActiveLesson(flatLessons[activeIndex + 1]);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Download simulation resources lists
  const handleDownloadResource = (resTitle: string) => {
    // Trigger virtual direct file downloading logs
    const element = document.createElement("a");
    const file = new Blob([`SkillForge Academy Premium Learning Template Resource: ${resTitle}\nVerified Student: ${currentUser.name}\nEmail: ${currentUser.email}\nAuthenticity code: SF-TX-2026`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${resTitle.toLowerCase().replace(/[^a-z0-9]/g, "_")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const quiz = getOrCreateLessonQuiz(course.slug, activeLesson.id, activeLesson.title);

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(110vh-72.1px)] bg-[#0C0F17] text-white" id="full-course-player-container">
      
      {/* Absolute success floating banners */}
      {toastMessage && (
        <div className="fixed top-18 right-4 sm:right-8 z-50 bg-[#F59E0B] text-navy-950 font-black px-6 py-4 rounded-xl shadow-2xl border border-amber-400 flex items-center gap-3 animate-slide-in text-xs sm:text-sm" id="player-dynamic-toast">
          <Sparkles className="w-5 h-5 text-navy-950 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. LEFT SIDEBAR (Desktop list view) */}
      <aside 
        id="player-desktop-sidebar" 
        className={`hidden lg:flex flex-col w-[340px] border-r border-[#1E293B] bg-[#0E1321] shrink-0 overflow-y-auto select-none ${
          isSidebarOpen ? '' : 'lg:hidden'
        }`}
      >
        {/* Back Link Header */}
        <div className="p-5 border-b border-[#1E293B] flex items-center justify-between text-left">
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Syllabus
          </button>
          
          <button 
            onClick={() => {
              setTab('dashboard');
              window.scrollTo({ top: 0 });
            }}
            className="text-[10px] font-bold text-amber-500 font-mono hover:underline uppercase tracking-wider"
          >
            Dashboard
          </button>
        </div>

        {/* Course detail listing */}
        <div className="p-5 text-left border-b border-[#1E293B]">
          <h2 className="text-sm font-black tracking-tight leading-snug line-clamp-2">
            {course.title}
          </h2>
          {/* Progress overview */}
          <div className="mt-4 space-y-1">
            <div className="flex justify-between items-center text-[10px] font-mono leading-none font-bold text-gray-500">
              <span>Syllabus completed</span>
              <span className="text-amber-500">
                {completedLessons.length} / {totalLessonsCount} Lessons
              </span>
            </div>
            <div className="w-full h-1 bg-[#1E293B] rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.round((completedLessons.length / totalLessonsCount) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Modules navigation lists */}
        <div className="flex-grow text-left">
          {course.syllabus.map((mod, modIdx) => {
            const modCompletedCount = mod.lessons.filter(l => completedLessons.includes(l.id)).length;
            const isModFullyComplete = modCompletedCount === mod.lessons.length;

            return (
              <div key={mod.id} className="border-b border-[#1E293B] last:border-0">
                <div className="p-4 bg-[#121829] flex justify-between items-center text-[11px] font-bold tracking-tight text-gray-400 uppercase font-mono">
                  <span className="truncate pr-2">{mod.title}</span>
                  <span className="shrink-0 text-amber-500">
                    {modCompletedCount}/{mod.lessons.length}
                  </span>
                </div>

                <div className="divide-y divide-[#1E293B]/60">
                  {mod.lessons.map(lesson => {
                    const isCurrent = lesson.id === activeLesson.id;
                    const isDone = completedLessons.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setActiveLesson(lesson);
                          window.scrollTo({ top: 0 });
                        }}
                        className={`w-full p-4 flex items-start gap-3 transition-all text-left text-xs text-gray-300 hover:bg-[#151D33] border-l-4 ${
                          isCurrent 
                            ? 'bg-[#151D33] border-blue-500 font-bold' 
                            : 'border-transparent'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isDone ? (
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 fill-emerald-500/10" />
                          ) : (
                            <Circle className="w-4.5 h-4.5 text-gray-600" />
                          )}
                        </div>

                        <div className="flex-grow space-y-1">
                          <h4 className={`leading-snug line-clamp-2 ${isCurrent ? 'text-white font-extrabold' : 'text-gray-400'}`}>
                            {lesson.title}
                          </h4>
                          <span className="text-[10px] font-mono text-gray-500 block">
                            {lesson.duration}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* 2. MAIN PLAYER WORKSPACE */}
      <main className="flex-grow flex flex-col min-w-0" id="player-main-workspace-frame">
        
        {/* Mobile quick actions bar */}
        <div className="lg:hidden p-4 bg-[#0E1321] border-b border-[#1E293B] flex items-center justify-between text-left">
          <button 
            onClick={onBack}
            className="flex items-center gap-1 text-[11px] font-bold text-gray-400"
          >
            <ChevronLeft className="w-4 h-4" /> Syllabus
          </button>
          
          <button
            onClick={() => setIsMobileDrawerOpen(true)}
            className="px-3.5 py-1.5 bg-[#1E293B] hover:bg-[#2D3A52] text-xs font-bold rounded-lg flex items-center gap-1.5"
          >
            <Menu className="w-4 h-4 text-[#F59E0B]" />
            Contents
          </button>
        </div>

        {/* VIDEO PLAYER CONTAINER */}
        <div className="relative aspect-video bg-black flex flex-col justify-end group overflow-hidden" id="custom-video-screen-block">
          
          <video
            ref={videoRef}
            src={getVideoSrc()}
            className="w-full h-full object-contain cursor-pointer"
            onClick={handlePlayPause}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            playsInline
          />

          {/* PLAY WATERMARK (BIG IN CENTER) */}
          {!isPlaying && (
            <div 
              onClick={handlePlayPause}
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all cursor-pointer"
              id="player-center-play-button"
            >
              <div className="p-5 sm:p-6 bg-[#F59E0B] rounded-full text-navy-950 scale-100 hover:scale-108 transition-transform duration-300 shadow-2xl">
                <Play className="w-8 h-8 fill-navy-950" />
              </div>
            </div>
          )}

          {/* DYNAMIC PROGRESS NOTIFIER WATERMARK */}
          {completedLessons.includes(activeLesson.id) && (
            <div className="absolute top-4 left-4 z-20 bg-emerald-500/90 text-white backdrop-blur-md px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg shadow-md flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" /> Watched & Completed
            </div>
          )}

          {/* PLAYER CONTROLS (Fades in over hover) */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
            
            {/* Timeline Progress row */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-gray-300">{formatTime(currentTime)}</span>
              
              <input 
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="flex-grow accent-[#F59E0B] h-1 bg-gray-600 rounded-lg cursor-pointer appearance-none"
              />

              <span className="text-[10px] font-mono text-gray-300">
                {formatTime(duration)}
              </span>
            </div>

            {/* Actions details row */}
            <div className="flex justify-between items-center mt-1">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handlePlayPause}
                  className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4.5 h-4.5" /> : <Play className="w-4.5 h-4.5" />}
                </button>

                <div className="flex items-center gap-2">
                  <button onClick={handleToggleMute} className="text-gray-300 hover:text-white">
                    {isMuted ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 accent-white h-1 bg-gray-600 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Playback speed switcher - Desktop display */}
                <div className="hidden sm:flex items-center gap-1.5 bg-white/10 rounded-lg p-0.5">
                  {[0.75, 1, 1.25, 1.5, 2].map(speed => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={`text-[10px] font-mono font-bold px-2 py-1 rounded transition-colors ${
                        playbackSpeed === speed ? 'bg-[#F59E0B] text-navy-950' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>

                {/* Mobile speed Sheet Trigger toggle */}
                <button
                  onClick={() => setIsSpeedSheetOpen(true)}
                  className="sm:hidden p-1.5 bg-white/10 rounded-lg text-white font-mono text-xs font-black"
                >
                  {playbackSpeed}x
                </button>

                <button 
                  onClick={handleFullscreen}
                  className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all cursor-pointer"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* LESSON DETAILS AND RESOURCES AREA */}
        <div className="p-6 sm:p-8 space-y-8 text-left bg-[#0C0F17]">
          
          {/* Title description row */}
          <div className="border-b border-[#1E293B] pb-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-amber-500 font-extrabold tracking-wider uppercase block">
                LESSON {activeIndex + 1} OF {totalLessonsCount}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {activeLesson.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed max-w-2xl">
                This diagnostic lesson focuses on real execution and application models. Master the concepts presented, download the attached resources, and assess yourself using the interactive quiz.
              </p>
            </div>

            {/* Assessment triggers */}
            <div className="shrink-0">
              <button
                onClick={() => onTakeQuiz(quiz.id)}
                className="w-full md:w-auto px-5 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-navy-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <HelpCircle className="w-4.5 h-4.5 text-navy-950 shrink-0" />
                Take Lesson Assessment Quiz
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Resources download card */}
            <div className="md:col-span-7 bg-[#0E1321]/50 border border-[#1E293B] p-5 sm:p-6 rounded-2xl text-left space-y-4" id="lesson-attached-resources-card">
              <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-500" /> Lesson Support Files
              </h3>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-3.5 bg-[#121829] border border-[#1E293B]/40 rounded-xl">
                  <div className="flex items-start gap-2.5">
                    <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-black text-white">{activeLesson.title} Cheat Sheet</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">PDF • 1.2 MB • Syllabus resource</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDownloadResource(`${activeLesson.title} Cheat Sheet`)}
                    className="p-2 bg-white/5 hover:bg-amber-500 hover:text-[#0C0F17] rounded-lg text-white transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-[#121829] border border-[#1E293B]/40 rounded-xl">
                  <div className="flex items-start gap-2.5">
                    <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-black text-white">Full-Stack Practical Project Code</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">ZIP • 182 KB • Code repo exercises</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDownloadResource(`${activeLesson.title} Assignment Code`)}
                    className="p-2 bg-white/5 hover:bg-amber-500 hover:text-[#0C0F17] rounded-lg text-white transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Pro tips checklist card */}
            <div className="md:col-span-5 bg-[#0E1321]/50 border border-[#1E293B] p-5 sm:p-6 rounded-2xl text-left space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-[#1E293B] pb-2.5 mb-2 flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Complete Guidelines
              </h3>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Watch at least <strong className="text-[#F59E0B]">80% of the video duration</strong> to verify your attendance logs. The system will mark the checkbox green automatically.
              </p>
              <div className="flex items-center gap-2 pt-2 text-[10px] font-mono leading-none font-bold text-emerald-500">
                <CheckCircle2 className="w-4.5 h-4.5" />
                <span>Attendance synchronized live</span>
              </div>
            </div>

          </div>

          {/* LARGE THUMB NAV BUTTONS (Minimum 48px height for mobile) */}
          <div className="flex items-center justify-between gap-4 py-8 border-t border-[#1E293B] select-none">
            <button
              onClick={handlePrevLesson}
              disabled={activeIndex === 0}
              className="h-[48px] px-5 bg-[#121829] hover:bg-[#1E293B] disabled:opacity-30 disabled:hover:bg-[#121829] text-white text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              <span className="hidden sm:inline">Prev Lesson</span>
            </button>

            <button
              onClick={handleNextLesson}
              disabled={activeIndex === totalLessonsCount - 1}
              className="h-[48px] px-5 bg-navy-950 border border-[#1E293B] hover:bg-[#1E293B] disabled:opacity-30 disabled:hover:bg-navy-950 text-white text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="hidden sm:inline">Next Lesson</span>
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

        </div>
      </main>

      {/* 3. MOBILE CONTENTS DRAWER OVERLAY */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/80 backdrop-blur-xs select-none" id="mobile-sidebar-contents-tray">
          <div 
            className="bg-[#0E1321] rounded-t-2xl w-full max-h-[80vh] flex flex-col overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header drawer controls */}
            <div className="p-4 border-b border-[#1E293B] flex justify-between items-center bg-[#121829]">
              <span className="font-mono text-xs text-gray-400 font-extrabold uppercase tracking-wider">Course Syllabus Index</span>
              <button onClick={() => setIsMobileDrawerOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 text-left border-b border-[#1E293B] bg-[#0E1321]">
              <h3 className="font-bold text-sm text-white">{course.title}</h3>
              <p className="text-[10px] text-gray-500 mt-1 uppercase font-mono">{completedLessons.length} / {totalLessonsCount} lessons complete</p>
            </div>

            <div className="flex-grow overflow-y-auto">
              {course.syllabus.map(mod => (
                <div key={mod.id}>
                  <div className="p-3 bg-[#121829] text-[10px] font-bold text-gray-400 uppercase font-mono text-left">{mod.title}</div>
                  <div className="divide-y divide-[#1E293B]/30">
                    {mod.lessons.map(lesson => {
                      const isCurrent = lesson.id === activeLesson.id;
                      const isDone = completedLessons.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            setActiveLesson(lesson);
                            setIsMobileDrawerOpen(false);
                            window.scrollTo({ top: 0 });
                          }}
                          className={`w-full p-4 flex items-start gap-3 transition-colors text-left text-xs ${
                            isCurrent ? 'bg-[#151D33] border-l-4 border-blue-500 font-bold' : ''
                          }`}
                        >
                          <div className="shrink-0 mt-0.5">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/10" />
                            ) : (
                              <Circle className="w-4 h-4 text-gray-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-xs text-white pb-0.5">{lesson.title}</h4>
                            <span className="text-[10px] text-gray-500 font-mono">{lesson.duration}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. MOBILE SPEED SELECTION BOTTOM SHEET */}
      {isSpeedSheetOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/80 backdrop-blur-xs select-none">
          <div className="bg-[#0E1321] rounded-t-2xl w-full p-6 text-left space-y-4">
            <div className="flex justify-between items-center border-b border-[#1E293B] pb-3">
              <h3 className="font-mono text-xs font-extrabold uppercase tracking-wider text-gray-400">Select Playback Speed</h3>
              <button onClick={() => setIsSpeedSheetOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-col gap-1">
              {[0.75, 1, 1.25, 1.5, 2].map(speed => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`w-full py-4 text-center rounded-xl font-mono text-sm font-bold transition-colors ${
                    playbackSpeed === speed ? 'bg-[#F59E0B] text-navy-950 font-black' : 'text-gray-300 hover:bg-[#121829]'
                  }`}
                >
                  {speed === 1 ? 'Standard (1.0x)' : `${speed}x Speed`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. CELEBRATION MODAL FOR COURSE COMPLETION */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/90 backdrop-blur-xs text-navy-950 select-none animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl p-6 sm:p-8 text-center space-y-6 border border-amber-300 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-amber-600 border border-amber-200">
              <Award className="w-8 h-8 stroke-[2.2] animate-pulse text-amber-500" />
            </div>

            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-mono text-amber-600 font-black uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded inline-block">
                CURRICULA GRADUATED
              </span>
              <h3 className="text-xl font-black text-navy-950 tracking-tight leading-snug">
                Syllabus Accomplished!
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                Amazing effort, <strong>{currentUser.name}</strong>! Official grading has been completed and registered on your professional certificate.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-gray-100 rounded-2xl text-[11px] font-mono leading-relaxed space-y-1.5" id="cert-congratulations-card">
              <div className="flex justify-between items-center text-gray-400">
                <span>Certification Code:</span>
                <span className="font-bold text-navy-950">SF-GRAD-{(Math.floor(Math.random() * 90000) + 10000)}Y</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>Completion Status:</span>
                <span className="font-bold text-emerald-600 uppercase">Verified Live</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowCelebration(false);
                setTab('certificates');
                window.scrollTo({ top: 0 });
              }}
              className="w-full py-3 px-4 bg-[#F59E0B] hover:bg-amber-600 text-navy-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer text-center"
            >
              Proceed to Certificates →
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
