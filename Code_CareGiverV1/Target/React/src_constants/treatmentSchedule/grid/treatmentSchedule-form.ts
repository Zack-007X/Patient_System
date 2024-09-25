import { ITreatmentScheduleForm, ITreatmentScheduleSearchForm } from '@services/treatmentSchedule/grid/types';

export const treatmentScheduleFormDefaultValue: ITreatmentScheduleForm = {

  id: '',
  surveyId: '',
  planingTopic: '',
  planingDetails: '',
  startTreatmentDate: null,
  endtartTreatmentDate: null,
  caregiverId: '',
  treatmentReportTopic: '',
  treatmentReportDetails: '',
  remark: '',
};

export const treatmentScheduleSearchFormDefaultValue: ITreatmentScheduleSearchForm = {

  surveyId: '',
  planingTopic: '',
  planingDetails: '',
  caregiverId: '',
};

