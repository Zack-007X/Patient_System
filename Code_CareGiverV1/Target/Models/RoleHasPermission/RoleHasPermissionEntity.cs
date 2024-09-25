using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class RoleHasPermissionEntity : BaseEntity<Guid>
    {


        [ForeignKey("masterRoleId")]
        public MasterRoleEntity? MasterRole_masterRoleId { get; set; }

        [Column(Order = 2), Comment("รหัสกลุ่มผู้ใช้")]
        public Guid? masterRoleId { get; set; }

        [ForeignKey("masterPermissionId")]
        public MasterPermissionEntity? MasterPermission_masterPermissionId { get; set; }

        [Column(Order = 3), Comment("รหัสสิทธิ์การใช้งาน")]
        public Guid? masterPermissionId { get; set; }

        [Column(Order = 4), Comment("สิทธิ์การเพิ่ม")]
        public uint? create { get; set; }

        [Column(Order = 5), Comment("สิทธิ์การอ่าน")]
        public uint? read { get; set; }

        [Column(Order = 6), Comment("สิทธิ์การแก้ไข")]
        public uint? update { get; set; }

        [Column(Order = 7), Comment("สิทธิ์การลบ")]
        public uint? delete { get; set; }

        [MaxLength(255), Column(Order = 8), Comment("หมายเหตุ")]
        public string? remark { get; set; }




    }
}
