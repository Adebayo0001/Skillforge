import React, { useState, useEffect } from 'react';
import { 
  Sparkles, GraduationCap, X, CheckCircle2, ShieldCheck, 
  Building, ChevronRight, Check, Send, Award, DollarSign, ExternalLink, Star
} from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OutcomesSection from './components/OutcomesSection';
import HowItWorks from './components/HowItWorks';
import InstructorSection from './components/InstructorSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingFaqSection from './components/PricingFaqSection';
import Footer from './components/Footer';
import CourseCatalogue from './components/CourseCatalogue';
import CourseDetailPage from './components/CourseDetailPage';
import AboutPage from './components/AboutPage';
import InstructorsPage from './components/InstructorsPage';
import AuthModal from './components/AuthModal';
import CourseCard from './components/CourseCard';

import { Course } from './types';
import { COURSES, INSTRUCTORS } from './data';

interface UserProfile {
  name: string;
  email: string;
  company?: string;
  profession?: string;
}

export default function App() {
  const [currentTab, setTab] = useState<string>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  // Auth state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  // Checkout states
  const [checkoutCourse, setCheckoutCourse] = useState<Course | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [enrolledCourseSlugs, setEnrolledCourseSlugs] = useState<string[]>([]);

  // Corporate inquiry states
  const [corporateFormSubmitted, setCorporateFormSubmitted] = useState(false);
  const [corpName, setCorpName] = useState('');
  const [corpEmail, setCorpEmail] = useState('');
  const [corpSize, setCorpSize] = useState('10-50');
  const [corpMessage, setCorpMessage] = useState('');

  // Load user session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('sf_current_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setCurrentUser(parsed);
        loadEnrolledCourses(parsed.email);
      } catch (e) {
        localStorage.removeItem('sf_current_user');
      }
    }
  }, []);

  const loadEnrolledCourses = (email: string) => {
    const enrolls = JSON.parse(localStorage.getItem(`sf_enrolls_${email.toLowerCase()}`) || '[]');
    setEnrolledCourseSlugs(enrolls);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    loadEnrolledCourses(user.email);
  };

  const handleLogout = () => {
    localStorage.removeItem('sf_current_user');
    setCurrentUser(null);
    setEnrolledCourseSlugs([]);
    setTab('home');
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setTab('course-detail');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleEnrolAttempt = (course: Course) => {
    if (!currentUser) {
      setAuthModalTab('signup');
      setAuthModalOpen(true);
      return;
    }
    // Match already enrolled
    if (enrolledCourseSlugs.includes(course.slug)) {
      alert(`You are already enrolled in ${course.title}!`);
      return;
    }
    // Launch Paystack Secure Checkout Simulator
    setCheckoutCourse(course);
  };

  const confirmPaystackPayment = () => {
    if (!checkoutCourse || !currentUser) return;
    setCheckoutLoading(true);

    setTimeout(() => {
      setCheckoutLoading(false);
      setCheckoutSuccess(true);
      
      // Save course enrollment
      const email = currentUser.email.toLowerCase();
      const currentEnrolls = JSON.parse(localStorage.getItem(`sf_enrolls_${email}`) || '[]');
      if (!currentEnrolls.includes(checkoutCourse.slug)) {
        currentEnrolls.push(checkoutCourse.slug);
        localStorage.setItem(`sf_enrolls_${email}`, JSON.stringify(currentEnrolls));
      }
      
      setEnrolledCourseSlugs(currentEnrolls);

      setTimeout(() => {
        setCheckoutSuccess(false);
        setCheckoutCourse(null);
      }, 3000);

    }, 1500);
  };

  const handleCorpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCorporateFormSubmitted(true);
    setTimeout(() => {
      setCorporateFormSubmitted(false);
      setCorpName('');
      setCorpEmail('');
      setCorpMessage('');
    }, 4500);
  };

  // Find featured courses list
  const featuredCourses = COURSES.filter(c => c.isFeatured).sort((a, b) => b.enrolledCount - a.enrolledCount);
  
  // Pick primary featured course for Hero card
  const heroFeaturedCourse = COURSES.find(c => c.id === 'data-analysis-python') || COURSES[0];

  return (
    <div className="min-h-screen bg-white text-navy-950 font-sans flex flex-col justify-between selection:bg-amber-100 selection:text-navy-950" id="application-root-container">
      
      {/* Navigation Header */}
      <Navbar 
        currentTab={currentTab}
        setTab={(tab) => {
          setTab(tab);
          setSelectedCourse(null);
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={(tab) => {
          setAuthModalTab(tab);
          setAuthModalOpen(true);
        }}
      />

      {/* Main Routing Views */}
      <div id="main-route-content" className="flex-grow">
        
        {/* Course matriculated alert banner */}
        {currentUser && enrolledCourseSlugs.length > 0 && currentTab === 'home' && (
          <div className="bg-amber-500 py-3.5 px-4 sm:px-8 text-navy-950 font-bold text-center text-xs sm:text-sm flex flex-wrap items-center justify-center gap-2.5 shadow-inner" id="matriculation-announcement">
            <Sparkles className="w-4 h-4 text-navy-950 animate-pulse shrink-0" />
            <span>Welcome, <strong>{currentUser.name}</strong>! You have access to <strong>{enrolledCourseSlugs.length}</strong> active syllabus templates.</span>
            <button 
              onClick={() => {
                setTab('courses');
                window.scrollTo({ top: 0 });
              }} 
              className="bg-navy-950 hover:bg-navy-900 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-md transition-colors cursor-pointer"
            >
              Verify Class Dashboard →
            </button>
          </div>
        )}

        {/* 1. HOMEPAGE */}
        {currentTab === 'home' && (
          <div id="homepage-container" className="animate-fade-in">
            {/* Hero Section */}
            <Hero 
              featuredCourse={heroFeaturedCourse}
              onBrowseCourses={() => setTab('courses')}
              onSeeStudentResults={() => {
                const target = document.getElementById('outcomes-section');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectCourse={handleSelectCourse}
            />

            {/* Outcomes Section */}
            <OutcomesSection />

            {/* Featured Courses section */}
            <section id="featured-courses-section" className="py-20 bg-white text-navy-950 border-t border-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
                <span className="text-xs sm:text-sm font-extrabold text-[#F59E0B] tracking-[0.2em] uppercase font-mono">
                  POPULAR CURRICULA
                </span>
                <h2 className="text-3xl sm:text-4.5xl font-black text-[#0f2044] mt-2 tracking-tight">
                  Most Popular Courses
                </h2>
                <p className="text-sm sm:text-base text-gray-500 mt-3 leading-relaxed max-w-xl mx-auto">
                  Our live cohorts are small but deliver maximum accountability. Pick a discipline aligned to modern enterprise needs.
                </p>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 text-left" id="home-featured-grid">
                  {COURSES.filter(c => c.isFeatured).slice(0, 6).map(course => (
                    <div key={course.id} className="relative">
                      {enrolledCourseSlugs.includes(course.slug) && (
                        <div className="absolute top-3 left-3 z-30 bg-emerald-500 text-white font-black font-mono text-[9px] uppercase tracking-wider py-1 px-2.5 rounded shadow flex items-center gap-1 sm:top-2 sm:left-2">
                          <Check className="w-3 h-3 text-white" /> Enrolled
                        </div>
                      )}
                      <CourseCard course={course} onSelect={handleSelectCourse} />
                    </div>
                  ))}
                </div>

                <div className="mt-12 text-center" id="home-catalogue-cta">
                  <button
                    id="btn-see-all-courses-link"
                    onClick={() => {
                      setTab('courses');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                    className="inline-flex items-center gap-2 font-extrabold text-sm text-amber-600 hover:text-amber-700 uppercase tracking-wider cursor-pointer group"
                  >
                    <span>See all 12 professional courses</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <HowItWorks />

            {/* Instructor Highlights Section */}
            <InstructorSection 
              onSelectInstructor={(inst) => {
                setTab('instructors');
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
            />

            {/* Testimonials */}
            <TestimonialsSection />

            {/* Pricing Range FAQ Section */}
            <PricingFaqSection />

            {/* FINAL CTA JUMBOTRON */}
            <section id="homepage-final-cta-block" className="py-20 bg-[#0F2044] text-white overflow-hidden relative border-t border-white/5">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-6 relative z-10">
                <span className="text-xs sm:text-sm font-extrabold text-amber-400 tracking-[0.25em] font-mono uppercase">
                  LIMITED SEATS FOR NEXT COHORT
                </span>
                
                <h2 className="text-3xl sm:text-4.5xl font-black text-white leading-none tracking-tight">
                  Ready to start learning?
                </h2>
                
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl mx-auto">
                  Browse our portfolio of 12 professional courses across technology, business, and creative skills. Elevate your competence during lunch breaks.
                </p>

                <div className="pt-2">
                  <button
                    id="btn-final-cta-browse"
                    onClick={() => {
                      setTab('courses');
                      window.scrollTo({ top: 0 });
                    }}
                    className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-navy-950 font-extrabold text-sm tracking-wider rounded-lg shadow-xl cursor-pointer transition-all"
                  >
                    Browse All Courses Now
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 2. COURSE CATALOGUE */}
        {currentTab === 'courses' && (
          <div className="animate-fade-in" id="catalogue-view">
            <CourseCatalogue 
              onSelectCourse={handleSelectCourse}
            />
          </div>
        )}

        {/* 3. COURSE DETAIL PAGE */}
        {currentTab === 'course-detail' && selectedCourse && (
          <div className="animate-fade-in" id="detail-view">
            {/* Display banner celebrating active enrolment details inside the detailed page! */}
            {enrolledCourseSlugs.includes(selectedCourse.slug) && (
              <div className="bg-emerald-50 border-b border-emerald-100 py-4 px-4 sm:px-8 text-left" id="active-matriculation-banner">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-emerald-800">
                  <div className="flex items-start gap-3 text-xs sm:text-sm">
                    <div className="p-2 bg-emerald-100 rounded-full text-emerald-600 shrink-0 mt-0.5">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-navy-950">You are enrolled in this course!</h4>
                      <p className="text-gray-500 mt-1">Official verified certificate code: <strong className="font-mono text-gray-700">SF-GRAD-{selectedCourse.id.toUpperCase()}-2026</strong></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <a 
                      href="https://chat.whatsapp.com/mock-id" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-all shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Join WhatsApp Peers
                    </a>
                  </div>
                </div>
              </div>
            )}

            <CourseDetailPage 
              course={selectedCourse}
              onBack={() => {
                setTab('courses');
                setSelectedCourse(null);
                window.scrollTo({ top: 0 });
              }}
              onEnrol={handleEnrolAttempt}
            />
          </div>
        )}

        {/* 4. ABOUT PAGE */}
        {currentTab === 'about' && (
          <div className="animate-fade-in" id="about-view">
            <AboutPage />
          </div>
        )}

        {/* 5. INSTRUCTORS PAGE */}
        {currentTab === 'instructors' && (
          <div className="animate-fade-in" id="instructors-view">
            <InstructorsPage 
              onSelectCourse={handleSelectCourse}
            />
          </div>
        )}

        {/* 6. CORPORATE INQUIRY VIEW */}
        {currentTab === 'corporate' && (
          <section className="py-20 bg-slate-50 text-navy-950 animate-fade-in" id="corporate-training-panel">
            <div className="max-w-4xl mx-auto px-4 sm:px-8 text-left">
              
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs sm:text-sm font-extrabold text-[#F59E0B] tracking-[0.2em] font-mono uppercase">
                  ENTERPRISE PLATFORMS
                </span>
                <h1 className="text-3xl sm:text-4.5xl font-black text-[#0f2044] mt-2 tracking-tight">
                  Corporate Retainer Training
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
                  Train entire departments. We formulate private live virtual cohorts, formulate custom business project rubrics, and deliver detailed developer competency logs to HR training administrators.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                
                {/* Benefits specs list info */}
                <div className="md:col-span-5 space-y-6" id="corp-benefits-listing">
                  <h3 className="text-xs font-bold text-navy-900 tracking-wider font-mono uppercase">
                    Retainer Features
                  </h3>

                  <div className="flex gap-3">
                    <div className="p-1.5 bg-amber-100 rounded-lg text-amber-600 h-fit shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy-950">Tailored Corporate Project Rubrics</h4>
                      <p className="text-xs text-gray-500 mt-0.5">We map capstone assignments directly onto your actual company database pipelines or product roadmaps.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="p-1.5 bg-amber-100 rounded-lg text-amber-600 h-fit shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy-950">Coaches Sync Logs</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Get weekly grade profiles and attendance tracking spreadsheets detailing your employee effort metrics.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="p-1.5 bg-amber-100 rounded-lg text-amber-600 h-fit shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy-950">Installment & Credit billing</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Flexible payment schedules optimized around fiscal quarter release cycles, backed by VAT inputs.</p>
                    </div>
                  </div>
                </div>

                {/* Inquiry Contact Form Column */}
                <div className="md:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xl" id="corp-contact-form-block">
                  <h3 className="text-sm font-bold text-navy-950 uppercase tracking-widest font-mono mb-4 border-b border-gray-50 pb-3">
                    Submit RFP Retainer Inquiry
                  </h3>

                  {corporateFormSubmitted ? (
                    <div className="py-12 text-center space-y-4 animate-fade-in" id="corp-form-success">
                      <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-black text-navy-950">RFP Inquiry Registered!</h4>
                      <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                        Inquiry logged under local time. An education advisor from SkillForge Academy will review your training scope and contact you in under 4 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleCorpSubmit} className="space-y-4" id="corp-form-handler">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Contact Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Adebayo Adebayo"
                            className="w-full text-xs font-semibold px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-500"
                            value={corpName}
                            onChange={(e) => setCorpName(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Corporate Email</label>
                          <input
                            type="email"
                            required
                            placeholder="hr@accessbank.com"
                            className="w-full text-xs font-semibold px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-500"
                            value={corpEmail}
                            onChange={(e) => setCorpEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Employee Count to Train</label>
                        <select
                          className="w-full text-xs font-semibold px-3 py-2.5 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-amber-500"
                          value={corpSize}
                          onChange={(e) => setCorpSize(e.target.value)}
                        >
                          <option value="5-10">5 - 10 professionals</option>
                          <option value="10-50">10 - 50 professionals</option>
                          <option value="50-100">50 - 100 professionals</option>
                          <option value="100+">100+ enterprise scale</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Requested Curriculum Scopes</label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Tell us what departments you want to train (e.g., We need to transition 15 analysts from Excel to Python...)"
                          className="w-full text-xs font-semibold px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-500 placeholder:text-gray-300"
                          value={corpMessage}
                          onChange={(e) => setCorpMessage(e.target.value)}
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#F59E0B] hover:bg-amber-600 text-navy-950 font-black text-xs tracking-wider rounded-lg shadow cursor-pointer transition-colors"
                      >
                        Submit Retainer Scope For Proposal
                      </button>
                    </form>
                  )}
                </div>

              </div>

            </div>
          </section>
        )}

      </div>

      {/* FOOTER */}
      <Footer setTab={(tab) => {
        setTab(tab);
        setSelectedCourse(null);
      }} />

      {/* AUTHENTICATION DIALOG MODAL */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authModalTab}
        onSuccess={handleLoginSuccess}
      />

      {/* PAYSTACK CHECKOUT SIMULATOR DIALOG */}
      {checkoutCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-xs" id="checkout-simulator-overlay">
          <div 
            className="w-full max-w-sm overflow-hidden bg-white rounded-2xl shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
            id="checkout-simulator-container"
          >
            {/* Paystack brand title strip */}
            <div className="bg-[#09A5DB] p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-400 shrink-0" />
                <span className="font-mono text-xs font-extrabold tracking-wider uppercase">Paystack Secure Checkout</span>
              </div>
              <button 
                onClick={() => setCheckoutCourse(null)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 text-center space-y-5">
              {checkoutSuccess ? (
                <div className="py-6 space-y-3 animate-fade-in text-emerald-800" id="checkout-success">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h4 className="text-base font-black">Tuition Paid Successfully!</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-mono">
                    Receipt Code: PS-SF-TX-{(Math.floor(Math.random() * 90000) + 10000)}Y
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Class active. WhatsApp connection codes registered inside dashboard.
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-left border-b border-gray-100 pb-4">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block font-mono">ENROLLING IN</span>
                    <h4 className="text-sm font-black text-navy-950 mt-1 line-clamp-1">{checkoutCourse.title}</h4>
                    <span className="text-xs text-[#0f2044] font-medium block mt-0.5">{checkoutCourse.format}</span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-50 border border-gray-100 p-3 rounded-lg text-xs leading-none">
                    <span className="text-gray-500">Subtotal Tuition</span>
                    <span className="font-bold text-navy-950 font-mono">₦{checkoutCourse.price.toLocaleString()}</span>
                  </div>

                  <div className="text-xs text-gray-400 leading-relaxed">
                    Choose standard card channel or direct bank transfer simulation powered by Paystack API sandboxing.
                  </div>

                  <button
                    onClick={confirmPaystackPayment}
                    disabled={checkoutLoading}
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-100 text-white font-extrabold text-xs tracking-wider rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer text-center"
                  >
                    {checkoutLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        Processing Secure Sandbox...
                      </span>
                    ) : (
                      `Simulate ₦${checkoutCourse.price.toLocaleString()} Sandbox Checkout`
                    )}
                  </button>
                  
                  <p className="text-[10px] text-gray-400 font-mono italic">
                    Secure HTTPS Sandbox • RC 1234567 • Paystack
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
