using System.Collections.Generic;

namespace App.Domain
{
    public class RepairInputModel
    {

        public Guid? id { get; set; }

        public Guid? bookingId { get; set; }

        public string? repairCode { get; set; }

        public Guid? technicianId { get; set; }

        public DateTime? startDate { get; set; }

        public DateTime? endDate { get; set; }

        public int? totalCostEA { get; set; }

        public string? repairNote { get; set; }

        public string? active_mode { get; set; }
    }
}

