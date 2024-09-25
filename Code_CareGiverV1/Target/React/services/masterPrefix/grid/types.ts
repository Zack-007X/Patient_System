export interface IMasterPrefix {

  id: string;
  code?: string;
  name?: string;
  remark?: string;
  created?: Date;
  updated?: Date;
  isActive?: boolean;
}

export interface IMasterPrefixForm {

  id: string;
  code?: string;
  name?: string;
  remark?: string;
}

export interface IMasterPrefixSearchForm {

  name?: string;
}