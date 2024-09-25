import { IPatientForm, IPatientSearchForm } from '@services/patient/grid/types';

export const patientFormDefaultValue: IPatientForm = {

  id: '',
  masterPrefixId: '',
  firstname: '',
  lastname: '',
  brithDate: null,
  masterGenderId: '',
  age: 0,
  height: 0,
  weight: 0,
  telephoneNumber: '',
  relativeName: '',
  relativeContract: '',
  remark: '',
};

export const patientSearchFormDefaultValue: IPatientSearchForm = {

  firstname: '',
  lastname: '',
};

