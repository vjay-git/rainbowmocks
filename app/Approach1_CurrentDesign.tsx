// Approach1_CurrentDesign.tsx
import React, { useState } from 'react';
import { 
  FormData, 
  Section, 
  StarRating, 
  CommentQuestion, 
  ProgressBar, 
  SectionCard, 
  QuestionCard, 
  WelcomeScreen, 
  ThankYouScreen,
  colorThemes,
  getStarRatingForOption 
} from './SharedComponents';

// Dashboard Component
const Dashboard = ({ 
  formData, 
  completedSections, 
  onSectionSelect, 
  totalProgress 
}: {
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
            
            <ProgressBar 
              progress={totalProgress} 
              theme="from-violet-500 to-purple-600"
            />
            
            <p className="text-center text-sm text-gray-600">
              {completedSections.length} of {formData.sections.length} sections completed
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {formData.sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              isCompleted={completedSections.includes(section.id)}
              onClick={() => onSectionSelect(section.id)}
            />
          ))}
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

// Section Interface Component
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
  
  const getAnsweredCount = () => {
    return section.questions.filter(question => {
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
    }).length;
  };

  const isComplete = () => {
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
          
          <ProgressBar 
            progress={progress} 
            theme={theme.gradient}
          />
        </div>

        <div className="p-4 space-y-6 pb-32">
          {section.questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              answers={answers}
              onAnswerChange={onAnswerChange}
            />
          ))}
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

        {!isComplete() && (
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-white/50 p-4">
            <div className="max-w-md mx-auto text-center">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-600 text-sm mb-2">
                  Please answer all required questions
                </p>
                <div className="text-xs text-gray-500">
                  {getAnsweredCount()} of {section.questions.length} questions completed
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Current Design Component
export const CurrentDesign = ({ 
  formData, 
  onBack 
}: { 
  formData: FormData; 
  onBack: () => void; 
}) => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'dashboard' | 'section' | 'thankyou'>('welcome');
  const [currentSectionId, setCurrentSectionId] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentSection = formData.sections.find(s => s.id === currentSectionId);
  const totalProgress = (completedSections.length / formData.sections.length) * 100;

  const handleStart = () => setCurrentScreen('dashboard');
  
  const handleSectionSelect = (sectionId: string) => {
    setCurrentSectionId(sectionId);
    setCurrentScreen('section');
  };
  
  const handleDashboard = () => setCurrentScreen('dashboard');
  
  const handleAnswerChange = (questionId: string, field: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], [field]: value }
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
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Survey submitted:', { 
          patient: formData.patientInfo,
          formType: formData.formType, 
          answers 
        });
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
    <div className="relative">
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={onBack}
          className="bg-white/90 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-xl text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to Options
        </button>
      </div>
      
      {currentScreen === 'welcome' && (
        <WelcomeScreen 
          formData={formData} 
          onStart={handleStart} 
          title="Welcome"
        />
      )}
      
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
      
      {currentScreen === 'thankyou' && (
        <ThankYouScreen 
          formData={formData} 
          onRestart={handleRestart} 
        />
      )}
    </div>
  );
};