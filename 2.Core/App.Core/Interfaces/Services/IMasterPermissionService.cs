using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface IMasterPermissionService : IBaseService<Guid, MasterPermissionInputModel, MasterPermissionViewModel>
    {
        Task<MasterPermissionViewModel?> InsertAsync(MasterPermissionInputModel model, bool is_force_save);
        Task<MasterPermissionViewModel?> UpdateAsync(Guid id, MasterPermissionInputModel model, bool is_force_save);
     	Task<List<MasterPermissionViewModel>> GetListBySearchAsync(MasterPermissionSearchModel model);
		Task<int> UpdateMultipleAsync(List<MasterPermissionInputModel> model, bool is_force_save);
        Task<MasterPermissionWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<MasterPermissionWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<MasterPermissionEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(MasterPermissionReportRequestModel model);



    }
}

