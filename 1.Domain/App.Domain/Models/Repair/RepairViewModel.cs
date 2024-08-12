using System.Collections.Generic;

namespace App.Domain
{
    public class RepairViewModel : BaseViewModel<Guid>
    {

        public Guid? bookingId { get; set; }

        public string? repairCode { get; set; }

        public Guid? technicianId { get; set; }

        public DateTime? startDate { get; set; }

        public string txt_startDate { get { return Common.GetDateStringForReport(this.startDate); } }

        public DateTime? endDate { get; set; }

        public string txt_endDate { get { return Common.GetDateStringForReport(this.endDate); } }

        public int? totalCostEA { get; set; }

        public string? repairNote { get; set; }

        public string? bookingId_Booking_bookingNumber { get; set; }
        public string? technicianId_User_nickname { get; set; }

        
        public int? counter { get { return 1; }  }
    }
}