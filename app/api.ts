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

// API functions for future integration
export const apiService = {
  // Fetch patient data by ID
  async getPatientData(patientId: string): Promise<PatientInfo> {
    // TODO: Replace with actual API call
    // return await fetch(`/api/patients/${patientId}`).then(res => res.json());
    return samplePatient;
  },

  // Fetch survey questions by form type
  async getSurveyQuestions(formType: string): Promise<FormData> {
    // TODO: Replace with actual API call
    // return await fetch(`/api/surveys/${formType}`).then(res => res.json());
    return realQuestionsData;
  },

  // Submit survey responses
  async submitSurveyResponses(data: {
    patient: any;
    formType: string;
    answers: Record<string, any>;
  }): Promise<{ success: boolean; message: string }> {
    // TODO: Replace with actual API call
    // return await fetch('/api/surveys/submit', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // }).then(res => res.json());
    
    console.log('Survey submitted:', data);
    return { success: true, message: 'Survey submitted successfully' };
  },

  // Get survey analytics/statistics
  async getSurveyAnalytics(filters?: {
    startDate?: string;
    endDate?: string;
    formType?: string;
    location?: string;
  }): Promise<any> {
    // TODO: Replace with actual API call
    // return await fetch('/api/surveys/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(filters)
    // }).then(res => res.json());
    
    return {
      totalResponses: 0,
      averageRatings: {},
      completionRate: 0
    };
  }
};