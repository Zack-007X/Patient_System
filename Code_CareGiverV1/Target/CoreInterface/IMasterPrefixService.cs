using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface IMasterPrefixService : IBaseService<Guid, MasterPrefixInputModel, MasterPrefixViewModel>
    {
        Task<MasterPrefixViewModel?> InsertAsync(MasterPrefixInputModel model, bool is_force_save);
        Task<MasterPrefixViewModel?> UpdateAsync(Guid id, MasterPrefixInputModel model, bool is_force_save);
     	Task<List<MasterPrefixViewModel>> GetListBySearchAsync(MasterPrefixSearchModel model);
		Task<int> UpdateMultipleAsync(List<MasterPrefixInputModel> model, bool is_force_save);
        Task<MasterPrefixWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<MasterPrefixWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<MasterPrefixEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(MasterPrefixReportRequestModel model);



    }
}

