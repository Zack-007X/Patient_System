using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface ISurveyService : IBaseService<Guid, SurveyInputModel, SurveyViewModel>
    {
        Task<SurveyViewModel?> InsertAsync(SurveyInputModel model, bool is_force_save);
        Task<SurveyViewModel?> UpdateAsync(Guid id, SurveyInputModel model, bool is_force_save);
     	Task<List<SurveyViewModel>> GetListBySearchAsync(SurveySearchModel model);
		Task<int> UpdateMultipleAsync(List<SurveyInputModel> model, bool is_force_save);
        Task<SurveyWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<SurveyWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<SurveyEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(SurveyReportRequestModel model);



    }
}

