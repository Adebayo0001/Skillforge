import { useState } from 'react';
import { Menu, X, User, LogOut, GraduationCap, ChevronRight } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  currentUser: any;
  onLogout: () => void;
  onOpenAuth: (tab: 'login' | 'signup') => void;
}

export default function Navbar({ currentTab, setTab, currentUser, onLogout, onOpenAuth }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    setTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <nav 
      id="main-navigation-bar"
      className="sticky top-0 z-40 h-[72px] bg-white border-b border-gray-100 backdrop-blur-md/90 shadow-xs flex items-center justify-between px-4 sm:px-8 w-full"
    >
      {/* Brand logo container */}
      <div 
        id="nav-logo-group" 
        onClick={() => handleNavClick('home')} 
        className="flex items-center gap-2 cursor-pointer shrink-0 select-none"
      >
        <svg 
          className="w-9 h-9 text-amber-500" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Custom Forge Anvil Logo */}
          <path d="M4 10h16v3c0 2-3 4-5 4H9c-2 0-5-2-5-4v-3z" fill="currentColor" fillOpacity="0.1" />
          <path d="M2 6h20v2H2z" />
          <path d="M12 4v2" />
          <path d="M8 4h8" />
          <path d="M7 16l-3 4h16l-3-4" />
        </svg>
        <div className="flex flex-col">
          <span className="font-sans font-extrabold text-navy-950 text-base sm:text-lg leading-tight tracking-tight uppercase">
            SkillForge
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[#F59E0B] font-bold uppercase leading-none">
            Academy
          </span>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-gray-600">
        <button
          id="nav-link-home"
          onClick={() => handleNavClick('home')}
          className={`cursor-pointer hover:text-amber-500 transition-colors py-2 ${
            currentTab === 'home' ? 'text-navy-950 font-semibold border-b-2 border-amber-500' : ''
          }`}
        >
          Home
        </button>
        <button
          id="nav-link-courses"
          onClick={() => handleNavClick('courses')}
          className={`cursor-pointer hover:text-amber-500 transition-colors py-2 ${
            currentTab === 'courses' ? 'text-navy-950 font-semibold border-b-2 border-amber-500' : ''
          }`}
        >
          Courses
        </button>
        <button
          id="nav-link-about"
          onClick={() => handleNavClick('about')}
          className={`cursor-pointer hover:text-amber-500 transition-colors py-2 ${
            currentTab === 'about' ? 'text-navy-950 font-semibold border-b-2 border-amber-500' : ''
          }`}
        >
          About
        </button>
        <button
          id="nav-link-instructors"
          onClick={() => handleNavClick('instructors')}
          className={`cursor-pointer hover:text-amber-500 transition-colors py-2 ${
            currentTab === 'instructors' ? 'text-navy-950 font-semibold border-b-2 border-amber-500' : ''
          }`}
        >
          Instructors
        </button>
        <button
          id="nav-link-corporate"
          onClick={() => handleNavClick('corporate')}
          className="cursor-pointer hover:text-amber-500 transition-colors py-2"
        >
          Corporate
        </button>
      </div>

      {/* Auth trigger elements */}
      <div className="hidden md:flex items-center gap-4">
        {currentUser ? (
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-xs font-semibold text-navy-950 leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-gray-400">
                {currentUser.company || 'Student'}
              </span>
            </div>
            <div className="p-1.5 bg-amber-50 border border-amber-100 text-[#F59E0B] rounded-lg">
              <GraduationCap className="w-4 h-4" />
            </div>
            <button
              id="btn-nav-logout"
              onClick={onLogout}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <button
              id="btn-nav-login"
              onClick={() => onOpenAuth('login')}
              className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-navy-950 rounded-lg cursor-pointer transition-colors"
            >
              Login
            </button>
            <button
              id="btn-nav-enrol"
              onClick={() => onOpenAuth('signup')}
              className="px-5 py-2.5 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-navy-950 font-extrabold text-sm tracking-wide shadow-sm hover:shadow-md cursor-pointer transition-all"
            >
              Enrol Now
            </button>
          </>
        )}
      </div>

      {/* Mobile Burger Trigger */}
      <button
        id="btn-hamburger-menu"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 text-gray-600 hover:text-navy-950 rounded-lg hover:bg-gray-50 focus:outline-none cursor-pointer"
        aria-label="Toggle Menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay - Full Screen with exactly 56px list rows */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-fullscreen"
          className="fixed inset-x-0 top-[72px] bottom-0 z-50 bg-white border-t border-gray-100 flex flex-col justify-between py-6 px-4 animate-fade-in"
        >
          <div className="flex flex-col gap-1">
            <button
              id="mobile-nav-home"
              onClick={() => handleNavClick('home')}
              className="h-[56px] w-full text-left font-sans text-lg font-bold text-navy-950 flex items-center justify-between border-b border-gray-50 px-2 cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <span>Home</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button
              id="mobile-nav-courses"
              onClick={() => handleNavClick('courses')}
              className="h-[56px] w-full text-left font-sans text-lg font-bold text-navy-950 flex items-center justify-between border-b border-gray-50 px-2 cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <span>Courses</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button
              id="mobile-nav-about"
              onClick={() => handleNavClick('about')}
              className="h-[56px] w-full text-left font-sans text-lg font-bold text-navy-950 flex items-center justify-between border-b border-gray-50 px-2 cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <span>About Academy</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button
              id="mobile-nav-instructors"
              onClick={() => handleNavClick('instructors')}
              className="h-[56px] w-full text-left font-sans text-lg font-bold text-navy-950 flex items-center justify-between border-b border-gray-50 px-2 cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <span>Instructors</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button
              id="mobile-nav-corporate"
              onClick={() => handleNavClick('corporate')}
              className="h-[56px] w-full text-left font-sans text-lg font-bold text-navy-950 flex items-center justify-between border-b border-gray-50 px-2 cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <span>Corporate Training</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-gray-100">
            {currentUser ? (
              <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg text-amber-500">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-950">{currentUser.name}</h4>
                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                  </div>
                </div>
                <button
                  id="btn-mobile-nav-logout"
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 bg-white rounded-lg cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  id="btn-mobile-login"
                  onClick={() => {
                    onOpenAuth('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 text-center rounded-xl font-bold text-sm text-navy-950 border border-gray-200 cursor-pointer"
                >
                  Login
                </button>
                <button
                  id="btn-mobile-signup"
                  onClick={() => {
                    onOpenAuth('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 text-center rounded-xl font-extrabold text-sm text-navy-950 bg-amber-500 cursor-pointer"
                >
                  Enrol Now
                </button>
              </div>
            )}
            <div className="text-center text-[10px] text-gray-400 mt-2">
              © 2026 SkillForge Academy. All rights reserved.
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
