import { Instagram, Linkedin, Twitter, Youtube, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setTab: (tab: string) => void;
}

export default function Footer({ setTab }: FooterProps) {
  const handleNavClick = (tab: string) => {
    setTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <footer id="skillforge-corporate-footer" className="bg-[#0F2044] text-white/80 py-16 px-4 sm:px-8 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 text-left">
        
        {/* Column 1 - Brand Summary */}
        <div className="col-span-2 flex flex-col items-start gap-4 pr-0 md:pr-8" id="footer-brand-column">
          <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => handleNavClick('home')}>
            <svg 
              className="w-8 h-8 text-amber-500" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
            >
              <path d="M4 10h16v3c0 2-3 4-5 4H9c-2 0-5-2-5-4v-3z" fill="currentColor" fillOpacity="0.15" />
              <path d="M2 6h20v2H2z" />
              <path d="M12 4v2" />
              <path d="M8 4h8" />
              <path d="M7 16l-3 4h16l-3-4" />
            </svg>
            <div className="flex flex-col">
              <span className="font-sans font-extrabold text-white text-base leading-tight uppercase">
                SkillForge
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#F59E0B] font-bold uppercase leading-none">
                Academy
              </span>
            </div>
          </div>
          
          <p className="text-xs text-white/60 leading-relaxed max-w-xs mt-2">
            SkillForge Academy trains ambitious Nigerian professionals with premium, action-focused interactive modules designed to boost career and financial mobility.
          </p>

          {/* Social Platforms Links */}
          <div className="flex items-center gap-4 mt-2" id="footer-social-links-row">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-white/5 hover:bg-amber-500 hover:text-navy-950 rounded-lg transition-all text-white/80">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 bg-white/5 hover:bg-amber-500 hover:text-navy-950 rounded-lg transition-all text-white/80">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 bg-white/5 hover:bg-amber-500 hover:text-navy-950 rounded-lg transition-all text-white/80">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 bg-white/5 hover:bg-amber-500 hover:text-navy-950 rounded-lg transition-all text-white/80">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2 - Academy Paths */}
        <div className="flex flex-col items-start gap-3 text-xs" id="footer-academy-paths">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-mono text-amber-500">
            Academy Paths
          </h4>
          <button onClick={() => handleNavClick('courses')} className="hover:text-amber-400 transition-colors cursor-pointer text-left py-1">
            Technology Curriculum
          </button>
          <button onClick={() => handleNavClick('courses')} className="hover:text-amber-400 transition-colors cursor-pointer text-left py-1">
            Data Engineering & Analysis
          </button>
          <button onClick={() => handleNavClick('courses')} className="hover:text-amber-400 transition-colors cursor-pointer text-left py-1">
            Business Administration
          </button>
          <button onClick={() => handleNavClick('courses')} className="hover:text-amber-400 transition-colors cursor-pointer text-left py-1">
            Creative Product Systems
          </button>
        </div>

        {/* Column 3 - Company */}
        <div className="flex flex-col items-start gap-3 text-xs" id="footer-company-info">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-mono text-amber-500">
            Company
          </h4>
          <button onClick={() => handleNavClick('about')} className="hover:text-amber-400 transition-colors cursor-pointer text-left py-1">
            Our Mission Story
          </button>
          <button onClick={() => handleNavClick('instructors')} className="hover:text-amber-400 transition-colors cursor-pointer text-left py-1">
            Expert Faculty Profiles
          </button>
          <button className="hover:text-amber-400 font-medium text-amber-500 transition-colors cursor-pointer text-left flex items-center gap-1 py-1">
            Corporate Retainer <ArrowUpRight className="w-3 h-3" />
          </button>
          <button className="hover:text-amber-400 transition-colors cursor-pointer text-left py-1">
            Careers
          </button>
        </div>

        {/* Column 4 - Legal & Local */}
        <div className="flex flex-col items-start gap-3 text-xs" id="footer-legal-section">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-mono text-amber-500">
            Licensing
          </h4>
          <button className="hover:text-amber-400 transition-colors text-left py-1">
            Terms of Matriculation
          </button>
          <button className="hover:text-amber-400 transition-colors text-left py-1">
            Privacy & Trust Framework
          </button>
          <button className="hover:text-amber-400 transition-colors text-left py-1">
            Refund Guarantee Terms
          </button>
          <span className="text-[10px] text-white/40 mt-1 uppercase font-mono font-bold">
            RC 1234567 • Federal Bureau
          </span>
        </div>

      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/45">
        <span id="footer-cr-text">
          © {new Date().getFullYear()} SkillForge Academy. RC 1234567. All rights reserved. Registered under Nigerian Corporate Law.
        </span>
        <div className="flex items-center gap-4 font-mono text-[10px]" id="footer-status">
          <span className="text-emerald-400">● Core Node Ready</span>
          <span>Cohort 2026 Admissions Open</span>
        </div>
      </div>
    </footer>
  );
}
