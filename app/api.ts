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
  unitname: "Rainbow Children's Hospital - Banjara Hills",
  entrytype: "Inpatient",
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

// Survey questions data (IP Questions only)
export const realQuestionsData: FormData = {
  formType: 'inpatient',
  title: 'Patient Experience Survey',
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
      id: 'doctor_care',
      title: 'Doctor Care',
      icon: '👨‍⚕️',
      color: 'primary',
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
      id: 'nursing_care',
      title: 'Nursing Care',
      icon: '👩‍⚕️',
      color: 'secondary',
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
          text: 'Did the nursing staff respond to your needs promptly?',
          required: true,
          options: ['Never', 'Rarely', 'Sometimes', 'Usually', 'Always']
        },
        {
          id: 'q16',
          type: 'rating',
          text: 'How professional and respectful was the nursing staff?',
          required: true,
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
        }
      ]
    },
    {
      id: 'facilities',
      title: 'Hospital Facilities',
      icon: '🏥',
      color: 'accent',
      questions: [
        {
          id: 'q13',
          type: 'rating',
          text: 'How clean were your room and washroom during your stay?',
          required: true,
          options: ['Very Unclean', 'Unclean', 'Clean', 'Very Clean', 'Spotless']
        },
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
      id: 'other_services',
      title: 'Other Services',
      icon: '🔧',
      color: 'quaternary',
      questions: [
        {
          id: 'q1',
          type: 'rating',
          text: 'How would you rate the helpfulness and efficiency of the admission desk staff?',
          required: true,
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
        },
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