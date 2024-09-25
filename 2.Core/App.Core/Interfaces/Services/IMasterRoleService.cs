using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface IMasterRoleService : IBaseService<Guid, MasterRoleInputModel, MasterRoleViewModel>
    {
        Task<MasterRoleViewModel?> InsertAsync(MasterRoleInputModel model, bool is_force_save);
        Task<MasterRoleViewModel?> UpdateAsync(Guid id, MasterRoleInputModel model, bool is_force_save);
     	Task<List<MasterRoleViewModel>> GetListBySearchAsync(MasterRoleSearchModel model);
		Task<int> UpdateMultipleAsync(List<MasterRoleInputModel> model, bool is_force_save);
        Task<MasterRoleWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<MasterRoleWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<MasterRoleEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(MasterRoleReportRequestModel model);



    }
}

