using System.Collections.Generic;

namespace App.Domain
{
    public class UserViewModel : BaseViewModel<Guid>
    {

        public string? username { get; set; }

        public string? passwordHash { get; set; }

        public string? email { get; set; }

        public Guid? masterPrefixId { get; set; }

        public string? firstname { get; set; }

        public string? lastname { get; set; }

        public string? telephoneNumber { get; set; }

        public Guid? masterRoleId { get; set; }

        public string? remark { get; set; }

        public string? masterPrefixId_MasterPrefix_name { get; set; }
        public string? masterRoleId_MasterRole_name { get; set; }

        
        public int? counter { get { return 1; }  }
    }
}