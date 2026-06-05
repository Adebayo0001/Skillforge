import React, { useState, useEffect } from 'react';
import { 
  Award, Trophy, Download, Share2, Clipboard, 
  Check, Linkedin, BookOpen, Clock, Calendar, ShieldCheck 
} from 'lucide-react';
import { Course } from '../types';
import { COURSES } from '../data';

interface CertificatesPageProps {
  currentUser: { name: string; email: string };
  setTab: (tab: string) => void;
}

export default function CertificatesPage({ currentUser, setTab }: CertificatesPageProps) {
  const email = currentUser.email.toLowerCase();
  
  const [completedCourses, setCompletedCourses] = useState<Course[]>([]);
  const [completionDates, setCompletionDates] = useState<Record<string, string>>({});
  const [copyingSlug, setCopyingSlug] = useState<string | null>(null);

  useEffect(() => {
    // Fetch completed slugs
    const completedSlugs: string[] = JSON.parse(localStorage.getItem(`sf_completed_courses_${email}`) || '[]');
    const matched = COURSES.filter(c => completedSlugs.includes(c.slug));
    setCompletedCourses(matched);

    // Mock completion dates or load existing date stamps
    const dates: Record<string, string> = {};
    matched.forEach(c => {
      // Look up if we have a saved activity stamp for the last lesson, or default to today
      const completedList: string[] = JSON.parse(localStorage.getItem(`sf_completed_lessons_${email}_${c.slug}`) || '[]');
      const lastId = completedList[completedList.length - 1];
      const recentLogs: any[] = JSON.parse(localStorage.getItem(`sf_recent_activity_${email}`) || '[]');
      const matchLog = recentLogs.find(l => l.lessonId === lastId && l.courseSlug === c.slug);
      
      dates[c.slug] = matchLog 
        ? new Date(matchLog.date).toLocaleDateString("en-NG", { year: 'numeric', month: 'long', day: 'numeric' })
        : new Date().toLocaleDateString("en-NG", { year: 'numeric', month: 'long', day: 'numeric' });
    });
    setCompletionDates(dates);
  }, [currentUser]);

  // Download simulation Action
  const handleDownloadPDF = (course: Course) => {
    const certCode = `SF-GRAD-${Math.floor(100000 + Math.random() * 900000)}`;
    const text = `
=========================================
          SKILLFORGE ACADEMY
=========================================
       VERIFIED GRADUATION DIPLOMA

This is to officially certify that:
          ${currentUser.name.toUpperCase()}

has successfully fulfilled all requirement indices
and graduated with 100% attendance logs from:

      ${course.title.toUpperCase()}
      
Syllabus Modules Completed:
${course.syllabus.map((m, idx) => ` - [x] ${m.title}`).join('\n')}

Authenticity Verification Code: ${certCode}
Registry Date: ${completionDates[course.slug] || new Date().toLocaleDateString()}
License: Federal Republic of Nigeria, RC 1234567.
=========================================
    Verify at: https://verify.skillforge.academy
=========================================
`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SkillForge_Certificate_${course.slug}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // LinkedIn Share action format:
  // "I just completed {courseName} at SkillForge Academy! Verified certificate: {verification_url} #SkillForge #ProfessionalDevelopment"
  const handleShareLinkedIn = (course: Course) => {
    const code = `SF-GRAD-${Math.floor(100000 + Math.random() * 900000)}`;
    const verifyUrl = `https://verify.skillforge.academy/cert/${code}`;
    const shareText = `I just completed ${course.title} at SkillForge Academy! Verified certificate: ${verifyUrl} #SkillForge #ProfessionalDevelopment`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareText);
    setCopyingSlug(course.slug);
    
    // Custom LinkedIn sharing intent trigger
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(verifyUrl)}&summary=${encodeURIComponent(shareText)}`;
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setCopyingSlug(null);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10" id="certificates-dashboard-view">
      
      {/* View Header */}
      <div className="text-left max-w-2xl mb-12">
        <span className="text-xs font-black text-[#F59E0B] tracking-[0.2em] font-mono uppercase bg-amber-50 px-2.5 py-1 rounded inline-block">
          GRADUATION REGISTRY
        </span>
        <h1 className="text-3xl font-black text-navy-950 mt-2.5 tracking-tight">
          Verified Certificate Credentials
        </h1>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed">
          Upgrade your professional visibility. Every template listed here represents full cohort attendance logs verified under RC-1234567 licensing registries.
        </p>
      </div>

      {completedCourses.length === 0 ? (
        <div className="bg-slate-50 border border-gray-150 rounded-2xl p-12 text-center max-w-lg mx-auto space-y-5" id="certificates-empty-state">
          <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-black text-navy-950">No certificates unlocked</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Complete all lessons in a course to 100% progress. The final video milestone will generate your graduation code.
            </p>
          </div>
          <button
            onClick={() => setTab('dashboard')}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-navy-950 font-black text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            Go to Active Dashboard
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="certificates-cards-container">
          {completedCourses.map(course => {
            const registryDate = completionDates[course.slug] || new Date().toLocaleDateString();
            const certCode = `SF-C-${course.id.toUpperCase().slice(0, 4)}-${currentUser.name.split(' ')[0].toUpperCase()}`;

            return (
              <div 
                key={course.id}
                className="bg-white border-2 border-slate-100 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-amber-400/40 transition-all text-left"
              >
                {/* Border Accent decoration matching premium certificates */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0F2044] via-amber-500 to-[#0F2044]" />
                
                <div className="space-y-4">
                  
                  {/* Badge Row */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-600">
                      <Award className="w-8 h-8 stroke-[1.8]" />
                    </div>
                    <div className="text-right font-mono text-[9px] font-bold text-gray-400 space-y-0.5">
                      <span className="block uppercase text-emerald-600 flex items-center gap-1 justify-end">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> SEAL VERIFIED
                      </span>
                      <span className="block">REG: {certCode}</span>
                    </div>
                  </div>

                  {/* Course Details Text */}
                  <div className="space-y-1.5 pt-2">
                    <h2 className="text-lg font-black text-navy-950 tracking-tight leading-snug line-clamp-2">
                      {course.title}
                    </h2>
                    <p className="text-[11px] text-gray-400 uppercase font-mono tracking-wider">
                      Awarded to: <strong className="text-navy-950 font-extrabold">{currentUser.name}</strong>
                    </p>
                  </div>

                  {/* Completion Date Tag */}
                  <div className="p-3 bg-slate-50 border border-gray-100 rounded-xl flex items-center gap-2.5 text-xs text-gray-500">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Graduated on: <strong className="text-navy-950">{registryDate}</strong></span>
                  </div>

                </div>

                {/* Footer interactive buttons */}
                <div className="mt-8 pt-5 border-t border-gray-50 flex items-center gap-3">
                  <button
                    onClick={() => handleDownloadPDF(course)}
                    className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-navy-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Download certified text credentials"
                  >
                    <Download className="w-4 h-4 text-navy-950" />
                    <span>Download Transcript</span>
                  </button>

                  <button
                    onClick={() => handleShareLinkedIn(course)}
                    className="flex-1 py-3 px-4 bg-[#0077B5] hover:bg-[#00629B] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    title="Copy share script and open LinkedIn"
                  >
                    {copyingSlug === course.slug ? (
                      <>
                        <Check className="w-4 h-4 text-white shrink-0" />
                        <span>Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 text-white shrink-0" />
                        <span>Share on LinkedIn</span>
                      </>
                    )}
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
