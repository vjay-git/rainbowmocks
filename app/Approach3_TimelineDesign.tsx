// Approach3_TimelineDesign.tsx
import React, { useState } from 'react';
import { 
  FormData, 
  StarRating, 
  ProgressBar,
  getStarRatingForOption 
} from './SharedComponents';

// Journey Step Interface
interface JourneyStep {
  id: string;
  title: string;
  description: string;
  sections: string[];
  icon: string;
  color: string;
}

// Timeline Visualization Component
const TimelineVisualization = ({ 
  steps, 
  currentStep, 
  completedSteps 
}: {
  steps: JourneyStep[];
  currentStep: number;
  completedSteps: number[];
}) => (
  <div className="relative">
    <div className="flex items-center justify-between mb-6">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center flex-1 relative">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 z-10 ${
            completedSteps.includes(index) 
              ? 'bg-green-100 text-green-600 shadow-lg' 
              : currentStep === index 
              ? `bg-gradient-to-r ${step.color} text-white shadow-lg scale-110`
              : 'bg-gray-100 text-gray-400'
          }`}>
            {completedSteps.includes(index) ? '✓' : step.icon}
          </div>
          <div className="text-xs text-center mt-2 max-w-20">
            <div className={`font-medium ${currentStep === index ? 'text-gray-900' : 'text-gray-500'}`}>
              {step.title}
            </div>
          </div>
          
          {/* Connection Line */}
          {index < steps.length - 1 && (
            <div className={`absolute top-6 left-1/2 h-1 transition-all duration-300 ${
              completedSteps.includes(index) ? 'bg-green-300' : 'bg-gray-200'
            }`} style={{
              width: `calc(100% - 24px)`,
              marginLeft: '12px'
            }} />
          )}
        </div>
      ))}
    </div>
  </div>
);

// Question Card for Timeline
const TimelineQuestionCard = ({ 
  question, 
  answers, 
  onAnswerChange,
  sectionTitle,
  sectionIcon 
}: {
  question: any;
  answers: Record<string, any>;
  onAnswerChange: (questionId: string, field: string, value: string) => void;
  sectionTitle: string;
  sectionIcon: string;
}) => {
  const currentAnswers = answers[question.id] || {};
  const selectedOption = currentAnswers.option;
  const currentRating = selectedOption ? getStarRatingForOption(selectedOption) : 0;

  return (
    <div className="bg-gray-50/80 rounded-xl p-5">
      {/* Section Context */}
      <div className="flex items-center mb-3">
        <span className="text-lg mr-2">{sectionIcon}</span>
        <span className="text-sm font-medium text-gray-600">{sectionTitle}</span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-4 leading-relaxed">
        {question.text}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </h3>

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
          
          {currentRating > 0 && currentRating < 3 && (
            <div className="animate-fadeIn">
              <label className="block text-sm font-medium text-orange-700 mb-2">
                Please tell us what went wrong:
              </label>
              <textarea
                value={currentAnswers.comment || ''}
                onChange={(e) => onAnswerChange(question.id, 'comment', e.target.value)}
                placeholder="Help us understand what we can improve..."
                className="w-full h-24 p-4 border-2 border-red-200 rounded-xl resize-none focus:ring-2 focus:ring-red-400 bg-red-50"
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
          className="w-full h-24 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-orange-400"
          maxLength={question.maxLength || 500}
        />
      )}
    </div>
  );
};

// Main Timeline Design Component
export const TimelineDesign = ({ 
  formData, 
  onBack 
}: { 
  formData: FormData; 
  onBack: () => void; 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Create a journey flow that makes sense for hospital experience
  const journeySteps: JourneyStep[] = [
    { 
      id: 'admission', 
      title: 'Arrival & Admission', 
      description: 'Your first experience at the hospital',
      sections: ['billing'],
      icon: '🚪',
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      id: 'care_team', 
      title: 'Medical Care Team', 
      description: 'Interactions with doctors and nurses',
      sections: ['doctor', 'nursing'],
      icon: '👨‍⚕️',
      color: 'from-green-500 to-emerald-600'
    },
    { 
      id: 'daily_care', 
      title: 'Daily Care & Services', 
      description: 'Food, medication, and daily interactions',
      sections: ['food_beverages', 'floor_coordinator'],
      icon: '🍽️',
      color: 'from-purple-500 to-pink-600'
    },
    { 
      id: 'discharge_overall', 
      title: 'Discharge & Overall Experience', 
      description: 'Leaving the hospital and final thoughts',
      sections: ['discharge', 'overall_hospital_experience'],
      icon: '🏠',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const getCurrentQuestions = () => {
    const currentJourneyStep = journeySteps[currentStep];
    if (!currentJourneyStep) return [];
    
    const questions: any[] = [];
    currentJourneyStep.sections.forEach(sectionId => {
      const section = formData.sections.find(s => s.id === sectionId);
      if (section) {
        section.questions.forEach(q => {
          questions.push({
            ...q,
            sectionTitle: section.title,
            sectionIcon: section.icon
          });
        });
      }
    });
    return questions;
  };

  const isStepComplete = (stepIndex: number) => {
    const journeyStep = journeySteps[stepIndex];
    if (!journeyStep) return false;
    
    return journeyStep.sections.every(sectionId => {
      const section = formData.sections.find(s => s.id === sectionId);
      if (!section) return true;
      
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
    });
  };

  const handleAnswerChange = (questionId: string, field: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], [field]: value }
    }));
  };

  const handleNext = () => {
    if (isStepComplete(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep]);
      }
      if (currentStep < journeySteps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentQuestions = getCurrentQuestions();
  const totalProgress = (completedSteps.length / journeySteps.length) * 100;
  const currentJourneyStep = journeySteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="p-4">
        <button
          onClick={onBack}
          className="mb-6 bg-white/90 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-xl text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to Options
        </button>

        <div className="max-w-2xl mx-auto">
          {/* Timeline Header */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Your Hospital Journey</h1>
            <p className="text-gray-600 text-center mb-6">{formData.patientInfo.name} - Rate your experience at each step</p>
            
            {/* Timeline Visualization */}
            <TimelineVisualization 
              steps={journeySteps}
              currentStep={currentStep}
              completedSteps={completedSteps}
            />
            
            {/* Progress Bar */}
            <ProgressBar 
              progress={totalProgress} 
              theme="from-orange-500 to-red-600"
              label={`Journey Progress: ${completedSteps.length}/${journeySteps.length} steps`}
            />
          </div>

          {/* Current Step Content */}
          {currentJourneyStep && (
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 mb-6">
              <div className="text-center mb-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-r ${currentJourneyStep.color} shadow-xl`}>
                  <span className="text-2xl text-white">{currentJourneyStep.icon}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentJourneyStep.title}</h2>
                <p className="text-gray-600">{currentJourneyStep.description}</p>
              </div>

              {/* Questions for Current Step */}
              <div className="space-y-6">
                {currentQuestions.map((question) => (
                  <TimelineQuestionCard
                    key={question.id}
                    question={question}
                    answers={answers}
                    onAnswerChange={handleAnswerChange}
                    sectionTitle={question.sectionTitle}
                    sectionIcon={question.sectionIcon}
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    currentStep === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  ← Previous Step
                </button>

                {isStepComplete(currentStep) && (
                  <button
                    onClick={handleNext}
                    className={`px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 bg-gradient-to-r ${currentJourneyStep.color} hover:shadow-lg`}
                  >
                    {currentStep === journeySteps.length - 1 ? 'Complete Journey' : 'Next Step →'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Final Completion */}
          {totalProgress === 100 && (
            <div className="bg-green-50/90 backdrop-blur-xl rounded-2xl border border-green-200 p-8 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">Journey Complete!</h3>
              <p className="text-green-600 mb-6 text-lg">
                Thank you for sharing your complete hospital experience with us.
              </p>
              <button
                onClick={() => {
                  console.log('Timeline survey submitted:', { 
                    patient: formData.patientInfo, 
                    journeyAnswers: answers,
                    completedSteps 
                  });
                  alert('Your journey feedback has been submitted successfully!');
                }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg transition-all duration-200 text-lg"
              >
                Submit Journey Feedback
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};