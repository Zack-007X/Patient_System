using System.Collections.Generic;

namespace App.Domain
{
    public class RoleHasPermissionSearchModel
    {

        public Guid id { get; set; }

        public Guid? masterRoleId { get; set; }

        public Guid? masterPermissionId { get; set; }

    }
}

