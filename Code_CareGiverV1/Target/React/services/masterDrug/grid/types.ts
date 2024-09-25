export interface IMasterDrug {

  id: string;
  code?: string;
  name?: string;
  dosage?: string;
  remark?: string;
  details?: string;
  created?: Date;
  updated?: Date;
  isActive?: boolean;
}

export interface IMasterDrugForm {

  id: string;
  code?: string;
  name?: string;
  dosage?: string;
  remark?: string;
  details?: string;
}

export interface IMasterDrugSearchForm {

  code?: string;
  name?: string;
}