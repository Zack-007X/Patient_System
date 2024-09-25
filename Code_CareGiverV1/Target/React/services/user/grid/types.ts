export interface IUser {

  id: string;
  username?: string;
  passwordHash?: string;
  email?: string;
  masterPrefixId?: string;
  firstname?: string;
  lastname?: string;
  telephoneNumber?: string;
  masterRoleId?: string;
  remark?: string;
  created?: Date;
  updated?: Date;
  isActive?: boolean;
}

export interface IUserForm {

  id: string;
  username?: string;
  passwordHash?: string;
  email?: string;
  masterPrefixId?: string;
  firstname?: string;
  lastname?: string;
  telephoneNumber?: string;
  masterRoleId?: string;
  remark?: string;
}

export interface IUserSearchForm {

  username?: string;
  firstname?: string;
  lastname?: string;
}