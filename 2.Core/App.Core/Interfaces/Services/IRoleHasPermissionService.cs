using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface IRoleHasPermissionService : IBaseService<Guid, RoleHasPermissionInputModel, RoleHasPermissionViewModel>
    {
        Task<RoleHasPermissionViewModel?> InsertAsync(RoleHasPermissionInputModel model, bool is_force_save);
        Task<RoleHasPermissionViewModel?> UpdateAsync(Guid id, RoleHasPermissionInputModel model, bool is_force_save);
     	Task<List<RoleHasPermissionViewModel>> GetListBySearchAsync(RoleHasPermissionSearchModel model);
		Task<int> UpdateMultipleAsync(List<RoleHasPermissionInputModel> model, bool is_force_save);
        Task<RoleHasPermissionWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<RoleHasPermissionWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<RoleHasPermissionEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(RoleHasPermissionReportRequestModel model);



    }
}

