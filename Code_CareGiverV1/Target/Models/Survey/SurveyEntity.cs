using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class SurveyEntity : BaseEntity<Guid>
    {


        [ForeignKey("patientId")]
        public PatientEntity? Patient_patientId { get; set; }

        [Column(Order = 2), Comment("ผู้ป่วย")]
        public Guid? patientId { get; set; }

        [ForeignKey("doctorId")]
        public UserEntity? User_doctorId { get; set; }

        [Column(Order = 3), Comment("หมอที่ทำการตรวจ")]
        public Guid? doctorId { get; set; }

        [Column(Order = 4), Comment("ความดันโลหิต")]
        public int? BloodPressure { get; set; }

        [Column(Order = 5), Comment("ระดับเลือด")]
        public int? OxygenLevel { get; set; }

        [Column(Order = 6), Comment("อัตราการเต้นของหัวใจ")]
        public int? HeartRate { get; set; }

        [Column(Order = 7), Comment("วันที่ทำการตรวจ")]
        public DateTime? SurveyDate { get; set; }

        [MaxLength(1000), Column(Order = 8), Comment("รายละเอียดการตรวจ")]
        public string? SurveyDetail { get; set; }

        [MaxLength(255), Column(Order = 9), Comment("หมายเหตุ")]
        public string? remark { get; set; }


        public List<TreatmentScheduleEntity> TreatmentSchedules { get; } = new();


    }
}
