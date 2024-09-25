export interface IUserHasSpecial {

  id: string;
  masterRoleId?: string;
  specialSkill?: string;
  remark?: string;
  created?: Date;
  updated?: Date;
  isActive?: boolean;
}

export interface IUserHasSpecialForm {

  id: string;
  masterRoleId?: string;
  specialSkill?: string;
  remark?: string;
}

export interface IUserHasSpecialSearchForm {

  masterRoleId?: string;
  specialSkill?: string;
}