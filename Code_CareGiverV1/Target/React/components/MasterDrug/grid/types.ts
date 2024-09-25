import { Dispatch, SetStateAction } from 'react';

import { IMasterDrugForm } from '@services/masterDrug/grid/types';

export interface IMasterDrugModalFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleModal: () => void;
  isOpen: boolean;
  masterDrugFormData?: IMasterDrugForm;
}
