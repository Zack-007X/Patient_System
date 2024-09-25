using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Domain
{
    public class TreatmentScheduleWithSelectionViewModel: TreatmentScheduleViewModel
    {
        public List<SurveyViewModel>? item_surveyId { get; set; }
        public List<UserViewModel>? item_CaregiverId { get; set; }

    }
}