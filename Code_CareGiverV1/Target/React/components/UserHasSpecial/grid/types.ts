import { Dispatch, SetStateAction } from 'react';

import { IUserHasSpecialForm } from '@services/userHasSpecial/grid/types';

export interface IUserHasSpecialModalFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleModal: () => void;
  isOpen: boolean;
  userHasSpecialFormData?: IUserHasSpecialForm;
}
