using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class UserEntity : BaseEntity<Guid>
    {


        [MaxLength(255), Column(Order = 2), Comment("ชื่อผู้ใช้")]
        public string? username { get; set; }

        [MaxLength(255), Column(Order = 3), Comment("รหัสผ่าน")]
        public string? passwordHash { get; set; }

        [MaxLength(100), Column(Order = 4), Comment("อีเมล")]
        public string? email { get; set; }

        [ForeignKey("masterPrefixId")]
        public MasterPrefixEntity? MasterPrefix_masterPrefixId { get; set; }

        [Column(Order = 5), Comment("คำนำหน้า")]
        public Guid? masterPrefixId { get; set; }

        [MaxLength(255), Column(Order = 6), Comment("ชื่อจริงผู้ใช้")]
        public string? firstname { get; set; }

        [MaxLength(255), Column(Order = 7), Comment("นามสกุลผู้ใช้")]
        public string? lastname { get; set; }

        [MaxLength(100), Column(Order = 8), Comment("เบอร์โทรศัพท์")]
        public string? telephoneNumber { get; set; }

        [ForeignKey("masterRoleId")]
        public MasterRoleEntity? MasterRole_masterRoleId { get; set; }

        [Column(Order = 9), Comment("กลุ่มผู้ใช้")]
        public Guid? masterRoleId { get; set; }

        [MaxLength(255), Column(Order = 10), Comment("หมายเหตุ")]
        public string? remark { get; set; }


        public List<SurveyEntity> Surveys { get; } = new();
        public List<TreatmentScheduleEntity> TreatmentSchedules { get; } = new();


    }
}
