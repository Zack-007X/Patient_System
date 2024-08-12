using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface IPaymentService : IBaseService<Guid, PaymentInputModel, PaymentViewModel>
    {
        Task<PaymentViewModel?> InsertAsync(PaymentInputModel model, bool is_force_save);
        Task<PaymentViewModel?> UpdateAsync(Guid id, PaymentInputModel model, bool is_force_save);
     	Task<List<PaymentViewModel>> GetListBySearchAsync(PaymentSearchModel model);
		Task<int> UpdateMultipleAsync(List<PaymentInputModel> model, bool is_force_save);
        Task<PaymentWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<PaymentWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<PaymentEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(PaymentReportRequestModel model);



    }
}

