export interface IPatient {

  id: string;
  masterPrefixId?: string;
  firstname?: string;
  lastname?: string;
  brithDate?: Date;
  masterGenderId?: string;
  age?: number;
  height?: number;
  weight?: number;
  telephoneNumber?: string;
  relativeName?: string;
  relativeContract?: string;
  remark?: string;
  created?: Date;
  updated?: Date;
  isActive?: boolean;
}

export interface IPatientForm {

  id: string;
  masterPrefixId?: string;
  firstname?: string;
  lastname?: string;
  brithDate?: Date;
  masterGenderId?: string;
  age?: number;
  height?: number;
  weight?: number;
  telephoneNumber?: string;
  relativeName?: string;
  relativeContract?: string;
  remark?: string;
}

export interface IPatientSearchForm {

  firstname?: string;
  lastname?: string;
}