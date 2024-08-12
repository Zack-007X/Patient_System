using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Domain
{
    public class RepairWithSelectionViewModel: RepairViewModel
    {
        public List<BookingViewModel>? item_bookingId { get; set; }
        public List<UserViewModel>? item_technicianId { get; set; }

    }
}