using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface IDrugHistoryService : IBaseService<Guid, DrugHistoryInputModel, DrugHistoryViewModel>
    {
        Task<DrugHistoryViewModel?> InsertAsync(DrugHistoryInputModel model, bool is_force_save);
        Task<DrugHistoryViewModel?> UpdateAsync(Guid id, DrugHistoryInputModel model, bool is_force_save);
     	Task<List<DrugHistoryViewModel>> GetListBySearchAsync(DrugHistorySearchModel model);
		Task<int> UpdateMultipleAsync(List<DrugHistoryInputModel> model, bool is_force_save);
        Task<DrugHistoryWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<DrugHistoryWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<DrugHistoryEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(DrugHistoryReportRequestModel model);



    }
}

