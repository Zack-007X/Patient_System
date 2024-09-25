using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface ITreatmentScheduleService : IBaseService<Guid, TreatmentScheduleInputModel, TreatmentScheduleViewModel>
    {
        Task<TreatmentScheduleViewModel?> InsertAsync(TreatmentScheduleInputModel model, bool is_force_save);
        Task<TreatmentScheduleViewModel?> UpdateAsync(Guid id, TreatmentScheduleInputModel model, bool is_force_save);
     	Task<List<TreatmentScheduleViewModel>> GetListBySearchAsync(TreatmentScheduleSearchModel model);
		Task<int> UpdateMultipleAsync(List<TreatmentScheduleInputModel> model, bool is_force_save);
        Task<TreatmentScheduleWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<TreatmentScheduleWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<TreatmentScheduleEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(TreatmentScheduleReportRequestModel model);



    }
}

