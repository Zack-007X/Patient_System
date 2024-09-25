using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface IMasterGenderService : IBaseService<Guid, MasterGenderInputModel, MasterGenderViewModel>
    {
        Task<MasterGenderViewModel?> InsertAsync(MasterGenderInputModel model, bool is_force_save);
        Task<MasterGenderViewModel?> UpdateAsync(Guid id, MasterGenderInputModel model, bool is_force_save);
     	Task<List<MasterGenderViewModel>> GetListBySearchAsync(MasterGenderSearchModel model);
		Task<int> UpdateMultipleAsync(List<MasterGenderInputModel> model, bool is_force_save);
        Task<MasterGenderWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<MasterGenderWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<MasterGenderEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(MasterGenderReportRequestModel model);



    }
}

