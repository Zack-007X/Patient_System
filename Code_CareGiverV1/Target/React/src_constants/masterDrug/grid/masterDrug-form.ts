import { IMasterDrugForm, IMasterDrugSearchForm } from '@services/masterDrug/grid/types';

export const masterDrugFormDefaultValue: IMasterDrugForm = {

  id: '',
  code: '',
  name: '',
  dosage: '',
  remark: '',
  details: '',
};

export const masterDrugSearchFormDefaultValue: IMasterDrugSearchForm = {

  code: '',
  name: '',
};

