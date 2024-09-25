using System.Collections.Generic;

namespace App.Domain
{
    public class DrugHistoryInputModel
    {

        public Guid? id { get; set; }

        public Guid? masterDrugID { get; set; }

        public Guid? treatmentScheduleId { get; set; }

        public int? amount { get; set; }

        public string? remark { get; set; }

        public string? active_mode { get; set; }
    }
}

