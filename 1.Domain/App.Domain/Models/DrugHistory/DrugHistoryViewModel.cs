using System.Collections.Generic;

namespace App.Domain
{
    public class DrugHistoryViewModel : BaseViewModel<Guid>
    {

        public Guid? masterDrugID { get; set; }

        public Guid? treatmentScheduleId { get; set; }

        public int? amount { get; set; }

        public string? remark { get; set; }

        public string? masterDrugID_MasterDrug_name { get; set; }
        public string? treatmentScheduleId_TreatmentSchedule_planingTopic { get; set; }

        
        public int? counter { get { return 1; }  }
    }
}