import { Dispatch, SetStateAction } from 'react';

import { IUserForm } from '@services/user/grid/types';

export interface IUserModalFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleModal: () => void;
  isOpen: boolean;
  userFormData?: IUserForm;
}
