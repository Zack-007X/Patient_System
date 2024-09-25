using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Domain
{
    public class DrugHistoryWithSelectionViewModel: DrugHistoryViewModel
    {
        public List<MasterDrugViewModel>? item_masterDrugID { get; set; }
        public List<TreatmentScheduleViewModel>? item_treatmentScheduleId { get; set; }

    }
}