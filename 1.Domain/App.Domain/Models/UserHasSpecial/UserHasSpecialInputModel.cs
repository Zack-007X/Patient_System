using System.Collections.Generic;

namespace App.Domain
{
    public class UserHasSpecialInputModel
    {

        public Guid? id { get; set; }

        public Guid? masterRoleId { get; set; }

        public string? specialSkill { get; set; }

        public string? remark { get; set; }

        public string? active_mode { get; set; }
    }
}

