import { IDrugHistoryForm, IDrugHistorySearchForm } from '@services/drugHistory/grid/types';

export const drugHistoryFormDefaultValue: IDrugHistoryForm = {

  id: '',
  masterDrugID: '',
  treatmentScheduleId: '',
  amount: 0,
  remark: '',
};

export const drugHistorySearchFormDefaultValue: IDrugHistorySearchForm = {

  masterDrugID: '',
  treatmentScheduleId: '',
};

