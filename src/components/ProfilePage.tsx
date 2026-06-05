import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Briefcase, Building, Shovel, ShieldAlert,
  Save, LogOut, Check, RefreshCw, Key, ShieldCheck, ListChecks, HelpCircle
} from 'lucide-react';
import { Course } from '../types';

interface ProfilePageProps {
  currentUser: { name: string; email: string; company?: string; profession?: string; role?: 'student' | 'admin' };
  onUpdateUser: (updated: any) => void;
  onLogout: () => void;
  setTab: (tab: string) => void;
}

export default function ProfilePage({ currentUser, onUpdateUser, onLogout, setTab }: ProfilePageProps) {
  const email = currentUser.email.toLowerCase();

  // Inputs
  const [name, setName] = useState(currentUser.name || '');
  const [profession, setProfession] = useState(currentUser.profession || '');
  const [company, setCompany] = useState(currentUser.company || '');
  const [role, setRole] = useState<'student' | 'admin'>(currentUser.role || 'student');
  const [isSaved, setIsSaved] = useState(false);

  // Statistics
  const [attempts, setAttempts] = useState<any[]>([]);
  const [activitiesCount, setActivitiesCount] = useState(0);

  useEffect(() => {
    // Load diagnostic states
    const quizAttempts = JSON.parse(localStorage.getItem(`sf_quiz_attempts_${email}`) || '[]');
    setAttempts(quizAttempts);

    const activityLogs = JSON.parse(localStorage.getItem(`sf_recent_activity_${email}`) || '[]');
    setActivitiesCount(activityLogs.length);
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(false);

    const updated = {
      ...currentUser,
      name,
      profession,
      company,
      role
    };

    // Save back to local storage logged in state
    localStorage.setItem('sf_current_user', JSON.stringify(updated));

    // Save in user directory list as well
    const allUsers = JSON.parse(localStorage.getItem('sf_users') || '[]');
    const userIndex = allUsers.findIndex((u: any) => u.email.toLowerCase() === email);
    if (userIndex !== -1) {
      allUsers[userIndex] = {
        ...allUsers[userIndex],
        name,
        profession,
        company,
        role
      };
      localStorage.setItem('sf_users', JSON.stringify(allUsers));
    }

    onUpdateUser(updated);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10" id="profile-page-workspace">
      
      {/* View Header */}
      <div className="text-left max-w-2xl mb-12">
        <span className="text-xs font-black text-[#F59E0B] tracking-[0.2em] font-mono uppercase bg-amber-50 px-2.5 py-1 rounded inline-block">
          ACCOUNT SETTINGS
        </span>
        <h1 className="text-3xl font-black text-navy-950 mt-2.5 tracking-tight">
          Manage Student Profile
        </h1>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed">
          Verify and edit your verified graduation name, professions index, company metadata and authentication permissions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form section */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-xs text-left space-y-6">
          
          <div className="border-b border-gray-50 pb-4 flex justify-between items-center">
            <h3 className="text-sm font-black uppercase tracking-wider font-mono text-[#0F2044]">
              Personal Account Information
            </h3>
            
            {isSaved && (
              <span className="text-[10px] sm:text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl flex items-center gap-1 font-bold animate-fade-in">
                <Check className="w-3.5 h-3.5" /> Profiles Updated Live
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest leading-none">
                Graduation Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-lg border border-gray-200 text-xs sm:text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-gray-300"
                  placeholder="e.g. Abidemi Adeleke"
                />
              </div>
              <p className="text-[10px] text-gray-400">This exact name will be locked on your official certificate transcript.</p>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest leading-none">
                Business Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  disabled
                  value={currentUser.email}
                  className="w-full pl-9 pr-4 py-3 rounded-lg border border-gray-150 text-xs sm:text-sm bg-gray-50 text-gray-400 focus:outline-none transition-all"
                />
              </div>
              <p className="text-[10px] text-gray-400">Email addresses are unique and cannot be changed retrospectively.</p>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest leading-none">
                Profession Index
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-lg border border-gray-200 text-xs sm:text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-gray-300"
                  placeholder="e.g. Accountant, Product Designer"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest leading-none">
                Active Organization / Company
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-lg border border-gray-200 text-xs sm:text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-gray-300"
                  placeholder="e.g. Access Bank"
                />
              </div>
            </div>

            {/* DEMO SWITCH ROLE (Required for verifying auth redirects) */}
            <div className="space-y-2 text-left sm:col-span-2 p-5 bg-gradient-to-r from-amber-500/5 to-transparent border border-amber-100 rounded-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-black text-navy-950 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-500" />
                    Student Access Role Settings
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed max-w-md">
                    Switch your authentication permissions to verify Phase 2 routing restrictions. Only <strong>student</strong> or <strong>admin</strong> profiles gain access to the Student Portal.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex-1 py-2.5 rounded-xl text-center text-xs font-bold font-mono transition-all border shrink-0 cursor-pointer ${
                    role === 'student'
                      ? 'bg-navy-950 text-white border-navy-950 shadow-sm'
                      : 'bg-white text-gray-400 border-gray-150 hover:text-gray-600'
                  }`}
                >
                  Student (Default)
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`flex-1 py-2.5 rounded-xl text-center text-xs font-bold font-mono transition-all border shrink-0 cursor-pointer ${
                    role === 'admin'
                      ? 'bg-amber-500 text-[#0F2044] border-amber-500 shadow-sm font-black'
                      : 'bg-white text-gray-400 border-gray-150 hover:text-gray-600'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-gray-50 flex items-center justify-between gap-4 select-none">
            
            <button
              type="button"
              onClick={onLogout}
              className="px-5 py-3 border border-red-200 hover:border-red-300 hover:bg-red-50 text-red-700 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-[#0F2044] hover:bg-blue-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4 text-amber-500" /> Save Profile changes
            </button>

          </div>

        </form>

        {/* Diagnostic info block */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Practice assessments scores list */}
          <div className="bg-white border border-gray-150 rounded-2xl p-5 sm:p-6 text-left shadow-xs" id="profile-quiz-attempts-card">
            <h3 className="text-xs font-extrabold text-navy-950 tracking-wider font-mono border-b border-gray-50 pb-3 mb-4 flex items-center gap-1.5">
              <ListChecks className="w-4 h-4 text-amber-500" /> Quiz History Logs
            </h3>

            {attempts.length === 0 ? (
              <p className="text-xs text-gray-400 py-4 text-center leading-relaxed">
                Take lesson assessments inside the video course player to record diagnostic quiz logs.
              </p>
            ) : (
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {attempts.map((att, idx) => (
                  <div key={idx} className="flex gap-2.5 text-xs border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                    <div className={`mt-0.5 p-1 rounded-sm ${att.passed ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                      {att.passed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <h4 className="font-extrabold text-[#011627] line-clamp-1">{att.quizTitle}</h4>
                      <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono mt-1">
                        <span>Score: <b className={att.passed ? 'text-emerald-600' : 'text-red-500'}>{att.score}%</b></span>
                        <span>{new Date(att.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Diagnostics statistics */}
          <div className="bg-slate-50 border border-gray-150 rounded-2xl p-5 sm:p-6 text-left shadow-xs space-y-4" id="profile-statistics-box">
            <h3 className="text-xs font-black text-navy-950 tracking-wider font-mono uppercase">
              Operational Statistics
            </h3>
            
            <div className="space-y-3 font-mono text-[11px] leading-relaxed">
              <div className="flex justify-between text-gray-400 border-b border-gray-100 pb-2">
                <span>Unique Session ID</span>
                <span className="font-bold text-navy-950 uppercase shrink-0">SF-{(Math.floor(Math.random() * 900000) + 100000)}</span>
              </div>
              <div className="flex justify-between text-gray-400 border-b border-gray-100 pb-2">
                <span>Modules Interacted</span>
                <span className="font-bold text-navy-950 shrink-0">{activitiesCount} Lessons</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Assessment attempts</span>
                <span className="font-bold text-navy-950 shrink-0">{attempts.length} attempts</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
