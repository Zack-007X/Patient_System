using System.Collections.Generic;

namespace App.Domain
{
    public class TreatmentScheduleSearchModel
    {

        public Guid id { get; set; }

        public Guid? surveyId { get; set; }

        public string? planingTopic { get; set; }

        public string? planingDetails { get; set; }

        public Guid? CaregiverId { get; set; }

    }
}

