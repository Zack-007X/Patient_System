using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface IPatientService : IBaseService<Guid, PatientInputModel, PatientViewModel>
    {
        Task<PatientViewModel?> InsertAsync(PatientInputModel model, bool is_force_save);
        Task<PatientViewModel?> UpdateAsync(Guid id, PatientInputModel model, bool is_force_save);
     	Task<List<PatientViewModel>> GetListBySearchAsync(PatientSearchModel model);
		Task<int> UpdateMultipleAsync(List<PatientInputModel> model, bool is_force_save);
        Task<PatientWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<PatientWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<PatientEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(PatientReportRequestModel model);



    }
}

