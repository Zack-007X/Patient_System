using System.Collections.Generic;

namespace App.Domain
{
    public class RoleHasPermissionViewModel : BaseViewModel<Guid>
    {

        public Guid? masterRoleId { get; set; }

        public Guid? masterPermissionId { get; set; }

        public uint? create { get; set; }

        public uint? read { get; set; }

        public uint? update { get; set; }

        public uint? delete { get; set; }

        public string? remark { get; set; }

        public string? masterRoleId_MasterRole_name { get; set; }
        public string? masterPermissionId_MasterPermission_name { get; set; }

        
        public int? counter { get { return 1; }  }
    }
}