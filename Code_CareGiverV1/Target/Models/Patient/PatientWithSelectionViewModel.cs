using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Domain
{
    public class PatientWithSelectionViewModel: PatientViewModel
    {
        public List<MasterPrefixViewModel>? item_masterPrefixId { get; set; }
        public List<MasterGenderViewModel>? item_masterGenderId { get; set; }

    }
}