using System.Collections.Generic;

namespace App.Domain
{
    public class DrugHistorySearchModel
    {

        public Guid id { get; set; }

        public Guid? masterDrugID { get; set; }

        public Guid? treatmentScheduleId { get; set; }

    }
}

