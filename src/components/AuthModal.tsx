import React, { useState, useEffect } from 'react';
import { X, Mail, ShieldAlert, CircleCheck, Eye, EyeOff, KeyRound, User, Briefcase } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { name: string; email: string; company?: string; profession?: string }) => void;
  initialTab?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, onSuccess, initialTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [profession, setProfession] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Pre-fill user email from metadata context on load for exceptional user experience
  useEffect(() => {
    if (activeTab === 'login') {
      setEmail('a.abidemi0777@gmail.com');
      setPassword('password123'); // convenient mock password
    } else {
      setEmail('');
      setPassword('');
    }
    setErrorMsg('');
    setSuccessMsg('');
  }, [activeTab]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    setTimeout(() => {
      if (activeTab === 'signup') {
        if (!name.trim()) {
          setErrorMsg('Please enter your full name.');
          setLoading(false);
          return;
        }
        if (!email.includes('@')) {
          setErrorMsg('Please enter a valid business email.');
          setLoading(false);
          return;
        }
        if (password.length < 5) {
          setErrorMsg('Password should be at least 5 characters.');
          setLoading(false);
          return;
        }

        // Save in mock account persistence
        const users = JSON.parse(localStorage.getItem('sf_users') || '[]');
        const exists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
        if (exists) {
          setErrorMsg('Account with this email already exists.');
          setLoading(false);
          return;
        }

        const newUser = { name, email, company, profession, password };
        users.push(newUser);
        localStorage.setItem('sf_users', JSON.stringify(users));
        localStorage.setItem('sf_current_user', JSON.stringify({ name, email, company, profession }));
        
        setSuccessMsg('Account created successfully! Welcome to SkillForge.');
        setLoading(false);
        setTimeout(() => {
          onSuccess({ name, email, company, profession });
          onClose();
        }, 1200);

      } else {
        // Handle Login
        if (!email || !password) {
          setErrorMsg('Please fill in both email and password.');
          setLoading(false);
          return;
        }

        // Default developer login for testing
        if (email.toLowerCase() === 'a.abidemi0777@gmail.com' && password === 'password123') {
          const defaultUser = {
            name: 'Abidemi Adeleke',
            email: 'a.abidemi0777@gmail.com',
            company: 'Access Bank PLC',
            profession: 'Business Analyst'
          };
          localStorage.setItem('sf_current_user', JSON.stringify(defaultUser));
          setSuccessMsg('Signed in successfully! Redirecting...');
          setLoading(false);
          setTimeout(() => {
            onSuccess(defaultUser);
            onClose();
          }, 1000);
          return;
        }

        // Check local DB
        const users = JSON.parse(localStorage.getItem('sf_users') || '[]');
        const matched = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        
        if (matched) {
          const authenticatedUser = {
            name: matched.name,
            email: matched.email,
            company: matched.company,
            profession: matched.profession
          };
          localStorage.setItem('sf_current_user', JSON.stringify(authenticatedUser));
          setSuccessMsg('Welcome back! Logging in...');
          setLoading(false);
          setTimeout(() => {
            onSuccess(authenticatedUser);
            onClose();
          }, 1000);
        } else {
          setErrorMsg('Incorrect email or password. Feel free to use the default developer credentials or click Sign Up.');
          setLoading(false);
        }
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-xs" id="auth-modal-overlay">
      <div 
        className="relative w-full max-w-md overflow-hidden bg-white rounded-2xl shadow-2xl border border-gray-100"
        id="auth-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner header decoration */}
        <div className="h-2 bg-gradient-to-r from-amber-500 to-amber-600 w-full" />
        
        {/* Close Button */}
        <button 
          id="btn-close-auth"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-navy-950 hover:bg-gray-50 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold font-sans text-navy-950">
              {activeTab === 'login' ? 'Welcome back' : 'Start your journey'}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {activeTab === 'login' 
                ? 'Sign in to access your course syllabus and certificate codes.' 
                : 'Join ambitious Nigerian professionals upgrading their earning power.'}
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex border-b border-gray-100 mb-6">
            <button
              id="tab-select-login"
              className={`flex-1 pb-3 text-sm font-semibold border-b-2 text-center cursor-pointer transition-all ${
                activeTab === 'login'
                  ? 'border-amber-500 text-navy-950'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Sign In
            </button>
            <button
              id="tab-select-signup"
              className={`flex-1 pb-3 text-sm font-semibold border-b-2 text-center cursor-pointer transition-all ${
                activeTab === 'signup'
                  ? 'border-amber-500 text-navy-950'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
              onClick={() => setActiveTab('signup')}
            >
              create account
            </button>
          </div>

          {/* Notification feedback states */}
          {errorMsg && (
            <div className="flex items-start gap-2.5 p-3.5 mb-5 rounded-lg bg-red-50 border border-red-100 text-red-700 text-xs leading-relaxed" id="auth-error-banner">
              <ShieldAlert className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-start gap-2.5 p-3.5 mb-5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs leading-relaxed" id="auth-success-banner">
              <CircleCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" id="auth-credentials-form">
            {activeTab === 'signup' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      id="signup-name-input"
                      type="text"
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-amber-500 focus:outline-none transition-all placeholder:text-gray-300"
                      placeholder="e.g. Abidemi Adeleke"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Profession</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3.5 w-4.5 h-4.5 text-gray-400" />
                      <input
                        id="signup-profession-input"
                        type="text"
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 text-xs focus:border-amber-500 focus:outline-none transition-all placeholder:text-gray-300"
                        placeholder="e.g. Accountant"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Company</label>
                    <input
                      id="signup-company-input"
                      type="text"
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-xs focus:border-amber-500 focus:outline-none transition-all placeholder:text-gray-300"
                      placeholder="e.g. Access Bank"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Business Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  id="auth-email-input"
                  type="email"
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-amber-500 focus:outline-none transition-all placeholder:text-gray-300"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Password</label>
                {activeTab === 'login' && (
                  <button type="button" className="text-xs text-amber-600 hover:text-amber-700 font-medium cursor-pointer">
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  id="auth-password-input"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-amber-500 focus:outline-none transition-all placeholder:text-gray-300"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  id="btn-toggle-password-visibility"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="btn-auth-submit"
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-navy-950 font-bold transition-all text-sm cursor-pointer shadow-sm hover:shadow-md disabled:bg-gray-100 disabled:text-gray-400"
            >
              {loading ? 'Processing...' : activeTab === 'login' ? 'Sign In Securely' : 'Enrol in Academy'}
            </button>
          </form>

          {activeTab === 'login' && (
            <div className="mt-6 text-center text-xs text-gray-400 leading-relaxed border-t border-gray-50 pt-5">
              <span>Demo Developer Mode: Pre-filled with <strong>a.abidemi0777@gmail.com</strong> password <strong>password123</strong> to click and sign in instantly.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
