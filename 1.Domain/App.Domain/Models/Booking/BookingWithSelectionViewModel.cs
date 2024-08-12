using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Domain
{
    public class BookingWithSelectionViewModel: BookingViewModel
    {
        public List<CustomerViewModel>? item_customerId { get; set; }
        public List<UserViewModel>? item_staffId { get; set; }

    }
}