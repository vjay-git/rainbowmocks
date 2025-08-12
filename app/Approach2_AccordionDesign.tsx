// Approach2_AccordionDesign.tsx
import React, { useState, useEffect } from 'react';
import { 
  FormData, 
  Section, 
  StarRating, 
  CommentQuestion, 
  ProgressBar,
  colorThemes,
  getStarRatingForOption 
} from './SharedComponents';

// Accordion Section Component
const AccordionSection = ({ 
  section, 
  isExpanded, 
  isComplete, 
  onToggle, 
  answers, 
  onAnswerChange,
  onMarkComplete 
}: {
  section: Section;
  isExpanded: boolean;
  isComplete: boolean;
  onToggle: () => void;
  answers: Record<string, any>;
  onAnswerChange: (questionId: string, field: string, value: string) => void;
  onMarkComplete: () => void;
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
          
          {/* Section Complete Button */}
          {isComplete && (
            <button
              onClick={onMarkComplete}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r ${theme.gradient} hover:shadow-lg transition-all duration-200`}
            >
              Mark {section.title} as Complete ✓
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Main Accordion Design Component
export const AccordionDesign = ({ 
  formData, 
  onBack 
}: { 
  formData: FormData; 
  onBack: () => void; 
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  useEffect(() => {
    // Auto-expand first incomplete section
    const firstIncomplete = formData.sections.find(s => !completedSections.includes(s.id));
    if (firstIncomplete && !expandedSections.includes(firstIncomplete.id)) {
      setExpandedSections([firstIncomplete.id]);
    }
  }, [completedSections, formData.sections, expandedSections]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
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

  const handleMarkComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections(prev => [...prev, sectionId]);
    }
  };

  const totalProgress = (completedSections.length / formData.sections.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="p-4">
        <button
          onClick={onBack}
          className="mb-6 bg-white/90 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-xl text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to Options
        </button>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Smart Accordion Survey</h1>
            <p className="text-gray-600 mb-4">{formData.patientInfo.name} - {formData.patientInfo.entryType}</p>
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-2xl font-bold text-emerald-600">{Math.round(totalProgress)}%</span>
              <span className="text-sm text-gray-500">Complete</span>
            </div>
            
            <ProgressBar 
              progress={totalProgress} 
              theme="from-emerald-500 to-teal-600"
            />
            
            <p className="text-sm text-gray-600 mt-3">
              {completedSections.length} of {formData.sections.length} sections completed
            </p>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-4">
            {formData.sections.map((section) => (
              <AccordionSection
                key={section.id}
                section={section}
                isExpanded={expandedSections.includes(section.id)}
                isComplete={isSectionComplete(section)}
                onToggle={() => toggleSection(section.id)}
                answers={answers}
                onAnswerChange={handleAnswerChange}
                onMarkComplete={() => handleMarkComplete(section.id)}
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
                  console.log('Accordion survey submitted:', { 
                    patient: formData.patientInfo, 
                    answers 
                  });
                  alert('Survey submitted successfully!');
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