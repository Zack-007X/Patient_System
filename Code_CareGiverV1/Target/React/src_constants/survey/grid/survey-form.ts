import { ISurveyForm, ISurveySearchForm } from '@services/survey/grid/types';

export const surveyFormDefaultValue: ISurveyForm = {

  id: '',
  patientId: '',
  doctorId: '',
  bloodPressure: 0,
  oxygenLevel: 0,
  heartRate: 0,
  surveyDate: null,
  surveyDetail: '',
  remark: '',
};

export const surveySearchFormDefaultValue: ISurveySearchForm = {

  patientId: '',
  doctorId: '',
};

