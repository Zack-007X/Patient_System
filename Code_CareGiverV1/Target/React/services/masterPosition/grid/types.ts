export interface IMasterPosition {

  id: string;
  code?: string;
  name?: string;
  remark?: string;
  created?: Date;
  updated?: Date;
  isActive?: boolean;
}

export interface IMasterPositionForm {

  id: string;
  code?: string;
  name?: string;
  remark?: string;
}

export interface IMasterPositionSearchForm {

  code?: string;
  name?: string;
}