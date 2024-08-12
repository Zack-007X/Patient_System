using System.Collections.Generic;

namespace App.Domain
{
    public class BookingInputModel
    {

        public Guid? id { get; set; }

        public string? bookingNumber { get; set; }

        public Guid? customerId { get; set; }

        public DateTime? bookingDate { get; set; }

        public DateTime? scheduledRepairDate { get; set; }

        public int? estimatedCost { get; set; }

        public bool? isConfirm { get; set; }

        public string? spacecraftName { get; set; }

        public string? model { get; set; }

        public string? manufacturer { get; set; }

        public string? yearOfManufacture { get; set; }

        public string? registrationNumber { get; set; }

        public int? capacity { get; set; }

        public string? spacecraftNotes { get; set; }

        public string? bookingNotes { get; set; }

        public string? spacecraftImage1 { get; set; }

        public string? spacecraftImage2 { get; set; }

        public string? spacecraftImage3 { get; set; }

        public Guid? staffId { get; set; }

        public string? active_mode { get; set; }
    }
}

