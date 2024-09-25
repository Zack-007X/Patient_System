using System.Collections.Generic;

namespace App.Domain
{
    public class UserHasSpecialViewModel : BaseViewModel<Guid>
    {

        public Guid? masterRoleId { get; set; }

        public string? specialSkill { get; set; }

        public string? remark { get; set; }

        public string? masterRoleId_MasterRole_name { get; set; }

        
        public int? counter { get { return 1; }  }
    }
}