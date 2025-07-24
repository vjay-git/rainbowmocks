"use client";
import React, { useState, useEffect } from 'react';

// Type definitions
type SectionColor = 'emerald' | 'blue' | 'violet' | 'slate';

interface Question {
  id: string;
  text: string;
  category: string;
}

interface Section {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: SectionColor;
  questions: Question[];
}

interface ProgressIndicatorProps {
  current: number;
  total: number;
  sectionTitle: string;
}

interface SectionOverviewProps {
  sections: Section[];
  completedSections: string[];
  onSectionSelect: (sectionId: string) => void;
  totalProgress: number;
}

interface SectionGridProps {
  sections: Section[];
  completedSections: string[];
  currentSectionIndex: number;
  onSectionSelect: (sectionId: string) => void;
}

interface QuestionInterfaceProps {
  section: Section;
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onRate: (rating: number) => void;
  currentRating: number;
  currentComment: string;
  onCommentChange: (comment: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  sections: Section[];
  completedSections: string[];
  currentSectionIndex: number;
  onSectionSelect: (sectionId: string) => void;
}

interface WelcomeScreenProps {
  onStart: () => void;
}

interface ThankYouScreenProps {
  onRestart: () => void;
}

// Professional data structure
const feedbackSections: Section[] = [
  {
    id: 'doctor',
    title: 'Medical Care',
    subtitle: 'Physician interaction and treatment',
    icon: '🩺',
    color: 'emerald',
    questions: [
      { id: 'q1', text: 'How would you rate your physician\'s attentiveness and compassion?', category: 'Care Quality' },
      { id: 'q2', text: 'How clearly did your physician explain your diagnosis and treatment?', category: 'Communication' },
      { id: 'q3', text: 'How well were you informed about your treatment progress?', category: 'Information' },
      { id: 'q4', text: 'How effectively was your pain managed during treatment?', category: 'Pain Management' }
    ]
  },
  {
    id: 'nursing',
    title: 'Nursing Care',
    subtitle: 'Nursing staff service and support',
    icon: '👩‍⚕️',
    color: 'blue',
    questions: [
      { id: 'n1', text: 'How professional and respectful were the nursing staff?', category: 'Professionalism' },
      { id: 'n2', text: 'How promptly did nurses respond to your requests?', category: 'Response Time' },
      { id: 'n3', text: 'How competent were nurses in performing medical procedures?', category: 'Clinical Skills' }
    ]
  },
  {
    id: 'admission',
    title: 'Admission Process',
    subtitle: 'Registration and intake experience',
    icon: '📋',
    color: 'violet',
    questions: [
      { id: 'a1', text: 'How efficient was the admission and registration process?', category: 'Process Efficiency' },
      { id: 'a2', text: 'How helpful and knowledgeable was the admission staff?', category: 'Staff Support' },
      { id: 'a3', text: 'How clear and understandable were the admission forms?', category: 'Documentation' }
    ]
  },
  {
    id: 'facilities',
    title: 'Facilities & Environment',
    subtitle: 'Hospital infrastructure and amenities',
    icon: '🏥',
    color: 'slate',
    questions: [
      { id: 'f1', text: 'How would you rate the cleanliness and comfort of your room?', category: 'Room Quality' },
      { id: 'f2', text: 'How satisfied were you with the meal quality and dietary services?', category: 'Food Services' },
      { id: 'f3', text: 'How accessible and well-maintained were the hospital facilities?', category: 'Accessibility' }
    ]
  }
];

const ratingScale = [
  { value: 1, label: 'Poor', description: 'Well below expectations' },
  { value: 2, label: 'Fair', description: 'Below expectations' },
  { value: 3, label: 'Good', description: 'Meets expectations' },
  { value: 4, label: 'Very Good', description: 'Above expectations' },
  { value: 5, label: 'Excellent', description: 'Exceeds expectations' }
];

// Sophisticated Progress Component
const ProgressIndicator = ({ current, total, sectionTitle }: ProgressIndicatorProps) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{sectionTitle}</h3>
          <p className="text-sm text-gray-600">Question {current + 1} of {total}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{Math.round(percentage)}%</div>
          <div className="text-xs text-gray-500">Complete</div>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Welcome Screen - Professional Design
const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <span className="text-3xl text-white">🏥</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Patient Experience Survey
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Your feedback helps us deliver exceptional healthcare. This survey takes approximately 5-7 minutes to complete.
          </p>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div className="text-center">
                <div className="font-semibold text-gray-900">4 Sections</div>
                <div className="text-gray-600">Medical Care, Nursing, Admission, Facilities</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">~5 Minutes</div>
                <div className="text-gray-600">Estimated completion time</div>
              </div>
            </div>
          </div>
          
          <button
            onClick={onStart}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Begin Survey
          </button>
          
          <p className="text-xs text-gray-500 mt-6">
            Your responses are confidential and help improve patient care quality.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Section Overview - Dashboard Style
const SectionOverview = ({ sections, completedSections, onSectionSelect, totalProgress }: SectionOverviewProps) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Survey Progress</h1>
              <p className="text-gray-600">Complete each section at your own pace</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600">{Math.round(totalProgress)}%</div>
              <div className="text-sm text-gray-500">Overall Progress</div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Section Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section, index) => {
            const isCompleted = completedSections.includes(section.id);
            const colorMap = {
              emerald: isCompleted ? 'from-green-50 to-green-100 border-green-200' : 'from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
              blue: isCompleted ? 'from-green-50 to-green-100 border-green-200' : 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
              violet: isCompleted ? 'from-green-50 to-green-100 border-green-200' : 'from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700',
              slate: isCompleted ? 'from-green-50 to-green-100 border-green-200' : 'from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700'
            };
            
            return (
              <button
                key={section.id}
                onClick={() => onSectionSelect(section.id)}
                className={`p-6 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  isCompleted 
                    ? `bg-gradient-to-r ${colorMap[section.color]} border-2` 
                    : `bg-gradient-to-r ${colorMap[section.color]} text-white shadow-xl`
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`text-3xl p-3 rounded-xl ${isCompleted ? 'bg-green-200' : 'bg-white/20'}`}>
                      {section.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${isCompleted ? 'text-green-800' : 'text-white'}`}>
                        {section.title}
                      </h3>
                      <p className={`text-sm ${isCompleted ? 'text-green-600' : 'text-white/80'}`}>
                        {section.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className={`text-xl ${isCompleted ? 'text-green-600' : 'text-white'}`}>
                    {isCompleted ? '✓' : '→'}
                  </div>
                </div>
                
                <div className={`text-sm ${isCompleted ? 'text-green-700' : 'text-white/90'}`}>
                  {section.questions.length} questions • {isCompleted ? 'Completed' : 'Pending'}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

const SectionGrid = ({ sections, completedSections, currentSectionIndex, onSectionSelect }: SectionGridProps) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Survey Sections</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {sections.map((section, index) => {
        const isCompleted = completedSections.includes(section.id);
        const isCurrent = index === currentSectionIndex;
        const colorMap = {
          emerald: 'border-emerald-500 bg-emerald-50',
          blue: 'border-blue-500 bg-blue-50',
          violet: 'border-violet-500 bg-violet-50',
          slate: 'border-slate-500 bg-slate-50'
        };
        
        return (
          <button
            key={section.id}
            onClick={() => onSectionSelect(section.id)}
            className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
              isCompleted 
                ? 'border-green-500 bg-green-50' 
                : isCurrent
                ? `${colorMap[section.color]} border-2`
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{section.icon}</span>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium truncate ${
                  isCompleted ? 'text-green-800' : isCurrent ? 'text-gray-900' : 'text-gray-600'
                }`}>
                  {section.title}
                </div>
              </div>
              <div className="text-xs">
                {isCompleted ? '✓' : isCurrent ? '●' : index + 1}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

const QuestionInterface = ({ section, question, questionIndex, totalQuestions, onRate, currentRating, currentComment, onCommentChange, onNext, onPrevious, canGoNext, canGoPrevious, sections, completedSections, currentSectionIndex, onSectionSelect }: QuestionInterfaceProps) => {
  const [selectedRating, setSelectedRating] = useState(currentRating);
  const [comment, setComment] = useState(currentComment || '');
  const [showCommentBox, setShowCommentBox] = useState(!!currentRating);

  useEffect(() => {
    setSelectedRating(currentRating);
    setComment(currentComment || '');
    setShowCommentBox(!!currentRating);
  }, [currentRating, currentComment]);

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
    onRate(rating);
    setShowCommentBox(true);
  };

  const handleCommentChange = (value: string) => {
    setComment(value);
    onCommentChange(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          
          {/* Section Grid at Top */}
          <SectionGrid 
            sections={sections}
            completedSections={completedSections}
            currentSectionIndex={currentSectionIndex}
            onSectionSelect={onSectionSelect}
          />
          
          {/* Navigation Header */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={onPrevious} 
              disabled={!canGoPrevious}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 transition-colors"
            >
              <span>←</span>
              <span>Previous</span>
            </button>
            
            <div className="text-center">
              <div className="text-sm font-medium text-gray-900">{section.title}</div>
              <div className="text-xs text-gray-500">{questionIndex + 1} of {totalQuestions}</div>
            </div>
            
            <div className="w-20"></div>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <ProgressIndicator 
              current={questionIndex} 
              total={totalQuestions} 
              sectionTitle={section.title}
            />
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                  {question.category}
                </span>
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-900 leading-relaxed mb-6">
                {question.text}
              </h2>
            </div>

            {/* Professional Rating Scale */}
            <div className="space-y-3 mb-8">
              {ratingScale.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleRatingSelect(option.value)}
                  className={`w-full p-5 rounded-xl transition-all duration-200 border-2 text-left ${
                    selectedRating === option.value
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                          selectedRating === option.value 
                            ? 'border-blue-500 bg-blue-500' 
                            : 'border-gray-300'
                        }`}>
                          {selectedRating === option.value && (
                            <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-600">{option.description}</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-400">
                      {option.value}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Inline Comments */}
            {showCommentBox && (
              <div className="border-t pt-6 animate-fade-in">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Additional Comments (Optional)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => handleCommentChange(e.target.value)}
                  placeholder="Please share any specific details about your experience..."
                  className="w-full h-24 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm bg-gray-50 focus:bg-white"
                  maxLength={250}
                />
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-gray-500">
                    Your comments help us understand your experience better
                  </div>
                  <div className="text-xs text-gray-400">
                    {comment.length}/250
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          {selectedRating && (
            <div className="flex justify-end">
              <button
                onClick={onNext}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                {questionIndex === totalQuestions - 1 ? 'Complete Section' : 'Next Question'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Professional Thank You Screen
const ThankYouScreen = ({ onRestart }: ThankYouScreenProps) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <span className="text-3xl text-white">✓</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thank You
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Your feedback has been successfully submitted. We value your input and will use it to continuously improve our healthcare services.
          </p>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <p className="text-sm text-gray-700">
              <strong>What happens next?</strong><br/>
              Your responses will be reviewed by our quality improvement team and incorporated into our ongoing efforts to enhance patient care.
            </p>
          </div>
          
          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200"
          >
            Submit Another Survey
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Main App Component
const App = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Record<string, number>>>({});
  const [comments, setComments] = useState<Record<string, Record<string, string>>>({});
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const currentSection = feedbackSections[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  const totalQuestions = currentSection?.questions.length || 0;
  
  const totalProgress = (completedSections.length / feedbackSections.length) * 100;

  const handleStart = () => {
    setCurrentScreen('overview');
  };

  const handleSectionSelect = (sectionId: string) => {
    const idx = feedbackSections.findIndex(s => s.id === sectionId);
    if (idx !== -1) {
      setCurrentSectionIndex(idx);
      setCurrentQuestionIndex(0);
      setCurrentScreen('question');
    }
  };

  const handleSectionJump = (sectionId: string) => {
    const idx = feedbackSections.findIndex(s => s.id === sectionId);
    if (idx !== -1) {
      setCurrentSectionIndex(idx);
      setCurrentQuestionIndex(0);
      // Stay on the same screen, just switch sections
    }
  };

  const handleRate = (rating: number) => {
    const sectionId = currentSection.id;
    const questionId = currentQuestion.id;
    
    setAnswers(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [questionId]: rating
      }
    }));
  };

  const handleCommentChange = (comment: string) => {
    const sectionId = currentSection.id;
    const questionId = currentQuestion.id;
    
    setComments(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [questionId]: comment
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
      
      if (completedSections.length + 1 === feedbackSections.length) {
        console.log('Complete feedback data:', { answers, comments });
        setCurrentScreen('thankyou');
      } else {
        setCurrentScreen('overview');
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setCurrentScreen('overview');
    }
  };

  const handleRestart = () => {
    setCurrentScreen('welcome');
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setComments({});
    setCompletedSections([]);
  };

  const getCurrentRating = () => {
    const sectionId = currentSection?.id;
    const questionId = currentQuestion?.id;
    return answers[sectionId]?.[questionId] || 0;
  };

  const getCurrentComment = () => {
    const sectionId = currentSection?.id;
    const questionId = currentQuestion?.id;
    return comments[sectionId]?.[questionId] || '';
  };

  const canGoNext = getCurrentRating() > 0;
  const canGoPrevious = currentQuestionIndex > 0;

  if (currentScreen === 'welcome') {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (currentScreen === 'overview') {
    return (
      <SectionOverview
        sections={feedbackSections}
        completedSections={completedSections}
        onSectionSelect={handleSectionSelect}
        totalProgress={totalProgress}
      />
    );
  }

  if (currentScreen === 'question') {
    return (
      <QuestionInterface
        section={currentSection}
        question={currentQuestion}
        questionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        onRate={handleRate}
        currentRating={getCurrentRating()}
        currentComment={getCurrentComment()}
        onCommentChange={handleCommentChange}
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoNext={canGoNext}
        canGoPrevious={canGoPrevious}
        sections={feedbackSections}
        completedSections={completedSections}
        currentSectionIndex={currentSectionIndex}
        onSectionSelect={handleSectionJump}
      />
    );
  }

  if (currentScreen === 'thankyou') {
    return <ThankYouScreen onRestart={handleRestart} />;
  }

  return null;
};

export default App;
