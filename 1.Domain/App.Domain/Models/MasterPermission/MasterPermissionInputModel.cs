using System.Collections.Generic;

namespace App.Domain
{
    public class MasterPermissionInputModel
    {

        public Guid? id { get; set; }

        public string? code { get; set; }

        public string? name { get; set; }

        public string? remark { get; set; }

        public string? active_mode { get; set; }
    }
}

