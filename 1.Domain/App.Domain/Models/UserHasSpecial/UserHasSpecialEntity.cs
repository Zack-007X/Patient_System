using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class UserHasSpecialEntity : BaseEntity<Guid>
    {


        [ForeignKey("masterRoleId")]
        public MasterRoleEntity? MasterRole_masterRoleId { get; set; }

        [Column(Order = 2), Comment("รหัสกลุ่มผู้ใช้")]
        public Guid? masterRoleId { get; set; }

        [Column(Order = 3), Comment("ความเชี่ยวชาญ")]
        public string? specialSkill { get; set; }

        [MaxLength(255), Column(Order = 4), Comment("หมายเหตุ")]
        public string? remark { get; set; }




    }
}
