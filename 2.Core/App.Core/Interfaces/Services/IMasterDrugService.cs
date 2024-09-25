using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface IMasterDrugService : IBaseService<Guid, MasterDrugInputModel, MasterDrugViewModel>
    {
        Task<MasterDrugViewModel?> InsertAsync(MasterDrugInputModel model, bool is_force_save);
        Task<MasterDrugViewModel?> UpdateAsync(Guid id, MasterDrugInputModel model, bool is_force_save);
     	Task<List<MasterDrugViewModel>> GetListBySearchAsync(MasterDrugSearchModel model);
		Task<int> UpdateMultipleAsync(List<MasterDrugInputModel> model, bool is_force_save);
        Task<MasterDrugWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<MasterDrugWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<MasterDrugEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(MasterDrugReportRequestModel model);



    }
}

