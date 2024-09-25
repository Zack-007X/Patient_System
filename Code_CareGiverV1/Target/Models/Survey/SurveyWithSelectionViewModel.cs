using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Domain
{
    public class SurveyWithSelectionViewModel: SurveyViewModel
    {
        public List<PatientViewModel>? item_patientId { get; set; }
        public List<UserViewModel>? item_doctorId { get; set; }

    }
}