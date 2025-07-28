"use client";
import React, { useState } from 'react';

// Dynamic Question Types
const QUESTION_TYPES = {
  RATING: 'rating',
  COMMENT: 'comment',
  RATING_WITH_COMMENT: 'rating_with_comment',
  MULTIPLE_CHOICE: 'multiple_choice',
  YES_NO: 'yes_no'
};

// Sample dynamic data structure
const sampleFeedbackData = {
  formType: 'inpatient',
  title: 'Patient Experience Survey',
  subtitle: 'Rainbow Children\'s Hospital',
  sections: [
    {
      id: 'medical_care',
      title: 'Medical Care',
      icon: '👨‍⚕️',
      color: 'primary',
      questions: [
        {
          id: 'q1',
          type: QUESTION_TYPES.RATING_WITH_COMMENT,
          text: 'How would you rate the quality of medical care you received?',
          required: true,
          ratingScale: {
            min: 1,
            max: 5,
            labels: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
          },
          commentPrompt: 'Please share specific details about your medical care experience'
        },
        {
          id: 'q2',
          type: QUESTION_TYPES.COMMENT,
          text: 'What could we have done differently to improve your medical care?',
          required: false,
          placeholder: 'Share your suggestions for improvement...',
          maxLength: 300
        }
      ]
    },
    {
      id: 'nursing_care',
      title: 'Nursing Care',
      icon: '👩‍⚕️',
      color: 'secondary',
      questions: [
        {
          id: 'n1',
          type: QUESTION_TYPES.RATING,
          text: 'How professional and respectful were the nursing staff?',
          required: true,
          ratingScale: {
            min: 1,
            max: 5,
            labels: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
          }
        },
        {
          id: 'n2',
          type: QUESTION_TYPES.YES_NO,
          text: 'Did nurses respond to your requests in a timely manner?',
          required: true
        }
      ]
    },
    {
      id: 'facilities',
      title: 'Hospital Environment',
      icon: '🏥',
      color: 'accent',
      questions: [
        {
          id: 'f1',
          type: QUESTION_TYPES.RATING,
          text: 'How would you rate the cleanliness of the hospital?',
          required: true,
          ratingScale: {
            min: 1,
            max: 10,
            labels: null
          }
        }
      ]
    }
  ]
};

// Clean White & Violet Theme
const colorThemes: Record<string, {
  gradient: string;
  light: string;
  bg: string;
  border: string;
  text: string;
}> = {
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
  }
};

// Clean Rating Question
interface RatingQuestionProps {
  question: {
    ratingScale: {
      min: number;
      max: number;
      labels: string[] | null;
    };
    [key: string]: any;
  };
  value: number;
  onChange: (value: number) => void;
}

const RatingQuestion = ({ question, value, onChange }: RatingQuestionProps) => {
  const { ratingScale } = question;
  const options = [];
  
  for (let i = ratingScale.min; i <= ratingScale.max; i++) {
    options.push({
      value: i,
      label: ratingScale.labels ? ratingScale.labels[i - 1] : i.toString()
    });
  }

  return (
    <div className="space-y-3">
      {ratingScale.max <= 5 ? (
        <div className="grid grid-cols-2 gap-3">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`p-4 rounded-xl transition-all duration-200 border-2 ${
                value === option.value
                  ? 'border-violet-500 bg-violet-50 shadow-md transform scale-105'
                  : 'border-gray-200 hover:border-violet-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700 mb-1">{option.value}</div>
                <div className="text-sm font-medium text-gray-600">{option.label}</div>
                {value === option.value && (
                  <div className="w-5 h-5 bg-violet-500 rounded-full flex items-center justify-center mx-auto mt-2">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>{ratingScale.min}</span>
            <span>{ratingScale.max}</span>
          </div>
          <div className="flex space-x-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => onChange(option.value)}
                className={`flex-1 h-12 rounded-lg border-2 transition-all duration-200 ${
                  value === option.value
                    ? 'border-violet-500 bg-violet-500 text-white'
                    : 'border-gray-200 hover:border-violet-300 text-gray-600'
                }`}
              >
                {option.value}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Clean Comment Question
interface CommentQuestionProps {
  question: {
    placeholder?: string;
    maxLength?: number;
    required?: boolean;
    [key: string]: any;
  };
  value: string;
  onChange: (value: string) => void;
}

const CommentQuestion = ({ question, value, onChange }: CommentQuestionProps) => (
  <div>
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={question.placeholder || 'Share your thoughts...'}
      className="w-full h-24 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
      maxLength={question.maxLength || 500}
    />
    <div className="flex justify-between items-center mt-2">
      <div className="text-xs text-gray-500">
        {question.required ? 'Required' : 'Optional'}
      </div>
      <div className="text-xs text-gray-400">
        {(value || '').length}/{question.maxLength || 500}
      </div>
    </div>
  </div>
);

// Clean Multiple Choice Question
interface MultipleChoiceQuestionProps {
  question: {
    options: string[];
    [key: string]: any;
  };
  value: string;
  onChange: (value: string) => void;
}

const MultipleChoiceQuestion = ({ question, value, onChange }: MultipleChoiceQuestionProps) => (
  <div className="space-y-2">
    {question.options.map((option, index) => (
      <button
        key={index}
        onClick={() => onChange(option)}
        className={`w-full p-4 text-left rounded-xl transition-all duration-200 border-2 ${
          value === option
            ? 'border-violet-500 bg-violet-50 shadow-md'
            : 'border-gray-200 hover:border-violet-300 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900">{option}</span>
          {value === option && (
            <div className="w-5 h-5 bg-violet-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>
      </button>
    ))}
  </div>
);

// Clean Yes/No Question
interface YesNoQuestionProps {
  question: {
    [key: string]: any;
  };
  value: string;
  onChange: (value: string) => void;
}

const YesNoQuestion = ({ question, value, onChange }: YesNoQuestionProps) => (
  <div className="grid grid-cols-2 gap-4">
    {['Yes', 'No'].map((option) => (
      <button
        key={option}
        onClick={() => onChange(option)}
        className={`p-4 rounded-xl transition-all duration-200 border-2 ${
          value === option
            ? 'border-violet-500 bg-violet-50 shadow-md'
            : 'border-gray-200 hover:border-violet-300 hover:bg-gray-50'
        }`}
      >
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{option}</div>
          {value === option && (
            <div className="w-5 h-5 bg-violet-500 rounded-full flex items-center justify-center mx-auto mt-2">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>
      </button>
    ))}
  </div>
);

// Clean Welcome Screen
interface WelcomeScreenProps {
  formData: {
    title: string;
    subtitle: string;
    [key: string]: any;
  };
  onStart: () => void;
}

const WelcomeScreen = ({ formData, onStart }: WelcomeScreenProps) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
      <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <span className="text-2xl text-white">🏥</span>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {formData.title}
      </h1>
      
      <h2 className="text-lg font-medium text-violet-600 mb-6">
        {formData.subtitle}
      </h2>
      
      <p className="text-gray-600 mb-8">
        Your feedback helps us improve our services and patient care quality.
      </p>
      
      <button
        onClick={onStart}
        className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
      >
        Start Survey
      </button>
    </div>
  </div>
);

// Clean Dashboard
interface DashboardProps {
  formData: {
    subtitle: string;
    sections: Array<{ id: string; title: string; icon: string; color: string; questions: any[] }>;
    [key: string]: any;
  };
  completedSections: string[];
  onSectionSelect: (sectionId: string) => void;
  totalProgress: number;
}

const Dashboard = ({ formData, completedSections, onSectionSelect, totalProgress }: DashboardProps) => (
  <div className="min-h-screen bg-gray-50 p-4">
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Survey Progress</h1>
            <p className="text-violet-600 font-medium">{formData.subtitle}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-violet-600">{Math.round(totalProgress)}%</div>
            <div className="text-sm text-gray-500">Complete</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-violet-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
      </div>

      {/* Section Cards */}
      <div className="space-y-4">
        {formData.sections.map((section) => {
          const isCompleted = completedSections.includes(section.id);
          const theme = colorThemes[section.color] || colorThemes.primary;
          
          return (
            <button
              key={section.id}
              onClick={() => onSectionSelect(section.id)}
              className={`w-full p-5 rounded-xl transition-all duration-200 hover:scale-105 shadow-sm ${
                isCompleted 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-white border border-gray-200 hover:shadow-md hover:border-violet-200'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-green-100' 
                    : `bg-gradient-to-r ${theme.gradient}`
                }`}>
                  <span className="text-xl text-white">
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
                <div className="text-gray-400">→</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

// Clean Question Interface
interface QuestionInterfaceProps {
  formData: {
    sections: Array<{ id: string; title: string; icon: string; color: string; questions: any[] }>;
    [key: string]: any;
  };
  section: {
    id: string;
    title: string;
    icon: string;
    color: string;
    questions: any[];
    [key: string]: any;
  };
  question: any;
  questionIndex: number;
  totalQuestions: number;
  answers: Record<string, any>;
  onAnswerChange: (questionId: string, field: string, value: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  onDashboard: () => void;
  canGoPrevious: boolean;
}

const QuestionInterface = ({ formData, section, question, questionIndex, totalQuestions, answers, onAnswerChange, onNext, onPrevious, onDashboard, canGoPrevious }: QuestionInterfaceProps) => {
  const theme = colorThemes[section.color] || colorThemes.primary;
  const progress = ((questionIndex + 1) / totalQuestions) * 100;
  
  const handleAnswerChange = (field: string, value: any) => {
    onAnswerChange(question.id, field, value);
  };

  const renderQuestionInput = () => {
    const currentAnswers = answers[question.id] || {};
    
    switch (question.type) {
      case QUESTION_TYPES.RATING:
        return (
          <RatingQuestion
            question={question}
            value={currentAnswers.rating}
            onChange={(value) => handleAnswerChange('rating', value)}
          />
        );
      case QUESTION_TYPES.COMMENT:
        return (
          <CommentQuestion
            question={question}
            value={currentAnswers.comment}
            onChange={(value) => handleAnswerChange('comment', value)}
          />
        );
      case QUESTION_TYPES.RATING_WITH_COMMENT:
        return (
          <div className="space-y-6">
            <RatingQuestion
              question={question}
              value={currentAnswers.rating}
              onChange={(value) => handleAnswerChange('rating', value)}
            />
            {currentAnswers.rating && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {question.commentPrompt || 'Additional Comments (Optional)'}
                </label>
                <CommentQuestion
                  question={question}
                  value={currentAnswers.comment}
                  onChange={(value) => handleAnswerChange('comment', value)}
                />
              </div>
            )}
          </div>
        );
      case QUESTION_TYPES.MULTIPLE_CHOICE:
        return (
          <MultipleChoiceQuestion
            question={question}
            value={currentAnswers.choice}
            onChange={(value) => handleAnswerChange('choice', value)}
          />
        );
      case QUESTION_TYPES.YES_NO:
        return (
          <YesNoQuestion
            question={question}
            value={currentAnswers.yesno}
            onChange={(value) => handleAnswerChange('yesno', value)}
          />
        );
      default:
        return <div className="text-red-500">Unknown question type: {question.type}</div>;
    }
  };

  const isAnswered = () => {
    const currentAnswers = answers[question.id] || {};
    if (!question.required) return true;
    
    switch (question.type) {
      case QUESTION_TYPES.RATING:
        return !!currentAnswers.rating;
      case QUESTION_TYPES.COMMENT:
        return !!(currentAnswers.comment || '').trim();
      case QUESTION_TYPES.RATING_WITH_COMMENT:
        return !!currentAnswers.rating;
      case QUESTION_TYPES.MULTIPLE_CHOICE:
        return !!currentAnswers.choice;
      case QUESTION_TYPES.YES_NO:
        return !!currentAnswers.yesno;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onDashboard}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm"
          >
            <span>←</span>
            <span>Dashboard</span>
          </button>
          
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm">
            <div className="text-sm font-medium text-gray-700">
              {questionIndex + 1} of {totalQuestions}
            </div>
          </div>
          
          {canGoPrevious && (
            <button 
              onClick={onPrevious}
              className="text-gray-600 hover:text-gray-900 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm"
            >
              Previous
            </button>
          )}
        </div>

        {/* Section Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${theme.gradient}`}>
              <span className="text-white text-xl">{section.icon}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
              <div className="text-sm text-gray-600">{Math.round(progress)}% complete</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 bg-gradient-to-r ${theme.gradient}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 leading-relaxed mb-2">
              {question.text}
            </h3>
            {question.required && (
              <div className="text-sm text-red-600">* Required</div>
            )}
          </div>

          {renderQuestionInput()}
        </div>

        {/* Navigation */}
        {isAnswered() && (
          <button
            onClick={onNext}
            className={`w-full font-semibold py-3 px-6 rounded-xl transition-all duration-200 bg-gradient-to-r ${theme.gradient} hover:shadow-lg text-white`}
          >
            {questionIndex === totalQuestions - 1 ? 'Complete Section' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};

// Clean Thank You Screen
interface ThankYouScreenProps {
  formData: {
    subtitle: string;
    [key: string]: any;
  };
  onRestart: () => void;
}

const ThankYouScreen = ({ formData, onRestart }: ThankYouScreenProps) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <span className="text-2xl text-white">✓</span>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Thank You!
      </h1>
      
      <p className="text-gray-600 mb-8">
        Your feedback has been submitted successfully. Thank you for helping us improve our services at{' '}
        <span className="text-violet-600 font-medium">{formData.subtitle}</span>.
      </p>
      
      <button
        onClick={onRestart}
        className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
      >
        New Survey
      </button>
    </div>
  </div>
);

// Main App
const App = () => {
  const [formData] = useState(sampleFeedbackData);
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Record<string, any>>>({});
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const currentSection = formData.sections[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  const totalQuestions = currentSection?.questions.length || 0;
  
  const totalProgress = (completedSections.length / formData.sections.length) * 100;

  const handleStart = () => {
    setCurrentScreen('dashboard');
  };

  const handleSectionSelect = (sectionId: string) => {
    const idx = formData.sections.findIndex(s => s.id === sectionId);
    if (idx !== -1) {
      setCurrentSectionIndex(idx);
      setCurrentQuestionIndex(0);
      setCurrentScreen('question');
    }
  };

  const handleDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const handleAnswerChange = (questionId: string, field: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const sectionId = currentSection.id;
      if (!completedSections.includes(sectionId)) {
        setCompletedSections(prev => [...prev, sectionId]);
      }
      
      if (completedSections.length + 1 === formData.sections.length) {
        console.log('Complete feedback data:', { formType: formData.formType, answers });
        setCurrentScreen('thankyou');
      } else {
        setCurrentScreen('dashboard');
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentScreen('welcome');
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCompletedSections([]);
  };

  const canGoPrevious = currentQuestionIndex > 0;

  if (currentScreen === 'welcome') {
    return <WelcomeScreen formData={formData} onStart={handleStart} />;
  }

  if (currentScreen === 'dashboard') {
    return (
      <Dashboard
        formData={formData}
        completedSections={completedSections}
        onSectionSelect={handleSectionSelect}
        totalProgress={totalProgress}
      />
    );
  }

  if (currentScreen === 'question') {
    return (
      <QuestionInterface
        formData={formData}
        section={currentSection}
        question={currentQuestion}
        questionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        answers={answers}
        onAnswerChange={handleAnswerChange}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onDashboard={handleDashboard}
        canGoPrevious={canGoPrevious}
      />
    );
  }

  if (currentScreen === 'thankyou') {
    return <ThankYouScreen formData={formData} onRestart={handleRestart} />;
  }

  return null;
};

export default App;