using System.Collections.Generic;

namespace App.Domain
{
    public class UserInputModel
    {

        public Guid? id { get; set; }

        public string? username { get; set; }

        public string? passwordHash { get; set; }

        public string? email { get; set; }

        public Guid? masterPrefixId { get; set; }

        public string? firstname { get; set; }

        public string? lastname { get; set; }

        public string? telephoneNumber { get; set; }

        public Guid? masterRoleId { get; set; }

        public string? remark { get; set; }

        public string? active_mode { get; set; }
    }
}

