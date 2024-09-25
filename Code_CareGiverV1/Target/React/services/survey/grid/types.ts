export interface ISurvey {

  id: string;
  patientId?: string;
  doctorId?: string;
  bloodPressure?: number;
  oxygenLevel?: number;
  heartRate?: number;
  surveyDate?: Date;
  surveyDetail?: string;
  remark?: string;
  created?: Date;
  updated?: Date;
  isActive?: boolean;
}

export interface ISurveyForm {

  id: string;
  patientId?: string;
  doctorId?: string;
  bloodPressure?: number;
  oxygenLevel?: number;
  heartRate?: number;
  surveyDate?: Date;
  surveyDetail?: string;
  remark?: string;
}

export interface ISurveySearchForm {

  patientId?: string;
  doctorId?: string;
}