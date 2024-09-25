using System.Collections.Generic;

namespace App.Domain
{
    public class TreatmentScheduleInputModel
    {

        public Guid? id { get; set; }

        public Guid? surveyId { get; set; }

        public string? planingTopic { get; set; }

        public string? planingDetails { get; set; }

        public DateTime? startTreatmentDate { get; set; }

        public DateTime? endtartTreatmentDate { get; set; }

        public Guid? CaregiverId { get; set; }

        public string? TreatmentReportTopic { get; set; }

        public string? TreatmentReportDetails { get; set; }

        public string? remark { get; set; }

        public string? active_mode { get; set; }
    }
}

