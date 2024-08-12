using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface ICustomerService : IBaseService<Guid, CustomerInputModel, CustomerViewModel>
    {
        Task<CustomerViewModel?> InsertAsync(CustomerInputModel model, bool is_force_save);
        Task<CustomerViewModel?> UpdateAsync(Guid id, CustomerInputModel model, bool is_force_save);
     	Task<List<CustomerViewModel>> GetListBySearchAsync(CustomerSearchModel model);
		Task<int> UpdateMultipleAsync(List<CustomerInputModel> model, bool is_force_save);
        Task<CustomerWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<CustomerWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<CustomerEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(CustomerReportRequestModel model);



    }
}

