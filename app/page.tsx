"use client";
import React, { useState, useEffect } from 'react';
import { 
  realQuestionsData, 
  colorThemes, 
  apiService,
  type FormData,
  type Section,
  type Question,
  type ColorThemes 
} from './api';

// Load Google Fonts only in the browser
const loadGoogleFonts = () => {
  if (typeof document !== 'undefined') {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
  }
};

// Dynamic Rating Question Component
const RatingQuestion = ({ question, value, onChange }: {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}) => {
  const options = question.options || [];

  return (
    <div className="space-y-3">
      {options.length <= 5 ? (
        <div className="grid grid-cols-2 gap-3">
          {options.map((option, index) => (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={`p-4 rounded-xl transition-all duration-200 border-2 ${
                value === option
                  ? 'border-violet-500 bg-violet-50 shadow-md transform scale-105'
                  : 'border-gray-200 hover:border-violet-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-center">
                <div className="text-lg font-bold text-gray-700 mb-1 font-poppins">{index + 1}</div>
                <div className="text-sm font-medium text-gray-600 font-inter">{option}</div>
                {value === option && (
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
          {options.map((option, index) => (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={`w-full p-4 text-left rounded-xl transition-all duration-200 border-2 ${
                value === option
                  ? 'border-violet-500 bg-violet-50 shadow-md'
                  : 'border-gray-200 hover:border-violet-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 font-inter">{option}</span>
                {value === option && (
                  <div className="w-5 h-5 bg-violet-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Comment Question Component
const CommentQuestion = ({ question, value, onChange }: {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div>
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={question.placeholder || 'Share your thoughts...'}
      className="w-full h-24 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors font-inter"
      maxLength={question.maxLength || 500}
    />
    <div className="flex justify-between items-center mt-2">
      <div className="text-xs text-gray-500 font-inter">
        {question.required ? 'Required' : 'Optional'}
      </div>
      <div className="text-xs text-gray-400 font-inter">
        {(value || '').length}/{question.maxLength || 500}
      </div>
    </div>
  </div>
);

// Welcome Screen with Patient Info
const WelcomeScreen = ({ formData, onStart }: {
  formData: FormData;
  onStart: () => void;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-violet-100 flex items-center justify-center p-4">
          <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 text-center">
      <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <span className="text-2xl text-white">🏥</span>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-2 font-poppins tracking-tight">
        {formData.title}
      </h1>
      
      <h2 className="text-lg font-medium text-violet-600 mb-4 font-inter">
        {formData.subtitle}
      </h2>

      {/* Patient Information */}
      <div className="bg-violet-50 rounded-xl p-4 mb-6 text-left">
        <h3 className="font-semibold text-violet-800 mb-2 font-inter">Welcome</h3>
        <div className="space-y-1 text-sm font-inter">
          <p><span className="font-medium">Patient:</span> {formData.patientInfo.name}</p>
          <p><span className="font-medium">Type:</span> {formData.patientInfo.entryType}</p>
          <p><span className="font-medium">Unit:</span> {formData.patientInfo.location}</p>
          <p><span className="font-medium">Doctor:</span> {formData.patientInfo.doctor}</p>
        </div>
      </div>
      
      <p className="text-gray-600 mb-8 font-inter leading-relaxed">
        Your feedback helps us improve our services and patient care quality.
      </p>
      
      <button
        onClick={onStart}
        className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 font-inter tracking-wide"
      >
        Start Survey
      </button>
    </div>
  </div>
);

// Dashboard
const Dashboard = ({ formData, completedSections, onSectionSelect, totalProgress }: {
  formData: FormData;
  completedSections: string[];
  onSectionSelect: (sectionId: string) => void;
  totalProgress: number;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-violet-100 p-4">
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-poppins tracking-tight">Survey Progress</h1>
            <p className="text-violet-600 font-medium font-inter">{formData.patientInfo.name} - {formData.patientInfo.entryType}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-violet-600 font-poppins">{Math.round(totalProgress)}%</div>
            <div className="text-sm text-gray-500 font-inter">Complete</div>
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
              className={`w-full p-5 rounded-xl transition-all duration-200 hover:scale-105 shadow-sm border ${
                isCompleted 
                  ? 'bg-green-50/80 backdrop-blur-sm border-green-200' 
                  : 'bg-white/80 backdrop-blur-sm border-white/30 hover:shadow-md hover:border-violet-200'
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
                  <h3 className={`font-semibold font-poppins ${isCompleted ? 'text-green-800' : 'text-gray-900'}`}>
                    {section.title}
                  </h3>
                  <p className={`text-sm font-inter ${isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
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

// Question Interface
const QuestionInterface = ({ 
  formData, 
  section, 
  question, 
  questionIndex, 
  totalQuestions, 
  answers, 
  onAnswerChange, 
  onNext, 
  onPrevious, 
  onDashboard, 
  canGoPrevious 
}: {
  formData: FormData;
  section: Section;
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  answers: Record<string, any>;
  onAnswerChange: (questionId: string, field: string, value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onDashboard: () => void;
  canGoPrevious: boolean;
}) => {
  const theme = colorThemes[section.color] || colorThemes.primary;
  const progress = ((questionIndex + 1) / totalQuestions) * 100;
  
  const handleAnswerChange = (field: string, value: string) => {
    onAnswerChange(question.id, field, value);
  };

  const renderQuestionInput = () => {
    const currentAnswers = answers[question.id] || {};
    
    if (question.type === 'rating') {
      return (
        <div className="space-y-6">
          <RatingQuestion
            question={question}
            value={currentAnswers.rating}
            onChange={(value) => handleAnswerChange('rating', value)}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Additional Comments (Optional)
            </label>
            <CommentQuestion
              question={{ ...question, required: false }}
              value={currentAnswers.comment}
              onChange={(value) => handleAnswerChange('comment', value)}
            />
          </div>
        </div>
      );
    }
    
    return (
      <CommentQuestion
        question={question}
        value={currentAnswers.comment}
        onChange={(value) => handleAnswerChange('comment', value)}
      />
    );
  };

  const isAnswered = () => {
    const currentAnswers = answers[question.id] || {};
    if (!question.required) return true;
    
    if (question.type === 'rating') {
      return !!currentAnswers.rating;
    }
    
    return !!(currentAnswers.comment || '').trim();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-violet-100 p-4">
      <div className="max-w-lg mx-auto">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onDashboard}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors bg-white/80 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-xl shadow-sm font-inter"
          >
            <span>←</span>
            <span>Dashboard</span>
          </button>
          
          <div className="bg-white/80 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-xl shadow-sm">
            <div className="text-sm font-medium text-gray-700 font-inter">
              {questionIndex + 1} of {totalQuestions}
            </div>
          </div>
          
          {canGoPrevious && (
            <button 
              onClick={onPrevious}
              className="text-gray-600 hover:text-gray-900 transition-colors bg-white/80 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-xl shadow-sm font-inter"
            >
              Previous
            </button>
          )}
        </div>

        {/* Section Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${theme.gradient}`}>
              <span className="text-white text-xl">{section.icon}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-poppins tracking-tight">{section.title}</h2>
              <div className="text-sm text-gray-600 font-inter">{Math.round(progress)}% complete</div>
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
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 leading-relaxed mb-2 font-poppins">
              {question.text}
            </h3>
            {question.required && (
              <div className="text-sm text-red-600 font-inter">* Required</div>
            )}
          </div>

          {renderQuestionInput()}
        </div>

        {/* Navigation */}
        {isAnswered() && (
          <button
            onClick={onNext}
            className={`w-full font-semibold py-3 px-6 rounded-xl transition-all duration-200 bg-gradient-to-r ${theme.gradient} hover:shadow-lg text-white font-inter tracking-wide`}
          >
            {questionIndex === totalQuestions - 1 ? 'Complete Section' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};

// Thank You Screen with Patient Info
const ThankYouScreen = ({ formData, onRestart }: {
  formData: FormData;
  onRestart: () => void;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-violet-100 flex items-center justify-center p-4">
    <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 text-center">
      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <span className="text-2xl text-white">✓</span>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4 font-poppins tracking-tight">
        Thank You, {formData.patientInfo.name}!
      </h1>
      
      {/* Patient Info Summary */}
      <div className="bg-green-50 rounded-xl p-4 mb-6 text-left">
        <h3 className="font-semibold text-green-800 mb-2 font-inter">Survey Completed</h3>
        <div className="space-y-1 text-sm text-green-700 font-inter">
          <p><span className="font-medium">Patient:</span> {formData.patientInfo.name}</p>
          <p><span className="font-medium">Type:</span> {formData.patientInfo.entryType}</p>
          <p><span className="font-medium">Unit:</span> {formData.patientInfo.location}</p>
          <p><span className="font-medium">Doctor:</span> {formData.patientInfo.doctor}</p>
        </div>
      </div>
      
      <p className="text-gray-600 mb-8 font-inter leading-relaxed">
        Your feedback has been submitted successfully. Thank you for helping us improve our services at{' '}
        <span className="text-violet-600 font-medium">{formData.patientInfo.unit}</span>.
      </p>
      
      <button
        onClick={onRestart}
        className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 font-inter tracking-wide"
      >
        New Survey
      </button>
    </div>
  </div>
);

// Main App
const App = () => {
  const [formData] = useState<FormData>(realQuestionsData);
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'dashboard' | 'question' | 'thankyou'>('welcome');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  // Load fonts when component mounts
  useEffect(() => {
    loadGoogleFonts();
  }, []);

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

  const handleAnswerChange = (questionId: string, field: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value
      }
    }));
  };

  const handleNext = async () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const sectionId = currentSection.id;
      if (!completedSections.includes(sectionId)) {
        setCompletedSections(prev => [...prev, sectionId]);
      }
      
      if (completedSections.length + 1 === formData.sections.length) {
        // Submit survey data using API service
        try {
          const result = await apiService.submitSurveyResponses({ 
            patient: formData.patientInfo,
            formType: formData.formType, 
            answers 
          });
          console.log('Survey submission result:', result);
        } catch (error) {
          console.error('Error submitting survey:', error);
        }
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