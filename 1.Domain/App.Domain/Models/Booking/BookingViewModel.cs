using System.Collections.Generic;

namespace App.Domain
{
    public class BookingViewModel : BaseViewModel<Guid>
    {

        public string? bookingNumber { get; set; }

        public Guid? customerId { get; set; }

        public DateTime? bookingDate { get; set; }

        public string txt_bookingDate { get { return Common.GetDateStringForReport(this.bookingDate); } }

        public DateTime? scheduledRepairDate { get; set; }

        public string txt_scheduledRepairDate { get { return Common.GetDateStringForReport(this.scheduledRepairDate); } }

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
        public string? spacecraftImage1Display { get; set; }

        public string txt_spacecraftImage1
        {
            get
            {
                return (string.IsNullOrEmpty(spacecraftImage1) ? "" :
                    $"<a href='../{spacecraftImage1Display}' target='_blank'>{spacecraftImage1}</a>");
            }
        }		

        public string? spacecraftImage2 { get; set; }
        public string? spacecraftImage2Display { get; set; }

        public string txt_spacecraftImage2
        {
            get
            {
                return (string.IsNullOrEmpty(spacecraftImage2) ? "" :
                    $"<a href='../{spacecraftImage2Display}' target='_blank'>{spacecraftImage2}</a>");
            }
        }		

        public string? spacecraftImage3 { get; set; }
        public string? spacecraftImage3Display { get; set; }

        public string txt_spacecraftImage3
        {
            get
            {
                return (string.IsNullOrEmpty(spacecraftImage3) ? "" :
                    $"<a href='../{spacecraftImage3Display}' target='_blank'>{spacecraftImage3}</a>");
            }
        }		

        public Guid? staffId { get; set; }

        public string? customerId_Customer_name { get; set; }
        public string? staffId_User_nickname { get; set; }

        
        public int? counter { get { return 1; }  }
    }
}