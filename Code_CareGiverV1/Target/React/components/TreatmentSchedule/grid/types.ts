import { Dispatch, SetStateAction } from 'react';

import { ITreatmentScheduleForm } from '@services/treatmentSchedule/grid/types';

export interface ITreatmentScheduleModalFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleModal: () => void;
  isOpen: boolean;
  treatmentScheduleFormData?: ITreatmentScheduleForm;
}
