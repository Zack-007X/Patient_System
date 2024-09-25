import { Dispatch, SetStateAction } from 'react';

import { IMasterPositionForm } from '@services/masterPosition/grid/types';

export interface IMasterPositionModalFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleModal: () => void;
  isOpen: boolean;
  masterPositionFormData?: IMasterPositionForm;
}
