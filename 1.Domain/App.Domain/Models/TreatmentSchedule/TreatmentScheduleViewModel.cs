using System.Collections.Generic;

namespace App.Domain
{
    public class TreatmentScheduleViewModel : BaseViewModel<Guid>
    {

        public Guid? surveyId { get; set; }

        public string? planingTopic { get; set; }

        public string? planingDetails { get; set; }

        public DateTime? startTreatmentDate { get; set; }

        public string txt_startTreatmentDate { get { return Common.GetDateStringForReport(this.startTreatmentDate); } }

        public DateTime? endtartTreatmentDate { get; set; }

        public string txt_endtartTreatmentDate { get { return Common.GetDateStringForReport(this.endtartTreatmentDate); } }

        public Guid? CaregiverId { get; set; }

        public string? TreatmentReportTopic { get; set; }

        public string? TreatmentReportDetails { get; set; }

        public string? remark { get; set; }

        public Guid? surveyId_Survey_patientId { get; set; }
        public string? CaregiverId_User_username { get; set; }

        
        public int? counter { get { return 1; }  }
    }
}