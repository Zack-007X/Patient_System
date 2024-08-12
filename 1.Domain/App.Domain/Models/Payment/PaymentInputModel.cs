using System.Collections.Generic;

namespace App.Domain
{
    public class PaymentInputModel
    {

        public Guid? id { get; set; }

        public Guid? repairId { get; set; }

        public int? amountEA { get; set; }

        public string? documentCode { get; set; }

        public string? paymentMethod { get; set; }

        public string? exchangeItems { get; set; }

        public DateTime? paymentDate { get; set; }

        public string? paymentNote { get; set; }

        public string? active_mode { get; set; }
    }
}

