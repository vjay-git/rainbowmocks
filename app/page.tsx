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
  // Map different text options to star ratings (1-5)
  const ratingMap: Record<string, number> = {
    // Standard quality ratings
    'Poor': 1,
    'Fair': 2,
    'Good': 3,
    'Very Good': 4,
    'Excellent': 5,

    // Frequency ratings
    'Never': 1,
    'Rarely': 2,
    'Sometimes': 3,
    'Always': 5,

    // Cleanliness ratings
    'Very Unclean': 1,
    'Unclean': 2,
    'Clean': 3,
    'Very Clean': 4,
    'Spotless': 5,

    // Experience ratings
    'Very Bad': 1,
    'Bad': 2,
    'Average': 3,
    // 'Excellent': 5, // Duplicate, already defined above

    // Explanation ratings
    'Not at all': 1,
    'Somewhat': 2,
    'Mostly': 4,
    'Completely': 5,

    // Attentiveness ratings
    'Moderately': 3,
    'Very attentive': 5,

    // Waiting time ratings
    'Very Unreasonable': 1,
    'Unreasonable': 2,
    'Reasonable': 4,
    'Very Reasonable': 5,

    // Yes/No/Partial ratings
    'No': 1,
    'Partially': 3,
    'Yes': 5,
    'Some delay': 2
  };
  
  return ratingMap[option] || 3; // Default to 3 if not found
};

const getOptionForStarRating = (rating: number, options: string[]): string => {
  // Find the option that maps to this star rating
  for (const option of options) {
    if (getStarRatingForOption(option) === rating) {
      return option;
    }
  }
  return options[rating - 1] || options[0]; // Fallback
};

const ratingLabels = {
  1: 'Poor',
  2: 'Fair', 
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent'
};

const colorThemes = {
  primary: {
    gradient: 'from-violet-500 to-purple-600',
    light: 'from-violet-50 to-purple-50',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    text: 'text-violet-700'
  },
  secondary: {
    gradient: 'from-purple-500 to-indigo-600',
    light: 'from-purple-50 to-indigo-50',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700'
  },
  accent: {
    gradient: 'from-indigo-500 to-violet-600',
    light: 'from-indigo-50 to-violet-50',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-700'
  },
  quaternary: {
    gradient: 'from-blue-500 to-indigo-600',
    light: 'from-blue-50 to-indigo-50',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700'
  }
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
      id: 'dietician_counselling',
      title: 'Dietician Counselling',
      icon: '📋',
      color: 'secondary',
      questions: [
        {
          id: 'q12',
          type: 'rating',
          text: 'Did you receive dietician counselling during your stay?',
          required: true,
          options: ['Yes', 'No']
        }
      ]
    },
    {
      id: 'housekeeping',
      title: 'Housekeeping',
      icon: '🧹',
      color: 'accent',
      questions: [
        {
          id: 'q13',
          type: 'rating',
          text: 'How clean were your room and washroom during your stay?',
          required: true,
          options: ['Very Unclean', 'Unclean', 'Clean', 'Very Clean', 'Spotless']
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
      id: 'opd',
      title: 'OPD',
      icon: '🏥',
      color: 'primary',
      questions: [
        {
          id: 'q17',
          type: 'rating',
          text: 'How reasonable was your waiting time to see the doctor in the OPD?',
          required: true,
          options: ['Very Unreasonable', 'Unreasonable', 'Reasonable', 'Very Reasonable']
        }
      ]
    },
    {
      id: 'other_services',
      title: 'Other Services',
      icon: '🔬',
      color: 'secondary',
      questions: [
        {
          id: 'q18',
          type: 'rating',
          text: 'How would you rate the radiology services you received?',
          required: true,
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
        },
        {
          id: 'q19',
          type: 'rating',
          text: 'How would you rate the laboratory services you used?',
          required: true,
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
        },
        {
          id: 'q20',
          type: 'rating',
          text: 'How would you rate the physiotherapy services?',
          required: true,
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
        },
        {
          id: 'q21',
          type: 'rating',
          text: 'Was the prescribed medicine available at the pharmacy?',
          required: true,
          options: ['Yes', 'No', 'Partially']
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
    },
    {
      id: 'security',
      title: 'Security',
      icon: '🛡️',
      color: 'quaternary',
      questions: [
        {
          id: 'q23',
          type: 'rating',
          text: 'How efficient and helpful was the security staff?',
          required: true,
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
        }
      ]
    }
  ]
};

// Star Rating Component
const StarRating = ({ rating, onRatingChange, options, size = 'lg' }: {
  rating: number;
  onRatingChange: (rating: number, option: string) => void;
  options: string[];
  size?: 'sm' | 'md' | 'lg';
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

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

// Comment Question Component
const CommentQuestion = ({ question, value, onChange }: {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="space-y-3">
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={question.placeholder || 'Share your thoughts...'}
      className="w-full h-28 p-4 border-2 border-gray-200 rounded-2xl resize-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all duration-200 text-base"
      maxLength={question.maxLength || 500}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    />
    <div className="flex justify-between items-center text-sm">
      <span className={`${question.required ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>
        {question.required ? 'Required' : 'Optional'}
      </span>
      <span className="text-gray-400">
        {(value || '').length}/{question.maxLength || 500}
      </span>
    </div>
  </div>
);

// Welcome Screen
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome,
          </h1>
          <h2 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            {formData.patientInfo.name}!
          </h2>
        </div>

        <div className="mb-8 space-y-2">
          <p className="text-base font-semibold text-violet-700">
            {formData.patientInfo.unit}
          </p>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-gray-500">📍</span>
            <p className="text-sm text-gray-600">
              {formData.patientInfo.location}
            </p>
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

// Dashboard
const Dashboard = ({ formData, completedSections, onSectionSelect, totalProgress }: {
  formData: FormData;
  completedSections: string[];
  onSectionSelect: (sectionId: string) => void;
  totalProgress: number;
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-md mx-auto space-y-4">
        
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold text-gray-900">Survey Progress</h1>
            <p className="text-violet-600 text-sm font-medium">{formData.patientInfo.name}</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-violet-600">{Math.round(totalProgress)}%</span>
              <span className="text-sm text-gray-500">Complete</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-violet-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
            
            <p className="text-center text-sm text-gray-600">
              {completedSections.length} of {formData.sections.length} sections completed
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {formData.sections.map((section) => {
            const isCompleted = completedSections.includes(section.id);
            const theme = colorThemes[section.color] || colorThemes.primary;
            
            return (
              <button
                key={section.id}
                onClick={() => onSectionSelect(section.id)}
                className={`w-full p-4 rounded-2xl transition-all duration-200 shadow-sm border touch-manipulation active:scale-95 ${
                  isCompleted 
                    ? 'bg-green-50/90 backdrop-blur-xl border-green-200' 
                    : 'bg-white/90 backdrop-blur-xl border-white/50 hover:shadow-md'
                }`}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-green-100' 
                      : `bg-gradient-to-r ${theme.gradient}`
                  }`}>
                    <span className="text-xl">
                      {isCompleted ? '✓' : section.icon}
                    </span>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-semibold ${isCompleted ? 'text-green-800' : 'text-gray-900'}`}>
                      {section.title}
                    </h3>
                    <p className={`text-sm ${isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                      {section.questions.length} questions • {isCompleted ? 'Completed' : 'Pending'}
                    </p>
                  </div>
                  <div className="text-gray-400 text-lg">→</div>
                </div>
              </button>
            );
          })}
        </div>

        {totalProgress === 100 && (
          <div className="bg-green-50/90 backdrop-blur-xl rounded-2xl border border-green-200 p-6 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-lg font-bold text-green-800 mb-2">Survey Completed!</h3>
            <p className="text-green-600 text-sm">Thank you for your valuable feedback.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Section Interface
const SectionInterface = ({ 
  formData, 
  section, 
  answers, 
  onAnswerChange, 
  onComplete, 
  onDashboard
}: {
  formData: FormData;
  section: Section;
  answers: Record<string, any>;
  onAnswerChange: (questionId: string, field: string, value: string) => void;
  onComplete: () => void;
  onDashboard: () => void;
}) => {
  const theme = colorThemes[section.color] || colorThemes.primary;
  
  const handleAnswerChange = (questionId: string, field: string, value: string) => {
    onAnswerChange(questionId, field, value);
  };

  const getAnsweredCount = () => {
    return section.questions.filter(question => {
      const currentAnswers = answers[question.id] || {};
      if (question.type === 'rating') {
        const selectedOption = currentAnswers.option;
        if (!selectedOption) return false;
        
        const rating = getStarRatingForOption(selectedOption);
        // If rating is below 3, comment is required
        if (rating > 0 && rating < 3) {
          return !!(currentAnswers.comment || '').trim();
        }
        return true;
      }
      return question.required ? !!(currentAnswers.comment || '').trim() : true;
    }).length;
  };

  const isComplete = () => {
    return section.questions.every(question => {
      const currentAnswers = answers[question.id] || {};
      if (question.type === 'rating') {
        const selectedOption = currentAnswers.option;
        if (!selectedOption) return false;
        
        const rating = getStarRatingForOption(selectedOption);
        // If rating is below 3, comment is required
        if (rating > 0 && rating < 3) {
          return !!(currentAnswers.comment || '').trim();
        }
        return true;
      }
      return question.required ? !!(currentAnswers.comment || '').trim() : true;
    });
  };

  const progress = (getAnsweredCount() / section.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-md mx-auto">
        
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl border-b border-white/50 p-4">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={onDashboard}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors bg-white/80 border border-gray-200 px-3 py-2 rounded-xl active:scale-95 touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <span>←</span>
              <span className="text-sm">Back</span>
            </button>
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${theme.gradient}`}>
              <span className="text-white text-xl">{section.icon}</span>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
              <div className="text-sm text-gray-600">{getAnsweredCount()}/{section.questions.length} answered</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 bg-gradient-to-r ${theme.gradient}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="p-4 space-y-6 pb-32">
          {section.questions.map((question, index) => {
            const currentAnswers = answers[question.id] || {};
            const selectedOption = currentAnswers.option;
            const currentRating = selectedOption ? getStarRatingForOption(selectedOption) : 0;
            
            return (
              <div key={question.id} className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-base font-semibold text-gray-900 leading-relaxed flex-1 pr-2">
                      {index + 1}. {question.text}
                    </h3>
                    {question.required && (
                      <span className="text-red-500 text-sm">*</span>
                    )}
                  </div>
                </div>

                {question.type === 'rating' ? (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <StarRating
                        rating={currentRating}
                        options={question.options || []}
                        onRatingChange={(rating, option) => handleAnswerChange(question.id, 'option', option)}
                        size="lg"
                      />
                      
                      {selectedOption && (
                        <div className="animate-fadeIn">
                          <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
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
                    </div>
                    
                    {currentRating > 0 && currentRating < 3 && (
                      <div className="animate-slideDown">
                        <label className="block text-sm font-medium text-orange-700 mb-3">
                          Please tell us how we can improve
                        </label>
                        <CommentQuestion
                          question={{ 
                            ...question, 
                            required: true, 
                            placeholder: 'Please share specific details about what went wrong and how we can improve...' 
                          }}
                          value={currentAnswers.comment}
                          onChange={(value) => handleAnswerChange(question.id, 'comment', value)}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <CommentQuestion
                    question={question}
                    value={currentAnswers.comment}
                    onChange={(value) => handleAnswerChange(question.id, 'comment', value)}
                  />
                )}
              </div>
            );
          })}
        </div>

        {isComplete() && (
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-white/50 p-4">
            <div className="max-w-md mx-auto">
              <button
                onClick={onComplete}
                className={`w-full font-bold py-4 px-6 rounded-2xl transition-all duration-200 bg-gradient-to-r ${theme.gradient} text-white shadow-lg hover:shadow-xl active:scale-95 touch-manipulation`}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>Complete {section.title}</span>
                  <span>✓</span>
                </div>
              </button>
            </div>
          </div>
        )}

      </div>
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
            <div className="border-t border-green-200 pt-2 mt-3">
              <div className="flex justify-between font-medium">
                <span>Sections:</span> 
                <span>{formData.sections.length}/{formData.sections.length}</span>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-8 text-sm leading-relaxed">
          Your feedback has been submitted successfully and will help us improve our services. Thank you for taking the time to share your experience.
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

// API Service
const apiService = {
  async submitSurveyResponses(data: {
    patient: any;
    formType: string;
    answers: Record<string, any>;
  }): Promise<{ success: boolean; message: string; surveyId?: string }> {
    console.log('Survey submitted:', data);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          message: 'Survey submitted successfully',
          surveyId: Date.now().toString(36).toUpperCase()
        });
      }, 1000);
    });
  }
};

// Global Styles Component
const GlobalStyles = () => {
  useEffect(() => {
    const styles = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
          max-height: 0;
        }
        to {
          opacity: 1;
          transform: translateY(0);
          max-height: 200px;
        }
      }

      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out;
      }

      .animate-slideDown {
        animation: slideDown 0.4s ease-out;
      }

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

      .touch-manipulation {
        touch-action: manipulation;
      }

      html {
        scroll-behavior: smooth;
      }

      ::-webkit-scrollbar {
        width: 4px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background: #d1d5db;
        border-radius: 2px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #9ca3af;
      }
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

// Main App
const App = () => {
  const [formData] = useState<FormData>(realQuestionsData);
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'dashboard' | 'section' | 'thankyou'>('welcome');
  const [currentSectionId, setCurrentSectionId] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentSection = formData.sections.find(s => s.id === currentSectionId);
  const totalProgress = (completedSections.length / formData.sections.length) * 100;

  const handleStart = () => {
    setCurrentScreen('dashboard');
  };

  const handleSectionSelect = (sectionId: string) => {
    setCurrentSectionId(sectionId);
    setCurrentScreen('section');
  };

  const handleDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const handleAnswerChange = (questionId: string, field: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value
      }
    }));
  };

  const handleSectionComplete = async () => {
    if (!currentSection) return;
    
    const sectionId = currentSection.id;
    if (!completedSections.includes(sectionId)) {
      setCompletedSections(prev => [...prev, sectionId]);
    }
    
    if (completedSections.length + 1 === formData.sections.length) {
      setIsSubmitting(true);
      try {
        const result = await apiService.submitSurveyResponses({ 
          patient: formData.patientInfo,
          formType: formData.formType, 
          answers 
        });
        console.log('Survey submission result:', result);
        setCurrentScreen('thankyou');
      } catch (error) {
        console.error('Error submitting survey:', error);
        setCurrentScreen('thankyou');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentScreen('dashboard');
    }
  };

  const handleRestart = () => {
    setCurrentScreen('welcome');
    setCurrentSectionId('');
    setAnswers({});
    setCompletedSections([]);
    setIsSubmitting(false);
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Submitting...</h2>
          <p className="text-gray-600 text-sm">Please wait while we save your feedback</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <GlobalStyles />
      {currentScreen === 'welcome' && <WelcomeScreen formData={formData} onStart={handleStart} />}
      {currentScreen === 'dashboard' && (
        <Dashboard
          formData={formData}
          completedSections={completedSections}
          onSectionSelect={handleSectionSelect}
          totalProgress={totalProgress}
        />
      )}
      {currentScreen === 'section' && currentSection && (
        <SectionInterface
          formData={formData}
          section={currentSection}
          answers={answers}
          onAnswerChange={handleAnswerChange}
          onComplete={handleSectionComplete}
          onDashboard={handleDashboard}
        />
      )}
      {currentScreen === 'thankyou' && <ThankYouScreen formData={formData} onRestart={handleRestart} />}
    </>
  );
};

export default App;