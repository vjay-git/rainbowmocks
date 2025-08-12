"use client";
import React, { useState, useEffect } from 'react';
import { CurrentDesign } from './Approach1_CurrentDesign';
import { AccordionDesign } from './Approach2_AccordionDesign';
import { TimelineDesign } from './Approach3_TimelineDesign';
import { FormData } from './SharedComponents';

// Sample Data
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

// Approach Selector Component
const ApproachSelector = ({ onSelectApproach }: { onSelectApproach: (approach: string) => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Survey Experience</h1>
        <p className="text-xl text-gray-600">Select the interface design that works best for your patients</p>
        <div className="mt-4 text-sm text-gray-500">
          Each design uses the same data but with different UX approaches
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        {/* Approach 1: Your Current Design */}
        <div className="bg-white rounded-3xl shadow-2xl border p-8 hover:scale-105 transition-all duration-300 group">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-violet-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-2xl transition-shadow">
              <span className="text-3xl">⭐</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Classic Stars</h3>
            <p className="text-gray-600 mt-2">Your current design - Section-based star ratings</p>
          </div>
          
          <div className="space-y-3 mb-8">
            <div className="text-sm text-gray-600 flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Section-by-section navigation
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Traditional star ratings
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Progress dashboard
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Comments for low ratings only
            </div>
          </div>
          
          <button
            onClick={() => onSelectApproach('current')}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl hover:shadow-xl transition-all duration-200 hover:from-violet-600 hover:to-purple-700"
          >
            Try Classic Design
          </button>
        </div>

        {/* Approach 2: Accordion Collapse */}
        <div className="bg-white rounded-3xl shadow-2xl border p-8 hover:scale-105 transition-all duration-300 group">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-2xl transition-shadow">
              <span className="text-3xl">📋</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Smart Accordion</h3>
            <p className="text-gray-600 mt-2">Expandable sections with intelligent flow</p>
          </div>
          
          <div className="space-y-3 mb-8">
            <div className="text-sm text-gray-600 flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Expand/collapse sections
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              One-page overview
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Smart auto-expansion
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Minimal scrolling
            </div>
          </div>
          
          <button
            onClick={() => onSelectApproach('accordion')}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 px-6 rounded-2xl hover:shadow-xl transition-all duration-200 hover:from-emerald-600 hover:to-teal-700"
          >
            Try Accordion Design
          </button>
        </div>

        {/* Approach 3: Timeline Flow */}
        <div className="bg-white rounded-3xl shadow-2xl border p-8 hover:scale-105 transition-all duration-300 group lg:col-span-1 md:col-span-2 lg:col-span-1">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-2xl transition-shadow">
              <span className="text-3xl">🔄</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Journey Timeline</h3>
            <p className="text-gray-600 mt-2">Hospital journey-based progressive flow</p>
          </div>
          
          <div className="space-y-3 mb-8">
            <div className="text-sm text-gray-600 flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Journey-based progression
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Visual timeline
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Contextual storytelling
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Guided experience
            </div>
          </div>
          
          <button
            onClick={() => onSelectApproach('timeline')}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 px-6 rounded-2xl hover:shadow-xl transition-all duration-200 hover:from-orange-600 hover:to-red-700"
          >
            Try Timeline Design
          </button>
        </div>
      </div>
      
      <div className="text-center mt-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 inline-block">
          <p className="text-gray-700 font-medium mb-2">Key Features Across All Approaches:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span className="bg-blue-50 px-3 py-1 rounded-full">💫 Comments only for poor ratings</span>
            <span className="bg-green-50 px-3 py-1 rounded-full">📱 Mobile-optimized</span>
            <span className="bg-purple-50 px-3 py-1 rounded-full">⚡ Minimal clicks</span>
            <span className="bg-orange-50 px-3 py-1 rounded-full">🎯 Frustrated patient friendly</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Global Styles Component
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

// Main App
const App = () => {
  const [selectedApproach, setSelectedApproach] = useState<string | null>(null);

  const handleSelectApproach = (approach: string) => {
    setSelectedApproach(approach);
  };

  const handleBackToSelection = () => {
    setSelectedApproach(null);
  };

  return (
    <>
      <GlobalStyles />
      {!selectedApproach && (
        <ApproachSelector onSelectApproach={handleSelectApproach} />
      )}
      {selectedApproach === 'current' && (
        <CurrentDesign formData={realQuestionsData} onBack={handleBackToSelection} />
      )}
      {selectedApproach === 'accordion' && (
        <AccordionDesign formData={realQuestionsData} onBack={handleBackToSelection} />
      )}
      {selectedApproach === 'timeline' && (
        <TimelineDesign formData={realQuestionsData} onBack={handleBackToSelection} />
      )}
    </>
  );
};

export default App;