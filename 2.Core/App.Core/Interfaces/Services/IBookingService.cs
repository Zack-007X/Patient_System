using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface IBookingService : IBaseService<Guid, BookingInputModel, BookingViewModel>
    {
        Task<BookingViewModel?> InsertAsync(BookingInputModel model, bool is_force_save);
        Task<BookingViewModel?> UpdateAsync(Guid id, BookingInputModel model, bool is_force_save);
     	Task<List<BookingViewModel>> GetListBySearchAsync(BookingSearchModel model);
		Task<int> UpdateMultipleAsync(List<BookingInputModel> model, bool is_force_save);
        Task<BookingWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<BookingWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<BookingEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(BookingReportRequestModel model);



    }
}

