// Types for better type safety
export interface PatientInfo {
  name: string;
  unitname: string;
  entrytype: string;
  doctorname: string;
  location: string;
}

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

export interface ColorTheme {
  gradient: string;
  light: string;
  bg: string;
  border: string;
  text: string;
}

export interface ColorThemes {
  primary: ColorTheme;
  secondary: ColorTheme;
  accent: ColorTheme;
  quaternary: ColorTheme;
}

// Sample patient data
export const samplePatient: PatientInfo = {
  name: "BANDELA SIREESHA",
  unitname: "Rainbow Children's Hospital - PICU Banjara Hills",
  entrytype: "PICU",
  doctorname: "DR.BHARGAVI REDDY K",
  location: "Banjara Hills"
};

// Color themes configuration
export const colorThemes: ColorThemes = {
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

// Rating labels
export const ratingLabels = {
  1: 'Poor',
  2: 'Fair', 
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent'
};

// Survey questions data
export const realQuestionsData: FormData = {
  formType: 'picu',
  title: 'PICU Patient Experience Survey',
  subtitle: samplePatient.unitname,
  patientInfo: {
    name: samplePatient.name,
    entryType: samplePatient.entrytype,
    unit: samplePatient.unitname,
    doctor: samplePatient.doctorname,
    location: samplePatient.location
  },
  sections: [
    {
      id: 'billing',
      title: 'Billing & Admission',
      icon: '💳',
      color: 'primary',
      questions: [
        {
          id: 'q1',
          type: 'rating',
          text: 'How would you rate the helpfulness and efficiency of the admission desk staff?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        },
        {
          id: 'q1_comment',
          type: 'comment',
          text: 'Any specific feedback about the admission process?',
          required: false,
          placeholder: 'Share your experience with the admission process...',
          maxLength: 300
        }
      ]
    },
    {
      id: 'discharge',
      title: 'Discharge Process',
      icon: '🚪',
      color: 'secondary',
      questions: [
        {
          id: 'q2',
          type: 'rating',
          text: 'How clear and informative was the financial counselling you received?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        },
        {
          id: 'q3',
          type: 'rating',
          text: 'Did the doctor or nurse explain your discharge summary clearly?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        },
        {
          id: 'q4',
          type: 'rating',
          text: 'Was the discharge process completed in a timely manner?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        }
      ]
    },
    {
      id: 'doctor',
      title: 'Doctor Care',
      icon: '👨‍⚕️',
      color: 'accent',
      questions: [
        {
          id: 'q5',
          type: 'rating',
          text: 'How attentive and caring was the doctor towards you?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        },
        {
          id: 'q6',
          type: 'rating',
          text: 'Did the doctor clearly explain the reason for your admission?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        },
        {
          id: 'q7',
          type: 'rating',
          text: 'Did the doctor provide timely updates about your treatment progress?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        },
        {
          id: 'q8',
          type: 'rating',
          text: 'Did the doctor manage your pain in a timely manner?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        }
      ]
    },
    {
      id: 'nursing',
      title: 'Nursing Care',
      icon: '👩‍⚕️',
      color: 'quaternary',
      questions: [
        {
          id: 'q14',
          type: 'rating',
          text: 'How attentive, prompt, and caring was the nursing staff?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        },
        {
          id: 'q15',
          type: 'rating',
          text: 'Did you receive your medication on time?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        },
        {
          id: 'q16',
          type: 'rating',
          text: 'Was your privacy and confidentiality respected during your stay?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        }
      ]
    },
    {
      id: 'food_services',
      title: 'Food & Services',
      icon: '🍽️',
      color: 'primary',
      questions: [
        {
          id: 'q10',
          type: 'rating',
          text: 'How was the quality of the food served to you?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        },
        {
          id: 'q11',
          type: 'rating',
          text: 'Was your food served on time?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        },
        {
          id: 'q13',
          type: 'rating',
          text: 'How clean were your room and washroom during your stay?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        }
      ]
    },
    {
      id: 'other_services',
      title: 'Medical Services',
      icon: '🔬',
      color: 'secondary',
      questions: [
        {
          id: 'q17',
          type: 'rating',
          text: 'How reasonable was your waiting time to see the doctor in the OPD?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        },
        {
          id: 'q18',
          type: 'rating',
          text: 'How would you rate the radiology services you received?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        },
        {
          id: 'q19',
          type: 'rating',
          text: 'How would you rate the laboratory services you used?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        },
        {
          id: 'q21',
          type: 'rating',
          text: 'Was the prescribed medicine available at the pharmacy?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        }
      ]
    },
    {
      id: 'overall_experience',
      title: 'Overall Experience',
      icon: '⭐',
      color: 'accent',
      questions: [
        {
          id: 'q22',
          type: 'rating',
          text: 'How would you rate your overall hospital experience?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        },
        {
          id: 'q23',
          type: 'rating',
          text: 'How efficient and helpful was the security staff?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        },
        {
          id: 'recommend',
          type: 'rating',
          text: 'How likely are you to recommend this hospital to others?',
          required: true,
          options: ['1', '2', '3', '4', '5']
        },
        {
          id: 'feedback',
          type: 'comment',
          text: 'Any additional feedback or suggestions for improvement?',
          required: false,
          placeholder: 'Share your thoughts to help us improve our services...',
          maxLength: 500
        }
      ]
    }
  ]
};

// API Service for future integration
export const apiService = {
  // Submit survey responses
  async submitSurveyResponses(data: {
    patient: any;
    formType: string;
    answers: Record<string, any>;
  }): Promise<{ success: boolean; message: string; surveyId?: string }> {
    // TODO: Replace with actual API call
    console.log('Survey submitted:', data);
    
    // Simulate API call
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