import { Dispatch, SetStateAction } from 'react';

import { IMasterGenderForm } from '@services/masterGender/grid/types';

export interface IMasterGenderModalFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleModal: () => void;
  isOpen: boolean;
  masterGenderFormData?: IMasterGenderForm;
}
