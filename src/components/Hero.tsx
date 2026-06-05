import { Star, ShieldCheck, Play, ArrowRight, Award } from 'lucide-react';
import { Course } from '../types';

interface HeroProps {
  featuredCourse: Course;
  onBrowseCourses: () => void;
  onSeeStudentResults: () => void;
  onSelectCourse: (course: Course) => void;
}

export default function Hero({ featuredCourse, onBrowseCourses, onSeeStudentResults, onSelectCourse }: HeroProps) {
  // Array of placeholder student image avatars
  const AVATARS = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop'
  ];

  return (
    <section id="homepage-hero-section" className="relative bg-[#0F2044] text-white overflow-hidden">
      {/* Visual Ambient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-16 lg:pt-20 lg:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column (55%) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col items-start gap-6" id="hero-left-content">
          <span 
            id="lbl-hero-badge"
            className="text-xs sm:text-sm font-extrabold text-amber-400 tracking-[0.2em] uppercase font-mono"
          >
            PROFESSIONAL SKILLS TRAINING
          </span>
          
          <h1 
            id="heading-hero"
            className="text-[38px] sm:text-[56px] leading-[1.05] font-extrabold tracking-tight text-white font-sans text-left"
            style={{ fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif' }}
          >
            The skills Nigerian professionals need to earn more and do more
          </h1>

          <p 
            id="paragraph-hero-subtitle"
            className="text-base sm:text-lg text-white/75 leading-relaxed font-normal max-w-xl text-left"
          >
            Live cohort courses and self-paced programmes designed for ambitious professionals who learn between meetings, on commutes, and during lunch breaks.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap gap-4 w-full sm:w-auto" id="hero-ctas-container">
            <button
              id="btn-hero-browse"
              onClick={onBrowseCourses}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-amber-500 hover:bg-amber-600 font-extrabold text-navy-950 shadow-lg shadow-amber-500/10 text-sm tracking-wide cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <span>Browse Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="btn-hero-results"
              onClick={onSeeStudentResults}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 font-bold text-white text-sm cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <span>See Student Results</span>
            </button>
          </div>

          {/* Social Proof Stats */}
          <div className="flex flex-wrap items-center gap-4 mt-4 border-t border-white/10 pt-6 w-full" id="hero-social-proof">
            <div className="flex -space-x-3.5" id="hero-avatars">
              {AVATARS.map((p, idx) => (
                <img
                  key={idx}
                  src={p}
                  alt="Student Avatar"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full border-2 border-[#0F2044] object-cover"
                />
              ))}
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5" id="hero-stars-container">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current stroke-current" />
                  ))}
                </div>
                <span className="text-sm font-bold text-white">4.9/5</span>
                <span className="text-xs text-white/50">(312 reviews)</span>
              </div>
              <p className="text-xs text-white/70 mt-1 font-mono font-medium">
                Join 847 professionals already enrolled
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (45%) */}
        <div className="col-span-1 lg:col-span-5 flex justify-center" id="hero-right-content">
          {/* Featured Course Card */}
          <div 
            id="featured-course-hero-card"
            onClick={() => onSelectCourse(featuredCourse)}
            className="w-full max-w-sm rounded-2xl bg-white text-navy-950 overflow-hidden shadow-2xl shadow-amber-500/5 border border-white/5 cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
          >
            {/* Aspect Ratio Container */}
            <div className="relative aspect-video w-full overflow-hidden">
              <img 
                src={featuredCourse.thumbnailUrl} 
                alt={featuredCourse.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-amber-500 text-navy-950 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-sm font-mono">
                Featured training
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                <span className="text-xs text-white/90 font-mono font-bold tracking-widest uppercase">
                  {featuredCourse.format}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 mb-2 font-mono">
                <span>{featuredCourse.category}</span>
                <span>•</span>
                <span>{featuredCourse.level}</span>
              </div>

              <h3 className="text-lg font-extrabold text-navy-950 font-sans tracking-tight leading-tight hover:text-amber-600 transition-colors">
                {featuredCourse.title}
              </h3>

              <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                {featuredCourse.subtitle}
              </p>

              {/* Progress and Completion Stats */}
              <div className="mt-5 border-t border-gray-50 pt-4">
                <div className="flex justify-between items-center text-xs text-gray-500 font-medium mb-1.5">
                  <span className="flex items-center gap-1 text-[#0F2044] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    Highly Accountable
                  </span>
                  <span className="text-gray-900 font-bold font-mono">68% Success</span>
                </div>
                
                {/* Visual completion progress bar */}
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '68%' }} />
                </div>
                
                <p className="text-[11px] text-gray-400 mt-1.5 text-left font-serif italic">
                  "68% of enrolled students finish core portfolio assignments in 6 weeks."
                </p>
              </div>

              {/* Action area inside card */}
              <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-100">
                <span className="text-sm font-extrabold text-navy-900 font-mono">
                  ₦{featuredCourse.price.toLocaleString()}
                </span>
                <span className="flex items-center gap-1 text-xs font-extrabold text-amber-600 uppercase tracking-wider">
                  View Syllabus <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Trust bar row at the bottom */}
      <div 
        id="trusted-logos-ribbon"
        className="bg-navy-950 py-10 px-4 sm:px-8 border-t border-white/5 w-full flex flex-col items-center gap-6"
      >
        <span className="text-xs font-bold text-white/40 uppercase tracking-widest font-mono text-center">
          SkillForge graduates work at prestigious platforms:
        </span>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-y-6 gap-x-12 sm:gap-x-16 opacity-40">
          <span className="text-white font-sans font-extrabold text-sm sm:text-lg tracking-tight hover:opacity-100 transition-opacity">
            Access Bank
          </span>
          <span className="text-white font-mono font-extrabold text-lg sm:text-xl tracking-tighter hover:opacity-100 transition-opacity">
            MTN Group
          </span>
          <span className="text-white font-sans font-black text-sm sm:text-lg italic hover:opacity-100 transition-opacity">
            Flutterwave
          </span>
          <span className="text-white font-serif font-bold text-base sm:text-lg hover:opacity-100 transition-opacity">
            PwC
          </span>
          <span className="text-white font-sans font-medium text-lg sm:text-xl tracking-widest uppercase hover:opacity-100 transition-opacity">
            Andela
          </span>
          <span className="text-white font-sans font-bold text-sm sm:text-lg hover:opacity-100 transition-opacity">
            Paystack
          </span>
        </div>
      </div>

    </section>
  );
}
