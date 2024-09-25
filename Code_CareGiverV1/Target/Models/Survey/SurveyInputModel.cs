using System.Collections.Generic;

namespace App.Domain
{
    public class SurveyInputModel
    {

        public Guid? id { get; set; }

        public Guid? patientId { get; set; }

        public Guid? doctorId { get; set; }

        public int? BloodPressure { get; set; }

        public int? OxygenLevel { get; set; }

        public int? HeartRate { get; set; }

        public DateTime? SurveyDate { get; set; }

        public string? SurveyDetail { get; set; }

        public string? remark { get; set; }

        public string? active_mode { get; set; }
    }
}

