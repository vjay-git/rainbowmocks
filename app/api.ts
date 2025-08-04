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

// Sample patient data for PICU
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

// PICU Survey questions data
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
      id: 'doctor_care',
      title: 'PICU Doctor Care',
      icon: '👨‍⚕️',
      color: 'primary',
      questions: [
        {
          id: 'q1',
          type: 'rating',
          text: 'Are the PICU doctors caring and friendly?',
          required: true,
          options: ['Not at all', 'Somewhat', 'Moderately', 'Very much', 'Extremely']
        },
        {
          id: 'q2',
          type: 'rating',
          text: 'Did the doctors explain your child\'s condition, treatment, and investigations clearly?',
          required: true,
          options: ['Not at all', 'Somewhat', 'Mostly', 'Completely']
        },
        {
          id: 'q3',
          type: 'rating',
          text: 'Were you informed about the daily plan of management by the doctors?',
          required: true,
          options: ['Never', 'Rarely', 'Sometimes', 'Usually', 'Always']
        },
        {
          id: 'q4',
          type: 'rating',
          text: 'Were your doubts regarding your child\'s condition clarified?',
          required: true,
          options: ['Not at all', 'Somewhat', 'Mostly', 'Completely']
        }
      ]
    },
    {
      id: 'nursing_care',
      title: 'PICU Nursing Care',
      icon: '👩‍⚕️',
      color: 'secondary',
      questions: [
        {
          id: 'q5',
          type: 'rating',
          text: 'Were the nursing staff in the PICU easily accessible and available?',
          required: true,
          options: ['Never', 'Rarely', 'Sometimes', 'Usually', 'Always']
        },
        {
          id: 'q6',
          type: 'rating',
          text: 'Were the nursing staff prompt in responding to your child\'s needs?',
          required: true,
          options: ['Never', 'Rarely', 'Sometimes', 'Usually', 'Always']
        },
        {
          id: 'q7',
          type: 'rating',
          text: 'Are the PICU nurses caring and compassionate?',
          required: true,
          options: ['Not at all', 'Somewhat', 'Moderately', 'Very much', 'Extremely']
        },
        {
          id: 'q8',
          type: 'rating',
          text: 'Did PICU nurses listen to your opinion about your child\'s needs?',
          required: true,
          options: ['Never', 'Rarely', 'Sometimes', 'Usually', 'Always']
        }
      ]
    },
    {
      id: 'family_support',
      title: 'Family & Communication',
      icon: '👨‍👩‍👧‍👦',
      color: 'accent',
      questions: [
        {
          id: 'q9',
          type: 'rating',
          text: 'Did doctors and nurses work together as a team in the PICU?',
          required: true,
          options: ['Never', 'Rarely', 'Sometimes', 'Usually', 'Always']
        },
        {
          id: 'q10',
          type: 'rating',
          text: 'Was support and encouragement given to your family during your child\'s stay?',
          required: true,
          options: ['Not at all', 'Somewhat', 'Moderately', 'Very much', 'Extremely']
        },
        {
          id: 'q11',
          type: 'rating',
          text: 'Did doctors/nurses speak to your child even if he/she could not respond?',
          required: true,
          options: ['Never', 'Rarely', 'Sometimes', 'Usually', 'Always']
        },
        {
          id: 'q12',
          type: 'rating',
          text: 'Did healthcare providers spend enough time at your child\'s bedside?',
          required: true,
          options: ['Not enough', 'Somewhat adequate', 'Adequate', 'More than adequate', 'Excellent']
        }
      ]
    },
    {
      id: 'facilities_overall',
      title: 'PICU Facilities & Overall Experience',
      icon: '🏥',
      color: 'quaternary',
      questions: [
        {
          id: 'q13',
          type: 'rating',
          text: 'Was your child\'s privacy and confidentiality respected during the PICU stay?',
          required: true,
          options: ['Never', 'Rarely', 'Sometimes', 'Usually', 'Always']
        },
        {
          id: 'q14',
          type: 'rating',
          text: 'Was the room quiet enough for your child to rest?',
          required: true,
          options: ['Not at all', 'Somewhat', 'Moderately', 'Very much', 'Completely']
        },
        {
          id: 'q15',
          type: 'rating',
          text: 'Was your child\'s bed clean and neat?',
          required: true,
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
        },
        {
          id: 'q16',
          type: 'rating',
          text: 'Are you satisfied with the care given in the PICU?',
          required: true,
          options: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied']
        },
        {
          id: 'q17',
          type: 'rating',
          text: 'Would you recommend this PICU to a friend/family who needs hospitalization?',
          required: true,
          options: ['Definitely Not', 'Probably Not', 'Maybe', 'Probably Yes', 'Definitely Yes']
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