using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Domain
{
    public class RoleHasPermissionWithSelectionViewModel: RoleHasPermissionViewModel
    {
        public List<MasterRoleViewModel>? item_masterRoleId { get; set; }
        public List<MasterPermissionViewModel>? item_masterPermissionId { get; set; }

    }
}