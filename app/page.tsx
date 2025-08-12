"use client";
import React, { useState, useEffect } from 'react';

// Types
interface Question {
  id: string;
  type: 'rating' | 'comment';
  text: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
  maxLength?: number;
}

interface Section {
  id: string;
  title: string;
  icon: string;
  color: 'primary' | 'secondary' | 'accent' | 'quaternary';
  questions: Question[];
}

interface FormData {
  formType: string;
  title: string;
  subtitle: string;
  patientInfo: {
    name: string;
    entryType: string;
    unit: string;
    doctor: string;
    location: string;
  };
  sections: Section[];
}

// Data
const getStarRatingForOption = (option: string): number => {
  const ratingMap: Record<string, number> = {
    'Poor': 1, 'Fair': 2, 'Good': 3, 'Very Good': 4, 'Excellent': 5,
    'Never': 1, 'Rarely': 2, 'Sometimes': 3, 'Always': 5,
    'Very Unclean': 1, 'Unclean': 2, 'Clean': 3, 'Very Clean': 4, 'Spotless': 5,
    'Very Bad': 1, 'Bad': 2, 'Average': 3,
    'Not at all': 1, 'Somewhat': 2, 'Mostly': 4, 'Completely': 5,
    'Moderately': 3, 'Very attentive': 5,
    'Very Unreasonable': 1, 'Unreasonable': 2, 'Reasonable': 4, 'Very Reasonable': 5,
    'No': 1, 'Partially': 3, 'Yes': 5, 'Some delay': 2
  };
  return ratingMap[option] || 3;
};

const getOptionForStarRating = (rating: number, options: string[]): string => {
  for (const option of options) {
    if (getStarRatingForOption(option) === rating) {
      return option;
    }
  }
  return options[rating - 1] || options[0];
};

const colorThemes = {
  primary: { gradient: 'from-violet-500 to-purple-600' },
  secondary: { gradient: 'from-purple-500 to-indigo-600' },
  accent: { gradient: 'from-indigo-500 to-violet-600' },
  quaternary: { gradient: 'from-blue-500 to-indigo-600' }
};

const realQuestionsData: FormData = {
  formType: 'picu',
  title: 'PICU Patient Experience Survey',
  subtitle: "Rainbow Children's Hospital - PICU Banjara Hills",
  patientInfo: {
    name: "BANDELA SIREESHA",
    entryType: "PICU",
    unit: "Rainbow Children's Hospital - PICU Banjara Hills",
    doctor: "DR.BHARGAVI REDDY K",
    location: "Banjara Hills"
  },
  sections: [
    {
      id: 'billing',
      title: 'Billing',
      icon: '💳',
      color: 'primary',
      questions: [
        {
          id: 'q1',
          type: 'rating',
          text: 'How would you rate the helpfulness and efficiency of the admission desk staff?',
          required: true,
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
        }
      ]
    },
    {
      id: 'discharge',
      title: 'Discharge',
      icon: '🚪',
      color: 'secondary',
      questions: [
        {
          id: 'q2',
          type: 'rating',
          text: 'How clear and informative was the financial counselling you received?',
          required: true,
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
        },
        {
          id: 'q3',
          type: 'rating',
          text: 'Did the doctor or nurse explain your discharge summary clearly?',
          required: true,
          options: ['Not at all', 'Somewhat', 'Mostly', 'Completely']
        }
      ]
    },
    {
      id: 'doctor',
      title: 'Doctor',
      icon: '👨‍⚕️',
      color: 'accent',
      questions: [
        {
          id: 'q4',
          type: 'rating',
          text: 'Was the discharge process completed in a timely manner?',
          required: true,
          options: ['Yes', 'No', 'Some delay']
        },
        {
          id: 'q5',
          type: 'rating',
          text: 'How attentive and caring was the doctor towards you?',
          required: true,
          options: ['Not at all', 'Somewhat', 'Moderately', 'Very attentive']
        },
        {
          id: 'q6',
          type: 'rating',
          text: 'Did the doctor clearly explain the reason for your admission?',
          required: true,
          options: ['Yes', 'No', 'Partially']
        },
        {
          id: 'q7',
          type: 'rating',
          text: 'Did the doctor provide timely updates about your treatment progress?',
          required: true,
          options: ['Yes', 'No', 'Sometimes']
        }
      ]
    },
    {
      id: 'floor_coordinator',
      title: 'Floor Co-Ordinator',
      icon: '👥',
      color: 'quaternary',
      questions: [
        {
          id: 'q8',
          type: 'rating',
          text: 'Did the doctor manage your pain in a timely manner?',
          required: true,
          options: ['Yes', 'No', 'Partially']
        }
      ]
    },
    {
      id: 'food_beverages',
      title: 'Food & Beverages',
      icon: '🍽️',
      color: 'primary',
      questions: [
        {
          id: 'q9',
          type: 'rating',
          text: 'How attentive, helpful, and informative was the floor coordinator?',
          required: true,
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
        },
        {
          id: 'q10',
          type: 'rating',
          text: 'How was the quality of the food served to you?',
          required: true,
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
        },
        {
          id: 'q11',
          type: 'rating',
          text: 'Was your food served on time?',
          required: true,
          options: ['Always', 'Sometimes', 'Rarely', 'Never']
        }
      ]
    },
    {
      id: 'nursing',
      title: 'Nursing',
      icon: '👩‍⚕️',
      color: 'quaternary',
      questions: [
        {
          id: 'q14',
          type: 'rating',
          text: 'How attentive, prompt, and caring was the nursing staff?',
          required: true,
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
        },
        {
          id: 'q15',
          type: 'rating',
          text: 'Did you receive your medication on time?',
          required: true,
          options: ['Always', 'Sometimes', 'Rarely', 'Never']
        },
        {
          id: 'q16',
          type: 'rating',
          text: 'Was your privacy and confidentiality respected during your stay?',
          required: true,
          options: ['Yes', 'No', 'Somewhat']
        }
      ]
    },
    {
      id: 'overall_hospital_experience',
      title: 'Overall Hospital Experience',
      icon: '⭐',
      color: 'accent',
      questions: [
        {
          id: 'q22',
          type: 'rating',
          text: 'How would you rate your overall hospital experience?',
          required: true,
          options: ['Very Bad', 'Bad', 'Average', 'Good', 'Excellent']
        }
      ]
    }
  ]
};

// Star Rating Component
const StarRating = ({ rating, onRatingChange, options, size = 'md' }: {
  rating: number;
  onRatingChange: (rating: number, option: string) => void;
  options: string[];
  size?: 'sm' | 'md' | 'lg';
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-12 h-12' };

  const handleStarClick = (starRating: number) => {
    const selectedOption = getOptionForStarRating(starRating, options);
    onRatingChange(starRating, selectedOption);
  };

  return (
    <div className="flex space-x-2 justify-center items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${sizeClasses[size]} transition-all duration-300 transform active:scale-90 focus:outline-none touch-manipulation`}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => handleStarClick(star)}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <svg
            className={`w-full h-full transition-all duration-300 ${
              star <= (hoverRating || rating)
                ? 'text-yellow-400 drop-shadow-lg scale-110'
                : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

// Welcome Screen (from Approach 1)
const WelcomeScreen = ({ formData, onStart }: {
  formData: FormData;
  onStart: () => void;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 text-center">
        
        {/* Hospital Icon with enhanced glow effect */}
          <div className="relative pt-12 pb-8 text-center">
            <div className="relative inline-block group">
              <img src="Rainbow-logo.png" alt="Hospital Icon" className="w-27 h-17 object-contain" />
            </div>
          </div>
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome,</h1>
          <h2 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            {formData.patientInfo.name}!
          </h2>
        </div>

        <div className="mb-8 space-y-2">
          <p className="text-base font-semibold text-violet-700">{formData.patientInfo.unit}</p>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-gray-500">📍</span>
            <p className="text-sm text-gray-600">{formData.patientInfo.location}</p>
          </div>
        </div>
        
        <div className="mb-8">
          <p className="text-gray-600 text-sm leading-relaxed">
            Your feedback helps us provide exceptional care and improve our services
          </p>
        </div>
        
        <button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 text-lg shadow-lg hover:shadow-xl active:scale-95 touch-manipulation"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <div className="flex items-center justify-center space-x-2">
            <span>Start Survey</span>
            <span>✨</span>
          </div>
        </button>
      </div>
    </div>
  </div>
);

// Progress Bar Component
const ProgressBar = ({ progress, theme }: { progress: number; theme: string }) => (
  <div className="w-full bg-gray-200 rounded-full h-3">
    <div 
      className={`h-3 rounded-full transition-all duration-1000 bg-gradient-to-r ${theme}`}
      style={{ width: `${progress}%` }}
    />
  </div>
);

// Accordion Section Component
const AccordionSection = ({ 
  section, 
  isExpanded, 
  isComplete, 
  onToggle, 
  answers, 
  onAnswerChange
}: {
  section: Section;
  isExpanded: boolean;
  isComplete: boolean;
  onToggle: () => void;
  answers: Record<string, any>;
  onAnswerChange: (questionId: string, field: string, value: string) => void;
}) => {
  const theme = colorThemes[section.color] || colorThemes.primary;

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden">
      
      {/* Section Header */}
      <button
        onClick={onToggle}
        className="w-full p-4 text-left hover:bg-gray-50/50 transition-all duration-200 flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isComplete 
              ? 'bg-green-100' 
              : `bg-gradient-to-r ${theme.gradient}`
          }`}>
            <span className="text-xl text-white">
              {isComplete ? '✓' : section.icon}
            </span>
          </div>
          <div>
            <h3 className={`font-semibold text-lg ${isComplete ? 'text-green-800' : 'text-gray-900'}`}>
              {section.title}
            </h3>
            <p className={`text-sm ${isComplete ? 'text-green-600' : 'text-gray-500'}`}>
              {section.questions.length} questions • {isComplete ? 'Completed' : 'Pending'}
            </p>
          </div>
        </div>
        
        <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="border-t border-gray-100 p-4 space-y-6 animate-slideDown">
          {section.questions.map((question, index) => {
            const currentAnswers = answers[question.id] || {};
            const selectedOption = currentAnswers.option;
            const currentRating = selectedOption ? getStarRatingForOption(selectedOption) : 0;

            return (
              <div key={question.id} className="bg-gray-50/50 rounded-xl p-4">
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    {index + 1}. {question.text}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </h4>
                </div>

                {question.type === 'rating' ? (
                  <div className="space-y-4">
                    <StarRating
                      rating={currentRating}
                      options={question.options || []}
                      onRatingChange={(rating, option) => onAnswerChange(question.id, 'option', option)}
                      size="md"
                    />
                    
                    {selectedOption && (
                      <div className="text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          currentRating <= 2 
                            ? 'bg-red-100 text-red-700'
                            : currentRating === 3
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {selectedOption}
                        </span>
                      </div>
                    )}
                    
                    {currentRating > 0 && currentRating < 3 && (
                      <div className="animate-fadeIn">
                        <textarea
                          value={currentAnswers.comment || ''}
                          onChange={(e) => onAnswerChange(question.id, 'comment', e.target.value)}
                          placeholder="Please tell us how we can improve..."
                          className="w-full h-20 p-3 border-2 border-red-200 rounded-xl resize-none focus:ring-2 focus:ring-red-400 bg-red-50 text-sm"
                          maxLength={300}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <textarea
                    value={currentAnswers.comment || ''}
                    onChange={(e) => onAnswerChange(question.id, 'comment', e.target.value)}
                    placeholder={question.placeholder || 'Share your thoughts...'}
                    className="w-full h-20 p-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-emerald-400 text-sm"
                    maxLength={question.maxLength || 500}
                  />
                )}
              </div>
            );
          })}
          
          {/* Show completion status only */}
          {isComplete && (
            <div className="text-center py-2">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Section Complete
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Thank You Screen
const ThankYouScreen = ({ formData, onRestart }: {
  formData: FormData;
  onRestart: () => void;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 text-center">
        
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
            <span className="text-3xl">✓</span>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Thank You, {formData.patientInfo.name}!
        </h1>
        
        <div className="bg-green-50/80 rounded-2xl p-4 mb-6 text-left">
          <h3 className="font-semibold text-green-800 mb-3 flex items-center text-sm">
            <span className="mr-2">📋</span>
            Survey Completed
          </h3>
          <div className="space-y-2 text-xs text-green-700">
            <div className="flex justify-between">
              <span className="font-medium">Patient:</span> 
              <span className="text-right">{formData.patientInfo.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Type:</span> 
              <span>{formData.patientInfo.entryType}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Unit:</span> 
              <span className="text-right">{formData.patientInfo.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Doctor:</span> 
              <span className="text-right">{formData.patientInfo.doctor}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-8 text-sm leading-relaxed">
          Your feedback has been submitted successfully and will help us improve our services.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 active:scale-95 touch-manipulation"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            Start New Survey
          </button>
          
          <div className="text-xs text-gray-400">
            Survey ID: {Date.now().toString(36).toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main App
const App = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'survey' | 'thankyou'>('welcome');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const handleStart = () => {
    setCurrentScreen('survey');
  };

  const handleAnswerChange = (questionId: string, field: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], [field]: value }
    }));
  };

  const isSectionComplete = (section: Section) => {
    return section.questions.every(question => {
      const currentAnswers = answers[question.id] || {};
      if (question.type === 'rating') {
        const selectedOption = currentAnswers.option;
        if (!selectedOption) return false;
        
        const rating = getStarRatingForOption(selectedOption);
        if (rating > 0 && rating < 3) {
          return !!(currentAnswers.comment || '').trim();
        }
        return true;
      }
      return question.required ? !!(currentAnswers.comment || '').trim() : true;
    });
  };

  // Auto-expand next section and mark current as complete
  useEffect(() => {
    if (currentScreen !== 'survey') return;

    const newlyCompletedSections: string[] = [];
    realQuestionsData.sections.forEach(section => {
      if (isSectionComplete(section) && !completedSections.includes(section.id)) {
        newlyCompletedSections.push(section.id);
      }
    });

    if (newlyCompletedSections.length > 0) {
      setCompletedSections(prev => [...prev, ...newlyCompletedSections]);

      const allCompleted = [...completedSections, ...newlyCompletedSections];
      const nextIncomplete = realQuestionsData.sections.find(s => !allCompleted.includes(s.id));
      
      if (nextIncomplete && !expandedSections.includes(nextIncomplete.id)) {
        setExpandedSections([nextIncomplete.id]);
      }
    }
  }, [answers, completedSections, expandedSections, currentScreen]);

  // Initial auto-expand first section
  useEffect(() => {
    if (currentScreen === 'survey' && expandedSections.length === 0) {
      setExpandedSections([realQuestionsData.sections[0].id]);
    }
  }, [currentScreen, expandedSections.length]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleRestart = () => {
    setCurrentScreen('welcome');
    setExpandedSections([]);
    setAnswers({});
    setCompletedSections([]);
  };

  const totalProgress = (completedSections.length / realQuestionsData.sections.length) * 100;

  if (currentScreen === 'welcome') {
    return <WelcomeScreen formData={realQuestionsData} onStart={handleStart} />;
  }

  if (currentScreen === 'thankyou') {
    return <ThankYouScreen formData={realQuestionsData} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Patient Experience Survey</h1>
            <p className="text-gray-600 mb-4">{realQuestionsData.patientInfo.name} - {realQuestionsData.patientInfo.entryType}</p>
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-2xl font-bold text-emerald-600">{Math.round(totalProgress)}%</span>
              <span className="text-sm text-gray-500">Complete</span>
            </div>
            
            <ProgressBar 
              progress={totalProgress} 
              theme="from-emerald-500 to-teal-600"
            />
            
            <p className="text-sm text-gray-600 mt-3">
              {completedSections.length} of {realQuestionsData.sections.length} sections completed
            </p>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-4">
            {realQuestionsData.sections.map((section) => (
              <AccordionSection
                key={section.id}
                section={section}
                isExpanded={expandedSections.includes(section.id)}
                isComplete={completedSections.includes(section.id)}
                onToggle={() => toggleSection(section.id)}
                answers={answers}
                onAnswerChange={handleAnswerChange}
              />
            ))}
          </div>

          {/* Final Submit */}
          {totalProgress === 100 && (
            <div className="mt-8 bg-green-50/90 backdrop-blur-xl rounded-2xl border border-green-200 p-6 text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-green-800 mb-4">Survey Completed!</h3>
              <p className="text-green-600 mb-6">Thank you for your valuable feedback.</p>
              <button
                onClick={() => {
                  console.log('Survey submitted:', { 
                    patient: realQuestionsData.patientInfo, 
                    answers 
                  });
                  setCurrentScreen('thankyou');
                }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-200"
              >
                Submit Survey
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Global Styles
const GlobalStyles = () => {
  useEffect(() => {
    const styles = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-20px); max-height: 0; }
        to { opacity: 1; transform: translateY(0); max-height: 200px; }
      }

      .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      .animate-slideDown { animation: slideDown 0.4s ease-out; }

      * {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
      }

      input, textarea, button {
        -webkit-user-select: text;
        user-select: text;
      }

      .touch-manipulation { touch-action: manipulation; }
      html { scroll-behavior: smooth; }

      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 2px; }
      ::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    return () => {
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet);
      }
    };
  }, []);

  return null;
};

// Main App Component with Styles
const AppWithStyles = () => {
  return (
    <>
      <GlobalStyles />
      <App />
    </>
  );
};

export default AppWithStyles;