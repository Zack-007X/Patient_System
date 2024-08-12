using System.Collections.Generic;

namespace App.Domain
{
    public class RepairSearchModel
    {

        public Guid id { get; set; }

        public Guid? bookingId { get; set; }

        public string? repairCode { get; set; }

        public Guid? technicianId { get; set; }

        public DateTime? startDate { get; set; }

        public DateTime? endDate { get; set; }

    }
}

