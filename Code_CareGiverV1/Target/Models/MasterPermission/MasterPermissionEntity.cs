using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class MasterPermissionEntity : BaseEntity<Guid>
    {


        [MaxLength(15), Column(Order = 2), Comment("เลขสิทธิ์การใช้งาน")]
        public string? code { get; set; }

        [MaxLength(255), Column(Order = 3), Comment("ชื่อสิทธิ์การใช้งาน")]
        public string? name { get; set; }

        [MaxLength(255), Column(Order = 4), Comment("หมายเหตุ")]
        public string? remark { get; set; }


        public List<RoleHasPermissionEntity> RoleHasPermissions { get; } = new();


    }
}
