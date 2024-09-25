using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Domain
{
    public class UserWithSelectionViewModel: UserViewModel
    {
        public List<MasterPrefixViewModel>? item_masterPrefixId { get; set; }
        public List<MasterRoleViewModel>? item_masterRoleId { get; set; }

    }
}