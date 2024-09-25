using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class MasterRoleEntity : BaseEntity<Guid>
    {


        [MaxLength(15), Column(Order = 2), Comment("เลขกลุ่มผู้ใช้")]
        public string? code { get; set; }

        [MaxLength(255), Column(Order = 3), Comment("ชื่อกลุ่มผู้ใช้")]
        public string? name { get; set; }

        [MaxLength(255), Column(Order = 4), Comment("หมายเหตุ")]
        public string? remark { get; set; }


        public List<RoleHasPermissionEntity> RoleHasPermissions { get; } = new();
        public List<UserEntity> Users { get; } = new();
        public List<UserHasSpecialEntity> UserHasSpecials { get; } = new();


    }
}
