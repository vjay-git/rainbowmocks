// SharedComponents.tsx
import React, { useState } from 'react';

// Types
export interface Question {
  id: string;
  type: 'rating' | 'comment';
  text: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
  maxLength?: number;
}

export interface Section {
  id: string;
  title: string;
  icon: string;
  color: 'primary' | 'secondary' | 'accent' | 'quaternary';
  questions: Question[];
}

export interface FormData {
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

// Utility Functions
export const getStarRatingForOption = (option: string): number => {
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

export const getOptionForStarRating = (rating: number, options: string[]): string => {
  for (const option of options) {
    if (getStarRatingForOption(option) === rating) {
      return option;
    }
  }
  return options[rating - 1] || options[0];
};

export const colorThemes = {
  primary: { gradient: 'from-violet-500 to-purple-600', light: 'from-violet-50 to-purple-50', bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700' },
  secondary: { gradient: 'from-purple-500 to-indigo-600', light: 'from-purple-50 to-indigo-50', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
  accent: { gradient: 'from-indigo-500 to-violet-600', light: 'from-indigo-50 to-violet-50', bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700' },
  quaternary: { gradient: 'from-blue-500 to-indigo-600', light: 'from-blue-50 to-indigo-50', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' }
};

// Star Rating Component
export const StarRating = ({ 
  rating, 
  onRatingChange, 
  options, 
  size = 'lg' 
}: {
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
export const CommentQuestion = ({ 
  question, 
  value, 
  onChange 
}: {
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

// Progress Bar Component
export const ProgressBar = ({ 
  progress, 
  theme,
  label 
}: { 
  progress: number; 
  theme: string;
  label?: string;
}) => (
  <div className="space-y-2">
    {label && (
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
      </div>
    )}
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div 
        className={`h-3 rounded-full transition-all duration-1000 bg-gradient-to-r ${theme}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

// Section Card Component
export const SectionCard = ({ 
  section, 
  isCompleted, 
  onClick 
}: { 
  section: Section; 
  isCompleted: boolean;
  onClick: () => void;
}) => {
  const theme = colorThemes[section.color] || colorThemes.primary;
  
  return (
    <button
      onClick={onClick}
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
};

// Question Card Component
export const QuestionCard = ({ 
  question, 
  index, 
  answers, 
  onAnswerChange 
}: {
  question: Question;
  index: number;
  answers: Record<string, any>;
  onAnswerChange: (questionId: string, field: string, value: string) => void;
}) => {
  const currentAnswers = answers[question.id] || {};
  const selectedOption = currentAnswers.option;
  const currentRating = selectedOption ? getStarRatingForOption(selectedOption) : 0;

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
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
              onRatingChange={(rating, option) => onAnswerChange(question.id, 'option', option)}
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
                onChange={(value) => onAnswerChange(question.id, 'comment', value)}
              />
            </div>
          )}
        </div>
      ) : (
        <CommentQuestion
          question={question}
          value={currentAnswers.comment}
          onChange={(value) => onAnswerChange(question.id, 'comment', value)}
        />
      )}
    </div>
  );
};

// Welcome Screen Component
export const WelcomeScreen = ({ 
  formData, 
  onStart,
  title = "Welcome" 
}: {
  formData: FormData;
  onStart: () => void;
  title?: string;
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{title},</h1>
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

// Thank You Screen Component
export const ThankYouScreen = ({ 
  formData, 
  onRestart 
}: {
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