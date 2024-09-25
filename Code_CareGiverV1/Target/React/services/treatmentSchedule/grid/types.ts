export interface ITreatmentSchedule {

  id: string;
  surveyId?: string;
  planingTopic?: string;
  planingDetails?: string;
  startTreatmentDate?: Date;
  endtartTreatmentDate?: Date;
  caregiverId?: string;
  treatmentReportTopic?: string;
  treatmentReportDetails?: string;
  remark?: string;
  created?: Date;
  updated?: Date;
  isActive?: boolean;
}

export interface ITreatmentScheduleForm {

  id: string;
  surveyId?: string;
  planingTopic?: string;
  planingDetails?: string;
  startTreatmentDate?: Date;
  endtartTreatmentDate?: Date;
  caregiverId?: string;
  treatmentReportTopic?: string;
  treatmentReportDetails?: string;
  remark?: string;
}

export interface ITreatmentScheduleSearchForm {

  surveyId?: string;
  planingTopic?: string;
  planingDetails?: string;
  caregiverId?: string;
}