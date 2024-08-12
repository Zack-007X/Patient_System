using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Domain
{
    public class PaymentWithSelectionViewModel: PaymentViewModel
    {
        public List<RepairViewModel>? item_repairId { get; set; }

    }
}