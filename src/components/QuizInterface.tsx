import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, CheckCircle2, XCircle, ChevronRight, 
  RotateCcw, ArrowRight, Award, Clock, ArrowLeft 
} from 'lucide-react';
import { Quiz, QuizQuestion } from '../quiz_data';

interface QuizInterfaceProps {
  quiz: Quiz;
  currentUser: { name: string; email: string };
  onBackToPlayer: () => void;
}

export default function QuizInterface({ quiz, currentUser, onBackToPlayer }: QuizInterfaceProps) {
  const email = currentUser.email.toLowerCase();

  // Quiz progression States
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showResultsScreen, setShowResultsScreen] = useState(false);

  // Score statistics
  const [attemptScore, setAttemptScore] = useState(0);
  const [attemptPassed, setAttemptPassed] = useState(false);

  // Questions of active quiz
  const questions = quiz.questions;
  const currentQuestion = questions[currentIdx];

  const handleOptionSelect = (optIdx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optIdx);
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQuestion.correctIndex;
    
    if (isCorrect) {
      setCorrectAnswersCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    // Reset individual option selector
    setSelectedOption(null);
    setIsAnswerSubmitted(false);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Calculate final ratios to present pass/fail details
      const score = Math.round(((correctAnswersCount) / questions.length) * 100);
      const passed = score >= quiz.passPercentage;
      
      setAttemptScore(score);
      setAttemptPassed(passed);
      setShowResultsScreen(true);

      // Save attempt logs inside sf_quiz_attempts_${email}
      saveQuizAttempt(score, passed);
    }
  };

  const saveQuizAttempt = (score: number, passed: boolean) => {
    const attempts: any[] = JSON.parse(localStorage.getItem(`sf_quiz_attempts_${email}`) || '[]');
    const newAttempt = {
      quizId: quiz.id,
      quizTitle: quiz.title,
      courseSlug: quiz.courseSlug,
      score,
      passed,
      date: new Date().toISOString()
    };
    attempts.push(newAttempt);
    localStorage.setItem(`sf_quiz_attempts_${email}`, JSON.stringify(attempts));
  };

  const handleRetryQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCorrectAnswersCount(0);
    setShowResultsScreen(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12" id="quiz-player-workspace">
      
      {/* Back to player link */}
      <div className="mb-8 text-left">
        <button 
          onClick={onBackToPlayer}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-navy-950 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel & Return to Lesson
        </button>
      </div>

      {showResultsScreen ? (
        /* QUIZ SCORE PAGE COMPONENT */
        <div className="bg-white border border-gray-150 rounded-2xl shadow-xl p-8 text-center space-y-6 animate-fade-in text-navy-950" id="quiz-pass-fail-screen">
          <div className="h-2 bg-gradient-to-r from-amber-500 to-amber-600 w-full rounded-t-2xl absolute top-0 inset-x-0" />
          
          <div className="pt-6">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto border-4 ${
              attemptPassed 
                ? 'bg-emerald-50 border-emerald-500 text-emerald-500' 
                : 'bg-red-50 border-red-500 text-red-500'
            }`}>
              {attemptPassed ? (
                <Award className="w-10 h-10 stroke-[2.2] animate-bounce" />
              ) : (
                <XCircle className="w-10 h-10 stroke-[2.2]" />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gray-400 block">
              PRACTICE ASSESSMENT COMPLETED
            </span>
            <h2 className="text-2xl font-black mt-1 leading-tight tracking-tight">
              {attemptPassed ? 'Congratulations! You Passed.' : 'Assessment Unsuccessful'}
            </h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
              {attemptPassed 
                ? `You reached standard professional baseline parameters by scoring over ${quiz.passPercentage}% on this class module.`
                : 'Do not despair. Review the concept descriptions or replay the lesson video tutorials as needed and retry.'}
            </p>
          </div>

          {/* Core Score Ratios */}
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto p-4 bg-slate-50 border border-gray-100 rounded-2xl text-left font-mono text-xs leading-none">
            <div className="space-y-1.5 p-1">
              <span className="text-gray-400 text-[10px] block uppercase font-bold">YOUR SCORE</span>
              <span className={`text-xl font-black ${attemptPassed ? 'text-emerald-600' : 'text-red-500'}`}>{attemptScore}%</span>
            </div>
            <div className="space-y-1.5 p-1 border-l border-gray-100 pl-4">
              <span className="text-gray-400 text-[10px] block uppercase font-bold">REQUIRED</span>
              <span className="text-xl font-black text-navy-950">{quiz.passPercentage}%</span>
            </div>
          </div>

          {/* Call-to-actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto pt-4">
            {!attemptPassed && (
              <button
                onClick={handleRetryQuiz}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-navy-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 shrink-0" />
                Retry Quiz
              </button>
            )}

            <button
              onClick={onBackToPlayer}
              className={`flex-grow py-3 px-6 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer ${
                attemptPassed 
                  ? 'bg-amber-500 hover:bg-amber-600 text-navy-950'
                  : 'bg-navy-950 hover:bg-navy-900 border border-navy-950 text-white'
              }`}
            >
              Back to Lesson player
            </button>
          </div>
        </div>
      ) : (
        /* ACTIVE QUESTION WORKSPACE */
        <div className="bg-white border border-gray-100 rounded-2xl shadow-lg sm:p-8 p-6 space-y-6 text-left text-navy-950 animate-fade-in" id="quiz-question-card">
          
          {/* Progress Indication Banner */}
          <div className="flex justify-between items-center border-b border-gray-50 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-400 font-extrabold tracking-widest font-mono uppercase block">ACTIVE PRACTICE LEVEL</span>
              <h1 className="text-sm font-black text-navy-950 truncate max-w-xs sm:max-w-md">{quiz.title}</h1>
            </div>
            <span className="text-xs font-mono font-bold bg-[#F59E0B]/10 text-amber-600 px-3 py-1 rounded-full shrink-0">
              Question {currentIdx + 1} of {questions.length}
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-4 pt-2">
            <h2 className="text-base sm:text-lg font-extrabold text-navy-950 leading-snug">
              {currentQuestion.text}
            </h2>

            {/* Answer Options list */}
            <div className="space-y-3 pt-3" id="quiz-options-list">
              {currentQuestion.options.map((opt, optIdx) => {
                const isSelected = selectedOption === optIdx;
                
                // Styling based on submission status
                let btnStyle = "border-gray-200 hover:border-amber-500 hover:bg-amber-50/5 text-gray-700 bg-white";
                if (isSelected) {
                  btnStyle = "border-amber-500 bg-amber-500/5 text-navy-950 font-bold";
                }

                if (isAnswerSubmitted) {
                  const isCorrectAnswer = optIdx === currentQuestion.correctIndex;
                  const isSelectedIncorrect = isSelected && !isCorrectAnswer;

                  if (isCorrectAnswer) {
                    btnStyle = "border-emerald-500 bg-emerald-500/5 text-emerald-800 font-bold";
                  } else if (isSelectedIncorrect) {
                    btnStyle = "border-red-400 bg-red-400/5 text-red-700";
                  } else {
                    btnStyle = "border-gray-100 bg-gray-50 text-gray-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleOptionSelect(optIdx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full p-4 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between gap-4 cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    <div className="shrink-0">
                      {isAnswerSubmitted && optIdx === currentQuestion.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      )}
                      {isAnswerSubmitted && isSelected && optIdx !== currentQuestion.correctIndex && (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Answer explanations */}
          {isAnswerSubmitted && (
            <div className="p-4 bg-slate-50 border border-gray-100 rounded-xl space-y-1.5 animate-fade-in" id="quiz-explanation-block">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-mono">Explanatory feedback</span>
              <p className="text-xs text-gray-500 leading-relaxed text-left">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Dynamic action bars */}
          <div className="pt-6 border-t border-gray-50 flex items-center justify-end select-none">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleAnswerSubmit}
                disabled={selectedOption === null}
                className="px-6 py-3 bg-[#0F2044] hover:bg-blue-900 disabled:bg-gray-100 disabled:text-gray-450 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1"
              >
                <span>Submit Answer</span>
                <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-500" />
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-[#F59E0B] hover:bg-amber-600 text-navy-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'Complete Assessment'}</span>
                <ChevronRight className="w-4.5 h-4.5 shrink-0 stroke-[2.5]" />
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
