export interface IMasterRole {

  id: string;
  code?: string;
  name?: string;
  remark?: string;
  created?: Date;
  updated?: Date;
  isActive?: boolean;
}

export interface IMasterRoleForm {

  id: string;
  code?: string;
  name?: string;
  remark?: string;
}

export interface IMasterRoleSearchForm {

  code?: string;
  name?: string;
}