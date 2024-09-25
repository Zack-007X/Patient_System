using System.Collections.Generic;

namespace App.Domain
{
    public class SurveyViewModel : BaseViewModel<Guid>
    {

        public Guid? patientId { get; set; }

        public Guid? doctorId { get; set; }

        public int? BloodPressure { get; set; }

        public int? OxygenLevel { get; set; }

        public int? HeartRate { get; set; }

        public DateTime? SurveyDate { get; set; }

        public string txt_SurveyDate { get { return Common.GetDateStringForReport(this.SurveyDate); } }

        public string? SurveyDetail { get; set; }

        public string? remark { get; set; }

        public string? patientId_Patient_firstname { get; set; }
        public string? doctorId_User_username { get; set; }

        
        public int? counter { get { return 1; }  }
    }
}