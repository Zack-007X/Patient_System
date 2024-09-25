using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Domain
{
    public class UserHasSpecialWithSelectionViewModel: UserHasSpecialViewModel
    {
        public List<MasterRoleViewModel>? item_masterRoleId { get; set; }

    }
}