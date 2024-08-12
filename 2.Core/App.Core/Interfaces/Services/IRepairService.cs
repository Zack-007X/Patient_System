using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface IRepairService : IBaseService<Guid, RepairInputModel, RepairViewModel>
    {
        Task<RepairViewModel?> InsertAsync(RepairInputModel model, bool is_force_save);
        Task<RepairViewModel?> UpdateAsync(Guid id, RepairInputModel model, bool is_force_save);
     	Task<List<RepairViewModel>> GetListBySearchAsync(RepairSearchModel model);
		Task<int> UpdateMultipleAsync(List<RepairInputModel> model, bool is_force_save);
        Task<RepairWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<RepairWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<RepairEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(RepairReportRequestModel model);



    }
}

