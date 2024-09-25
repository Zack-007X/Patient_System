export interface IDrugHistory {

  id: string;
  masterDrugID?: string;
  treatmentScheduleId?: string;
  amount?: number;
  remark?: string;
  created?: Date;
  updated?: Date;
  isActive?: boolean;
}

export interface IDrugHistoryForm {

  id: string;
  masterDrugID?: string;
  treatmentScheduleId?: string;
  amount?: number;
  remark?: string;
}

export interface IDrugHistorySearchForm {

  masterDrugID?: string;
  treatmentScheduleId?: string;
}