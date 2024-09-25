using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class TreatmentScheduleEntity : BaseEntity<Guid>
    {


        [ForeignKey("surveyId")]
        public SurveyEntity? Survey_surveyId { get; set; }

        [Column(Order = 2), Comment("รายงานการตรวจ")]
        public Guid? surveyId { get; set; }

        [MaxLength(255), Column(Order = 3), Comment("แผน Treatment")]
        public string? planingTopic { get; set; }

        [MaxLength(255), Column(Order = 4), Comment("สถานะ Treatment")]
        public string? planingDetails { get; set; }

        [Column(Order = 5), Comment("วันเริ่มต้น Treatment")]
        public DateTime? startTreatmentDate { get; set; }

        [Column(Order = 6), Comment("วันสุดท้าย Treatment")]
        public DateTime? endtartTreatmentDate { get; set; }

        [ForeignKey("CaregiverId")]
        public UserEntity? User_CaregiverId { get; set; }

        [Column(Order = 7), Comment("ผู้ดูแล")]
        public Guid? CaregiverId { get; set; }

        [MaxLength(255), Column(Order = 8), Comment("ผลการ Treatment")]
        public string? TreatmentReportTopic { get; set; }

        [MaxLength(1000), Column(Order = 9), Comment("รายละเอียด ผลการ Treatment")]
        public string? TreatmentReportDetails { get; set; }

        [MaxLength(255), Column(Order = 10), Comment("หมายเหตุ")]
        public string? remark { get; set; }


        public List<DrugHistoryEntity> DrugHistorys { get; } = new();


    }
}
