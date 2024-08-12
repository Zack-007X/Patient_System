using System.Collections.Generic;

namespace App.Domain
{
    public class BookingSearchModel
    {

        public Guid id { get; set; }

        public string? bookingNumber { get; set; }

        public DateTime? scheduledRepairDate { get; set; }

        public string? spacecraftName { get; set; }

        public string? registrationNumber { get; set; }

        public Guid? staffId { get; set; }

    }
}

