export interface IMasterGender {

  id: string;
  code?: string;
  name?: string;
  remark?: string;
  created?: Date;
  updated?: Date;
  isActive?: boolean;
}

export interface IMasterGenderForm {

  id: string;
  code?: string;
  name?: string;
  remark?: string;
}

export interface IMasterGenderSearchForm {

  code?: string;
  name?: string;
}