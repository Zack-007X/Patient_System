using System.Collections.Generic;

namespace App.Domain
{
    public class RoleHasPermissionInputModel
    {

        public Guid? id { get; set; }

        public Guid? masterRoleId { get; set; }

        public Guid? masterPermissionId { get; set; }

        public uint? create { get; set; }

        public uint? read { get; set; }

        public uint? update { get; set; }

        public uint? delete { get; set; }

        public string? remark { get; set; }

        public string? active_mode { get; set; }
    }
}

