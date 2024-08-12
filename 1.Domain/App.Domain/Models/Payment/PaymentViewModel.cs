using System.Collections.Generic;

namespace App.Domain
{
    public class PaymentViewModel : BaseViewModel<Guid>
    {

        public Guid? repairId { get; set; }

        public int? amountEA { get; set; }

        public string? documentCode { get; set; }

        public string? paymentMethod { get; set; }

        public string? exchangeItems { get; set; }

        public DateTime? paymentDate { get; set; }

        public string txt_paymentDate { get { return Common.GetDateStringForReport(this.paymentDate); } }

        public string? paymentNote { get; set; }

        public string? repairId_Repair_repairCode { get; set; }

        
        public int? counter { get { return 1; }  }
    }
}