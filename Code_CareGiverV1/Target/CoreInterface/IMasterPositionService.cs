using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface IMasterPositionService : IBaseService<Guid, MasterPositionInputModel, MasterPositionViewModel>
    {
        Task<MasterPositionViewModel?> InsertAsync(MasterPositionInputModel model, bool is_force_save);
        Task<MasterPositionViewModel?> UpdateAsync(Guid id, MasterPositionInputModel model, bool is_force_save);
     	Task<List<MasterPositionViewModel>> GetListBySearchAsync(MasterPositionSearchModel model);
		Task<int> UpdateMultipleAsync(List<MasterPositionInputModel> model, bool is_force_save);
        Task<MasterPositionWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<MasterPositionWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<MasterPositionEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(MasterPositionReportRequestModel model);



    }
}

