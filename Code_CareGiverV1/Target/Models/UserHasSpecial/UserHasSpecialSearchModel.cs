using System.Collections.Generic;

namespace App.Domain
{
    public class UserHasSpecialSearchModel
    {

        public Guid id { get; set; }

        public Guid? masterRoleId { get; set; }

        public string? specialSkill { get; set; }

    }
}

