using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class PatientEntity : BaseEntity<Guid>
    {


        [ForeignKey("masterPrefixId")]
        public MasterPrefixEntity? MasterPrefix_masterPrefixId { get; set; }

        [Column(Order = 2), Comment("คำนำหน้า")]
        public Guid? masterPrefixId { get; set; }

        [MaxLength(255), Column(Order = 3), Comment("ชื่อจริงผู้ใช้")]
        public string? firstname { get; set; }

        [MaxLength(255), Column(Order = 4), Comment("นามสกุลผู้ใช้")]
        public string? lastname { get; set; }

        [Column(Order = 5), Comment("เบอร์โทรศัพท์")]
        public DateTime? brithDate { get; set; }

        [ForeignKey("masterGenderId")]
        public MasterGenderEntity? MasterGender_masterGenderId { get; set; }

        [Column(Order = 6), Comment("เพศ")]
        public Guid? masterGenderId { get; set; }

        [Column(Order = 7), Comment("อายุ")]
        public int? age { get; set; }

        [Column(Order = 8), Comment("ส่วนสูง")]
        public float? height { get; set; }

        [Column(Order = 9), Comment("น้ำหนัก")]
        public float? weight { get; set; }

        [MaxLength(10), Column(Order = 10), Comment("เบอร์โทรศัพท์ผู้ป่วย")]
        public string? telephoneNumber { get; set; }

        [MaxLength(50), Column(Order = 11), Comment("ชื่่อญาติที่ติดต่อได้")]
        public string? relativeName { get; set; }

        [MaxLength(10), Column(Order = 12), Comment("เบอร์โทรศัพท์ญาติที่ติดต่อได้")]
        public string? relativeContract { get; set; }

        [MaxLength(255), Column(Order = 13), Comment("หมายเหตุ")]
        public string? remark { get; set; }


        public List<SurveyEntity> Surveys { get; } = new();


    }
}
