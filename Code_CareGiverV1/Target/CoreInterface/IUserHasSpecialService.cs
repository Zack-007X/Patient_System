using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface IUserHasSpecialService : IBaseService<Guid, UserHasSpecialInputModel, UserHasSpecialViewModel>
    {
        Task<UserHasSpecialViewModel?> InsertAsync(UserHasSpecialInputModel model, bool is_force_save);
        Task<UserHasSpecialViewModel?> UpdateAsync(Guid id, UserHasSpecialInputModel model, bool is_force_save);
     	Task<List<UserHasSpecialViewModel>> GetListBySearchAsync(UserHasSpecialSearchModel model);
		Task<int> UpdateMultipleAsync(List<UserHasSpecialInputModel> model, bool is_force_save);
        Task<UserHasSpecialWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<UserHasSpecialWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<UserHasSpecialEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(UserHasSpecialReportRequestModel model);



    }
}

