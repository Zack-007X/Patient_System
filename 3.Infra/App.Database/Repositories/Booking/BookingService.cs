using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;
using System.IO;
using System.Web;
using System.Net;
using Microsoft.Extensions.Options;
using System.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using App.Core;
using Microsoft.AspNetCore.Http;
using IdentityModel;
using TTSW.Utils;
using TTSW.Constant;

namespace App.Database
{
    public class BookingService : IBookingService
    {
        private IBaseRepository<BookingEntity, Guid> _repository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public BookingService(
            IBaseRepository<BookingEntity, Guid> repository, 
            IMapper mapper, 
            IConfiguration configuration,
            DataContext dataContext,
            IHttpContextAccessor httpContextAccessor
            )
        {
            _repository = repository;
            _mapper = mapper;
            _configuration = configuration;
            _dataContext = dataContext;
            _httpContextAccessor = httpContextAccessor;
        }

        #region Private Functions

        private string? UserId => _httpContextAccessor?.HttpContext?.User?.FindFirst(JwtClaimTypes.Id)?.Value;
        private string? Role => _httpContextAccessor?.HttpContext?.User?.FindFirst(JwtClaimTypes.Role)?.Value;

        private BookingEntity GetEntity(BookingInputModel model)
        {
            return _mapper.Map<BookingEntity>(model);
        }
        private BookingViewModel GetDto(BookingEntity entity)
        {
            return _mapper.Map<BookingViewModel>(entity);
        }
       
        #endregion

        #region Public Functions
        #region Query Functions

        public async Task<BookingViewModel?> GetAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return GetDto(entity);
        }

        public async Task<BookingEntity?> GetEntityAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return entity;
        }

        public async Task<BookingWithSelectionViewModel> GetWithSelectionAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);
            var i = _mapper.Map<BookingWithSelectionViewModel>(entity);
            i.item_customerId = await _dataContext.Customers.Select(x => _mapper.Map<CustomerViewModel>(x)).ToListAsync();
            i.item_staffId = await _dataContext.Users.Select(x => _mapper.Map<UserViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<BookingWithSelectionViewModel> GetBlankItemAsync()
        {
            var i = new BookingWithSelectionViewModel();
            i.item_customerId = await _dataContext.Customers.Select(x => _mapper.Map<CustomerViewModel>(x)).ToListAsync();
            i.item_staffId = await _dataContext.Users.Select(x => _mapper.Map<UserViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<List<BookingViewModel>> GetListBySearchAsync(BookingSearchModel model)
        {
            var data = await (
                from m_booking in _dataContext.Bookings

                join fk_customer2 in _dataContext.Customers on m_booking.customerId equals fk_customer2.id
                into customerResult2
                from fk_customerResult2 in customerResult2.DefaultIfEmpty()

                join fk_user18 in _dataContext.Users on m_booking.staffId equals fk_user18.id
                into userResult18
                from fk_userResult18 in userResult18.DefaultIfEmpty()


				where
                1 == 1 
                && (string.IsNullOrEmpty(model.bookingNumber) || m_booking.bookingNumber.Contains(model.bookingNumber))
                && (!model.scheduledRepairDate.HasValue || m_booking.scheduledRepairDate == model.scheduledRepairDate)
                && (string.IsNullOrEmpty(model.spacecraftName) || m_booking.spacecraftName.Contains(model.spacecraftName))
                && (string.IsNullOrEmpty(model.registrationNumber) || m_booking.registrationNumber.Contains(model.registrationNumber))
                && (!model.staffId.HasValue || m_booking.staffId == model.staffId)


                orderby m_booking.created descending
                select new BookingViewModel()
                {
                    id = m_booking.id,
                    bookingNumber = m_booking.bookingNumber,
                    customerId = m_booking.customerId,
                    bookingDate = m_booking.bookingDate,
                    scheduledRepairDate = m_booking.scheduledRepairDate,
                    estimatedCost = m_booking.estimatedCost,
                    isConfirm = m_booking.isConfirm,
                    spacecraftName = m_booking.spacecraftName,
                    model = m_booking.model,
                    manufacturer = m_booking.manufacturer,
                    yearOfManufacture = m_booking.yearOfManufacture,
                    registrationNumber = m_booking.registrationNumber,
                    capacity = m_booking.capacity,
                    spacecraftNotes = m_booking.spacecraftNotes,
                    bookingNotes = m_booking.bookingNotes,
                    spacecraftImage1 = m_booking.spacecraftImage1,
                    spacecraftImage1Display = m_booking.spacecraftImage1Display,
                    spacecraftImage2 = m_booking.spacecraftImage2,
                    spacecraftImage2Display = m_booking.spacecraftImage2Display,
                    spacecraftImage3 = m_booking.spacecraftImage3,
                    spacecraftImage3Display = m_booking.spacecraftImage3Display,
                    staffId = m_booking.staffId,

                    customerId_Customer_name = fk_customerResult2.name,
                    staffId_User_nickname = fk_userResult18.nickname,

                    isActive = m_booking.isActive,
                    created = m_booking.created,
                    updated = m_booking.updated
                }
            ).Take(1000).ToListAsync();

            return data;
        }

        #endregion        

        #region Manipulation Functions



        public async Task<BookingViewModel?> InsertAsync(BookingInputModel model, bool is_force_save)
        {
            var entity = GetEntity(model);
            entity.id = Guid.NewGuid();

            if (!string.IsNullOrEmpty(model.spacecraftImage1))
            {
                //Move file from temp to physical
                string spacecraftImage1FileName = FileUtil.MoveTempUploadFileToActualPath(
                    model.spacecraftImage1, FilePathConstant.DirType.FilesTestUpload, entity.id);
                entity.spacecraftImage1 = spacecraftImage1FileName;
            }            if (!string.IsNullOrEmpty(model.spacecraftImage2))
            {
                //Move file from temp to physical
                string spacecraftImage2FileName = FileUtil.MoveTempUploadFileToActualPath(
                    model.spacecraftImage2, FilePathConstant.DirType.FilesTestUpload, entity.id);
                entity.spacecraftImage2 = spacecraftImage2FileName;
            }            if (!string.IsNullOrEmpty(model.spacecraftImage3))
            {
                //Move file from temp to physical
                string spacecraftImage3FileName = FileUtil.MoveTempUploadFileToActualPath(
                    model.spacecraftImage3, FilePathConstant.DirType.FilesTestUpload, entity.id);
                entity.spacecraftImage3 = spacecraftImage3FileName;
            }
            
            if (is_force_save)
            {
                var inserted = await _repository.InsertAsync(entity);
                return await GetAsync(inserted.id);
            }
            else
            {
                await _repository.InsertWithoutCommitAsync(entity);
                return _mapper.Map<BookingViewModel>(entity);
            }
        }

        public async Task<BookingViewModel?> UpdateAsync(Guid id, BookingInputModel model, bool is_force_save)
        {
            var existingEntity = await _repository.GetAsync(id);
            if (existingEntity != null)
            {
                existingEntity.bookingNumber = model.bookingNumber;
                existingEntity.customerId = model.customerId;
                existingEntity.bookingDate = model.bookingDate;
                existingEntity.scheduledRepairDate = model.scheduledRepairDate;
                existingEntity.estimatedCost = model.estimatedCost;
                existingEntity.isConfirm = model.isConfirm;
                existingEntity.spacecraftName = model.spacecraftName;
                existingEntity.model = model.model;
                existingEntity.manufacturer = model.manufacturer;
                existingEntity.yearOfManufacture = model.yearOfManufacture;
                existingEntity.registrationNumber = model.registrationNumber;
                existingEntity.capacity = model.capacity;
                existingEntity.spacecraftNotes = model.spacecraftNotes;
                existingEntity.bookingNotes = model.bookingNotes;
                if (!string.IsNullOrEmpty(model.spacecraftImage1))
                {
					if (model.spacecraftImage1.StartsWith("Uploads"))
					{
						var spacecraftImage1FileName = FileUtil.MoveTempUploadFileToActualPath(
                        model.spacecraftImage1, FilePathConstant.DirType.FilesTestUpload, existingEntity.id, existingEntity.spacecraftImage1);
						existingEntity.spacecraftImage1 = spacecraftImage1FileName;
					}
					else
					{
						existingEntity.spacecraftImage1 = model.spacecraftImage1;
					}                    
                }
				else
				{
					existingEntity.spacecraftImage1 = null;
				}

                if (!string.IsNullOrEmpty(model.spacecraftImage2))
                {
					if (model.spacecraftImage2.StartsWith("Uploads"))
					{
						var spacecraftImage2FileName = FileUtil.MoveTempUploadFileToActualPath(
                        model.spacecraftImage2, FilePathConstant.DirType.FilesTestUpload, existingEntity.id, existingEntity.spacecraftImage2);
						existingEntity.spacecraftImage2 = spacecraftImage2FileName;
					}
					else
					{
						existingEntity.spacecraftImage2 = model.spacecraftImage2;
					}                    
                }
				else
				{
					existingEntity.spacecraftImage2 = null;
				}

                if (!string.IsNullOrEmpty(model.spacecraftImage3))
                {
					if (model.spacecraftImage3.StartsWith("Uploads"))
					{
						var spacecraftImage3FileName = FileUtil.MoveTempUploadFileToActualPath(
                        model.spacecraftImage3, FilePathConstant.DirType.FilesTestUpload, existingEntity.id, existingEntity.spacecraftImage3);
						existingEntity.spacecraftImage3 = spacecraftImage3FileName;
					}
					else
					{
						existingEntity.spacecraftImage3 = model.spacecraftImage3;
					}                    
                }
				else
				{
					existingEntity.spacecraftImage3 = null;
				}

                existingEntity.staffId = model.staffId;


                if (is_force_save)
                {
                    var updated = await _repository.UpdateAsync(id, existingEntity);
                    return await GetAsync(updated.id);
                }
                else
                {
                    await _repository.UpdateWithoutCommitAsync(id, existingEntity);
                    return _mapper.Map<BookingViewModel>(existingEntity);
                }
            }
            else
            throw new Exception("No data to update");
        }

		public async Task<int> UpdateMultipleAsync(List<BookingInputModel> model, bool is_force_save)
        {
            foreach(var i in model)
            {
                if (i.active_mode == "1" && i.id.HasValue) // update
                {                    
                    var existingEntity = await _repository.GetAsync(i.id.Value);
                    if (existingEntity != null)
                    {
                existingEntity.bookingNumber = i.bookingNumber;
                existingEntity.customerId = i.customerId;
                existingEntity.bookingDate = i.bookingDate;
                existingEntity.scheduledRepairDate = i.scheduledRepairDate;
                existingEntity.estimatedCost = i.estimatedCost;
                existingEntity.isConfirm = i.isConfirm;
                existingEntity.spacecraftName = i.spacecraftName;
                existingEntity.model = i.model;
                existingEntity.manufacturer = i.manufacturer;
                existingEntity.yearOfManufacture = i.yearOfManufacture;
                existingEntity.registrationNumber = i.registrationNumber;
                existingEntity.capacity = i.capacity;
                existingEntity.spacecraftNotes = i.spacecraftNotes;
                existingEntity.bookingNotes = i.bookingNotes;
                if (!string.IsNullOrEmpty(i.spacecraftImage1))
                {
					if (i.spacecraftImage1.StartsWith("Uploads"))
					{
						var spacecraftImage1FileName = FileUtil.MoveTempUploadFileToActualPath(
                        i.spacecraftImage1, FilePathConstant.DirType.FilesTestUpload, existingEntity.id, existingEntity.spacecraftImage1);
						existingEntity.spacecraftImage1 = spacecraftImage1FileName;
					}
					else
					{
						existingEntity.spacecraftImage1 = i.spacecraftImage1;
					}                    
                }
				else
				{
					existingEntity.spacecraftImage1 = null;
				}

                if (!string.IsNullOrEmpty(i.spacecraftImage2))
                {
					if (i.spacecraftImage2.StartsWith("Uploads"))
					{
						var spacecraftImage2FileName = FileUtil.MoveTempUploadFileToActualPath(
                        i.spacecraftImage2, FilePathConstant.DirType.FilesTestUpload, existingEntity.id, existingEntity.spacecraftImage2);
						existingEntity.spacecraftImage2 = spacecraftImage2FileName;
					}
					else
					{
						existingEntity.spacecraftImage2 = i.spacecraftImage2;
					}                    
                }
				else
				{
					existingEntity.spacecraftImage2 = null;
				}

                if (!string.IsNullOrEmpty(i.spacecraftImage3))
                {
					if (i.spacecraftImage3.StartsWith("Uploads"))
					{
						var spacecraftImage3FileName = FileUtil.MoveTempUploadFileToActualPath(
                        i.spacecraftImage3, FilePathConstant.DirType.FilesTestUpload, existingEntity.id, existingEntity.spacecraftImage3);
						existingEntity.spacecraftImage3 = spacecraftImage3FileName;
					}
					else
					{
						existingEntity.spacecraftImage3 = i.spacecraftImage3;
					}                    
                }
				else
				{
					existingEntity.spacecraftImage3 = null;
				}

                existingEntity.staffId = i.staffId;


                        await _repository.UpdateWithoutCommitAsync(i.id.Value, existingEntity);
                    }
                }
                else if (i.active_mode == "1" && !i.id.HasValue) // add
                {
                    var entity = GetEntity(i);
                    entity.id = Guid.NewGuid();
                    await _repository.InsertWithoutCommitAsync(entity);
                }
                else if (i.active_mode == "0" && i.id.HasValue) // remove
                {                    
                    await _repository.DeleteWithoutCommitAsync(i.id.Value);
                }
                else if (i.active_mode == "0" && !i.id.HasValue)
                {
                    // nothing to do
                }                
            }
            if (is_force_save)
            {
                await _dataContext.SaveChangesAsync();
            } 

            return model.Count;
        }

        public async Task DeleteAsync(Guid id)
        {
            await _repository.DeleteAsync(id);

            return;
        }

		public async Task RefreshAutoFieldOfAllDataAsync()
        {
            var all_items = _dataContext.Bookings;
            foreach (var item in all_items)
            {
                
            }
            await _dataContext.SaveChangesAsync();
        }

        #endregion

        #region Match Item

        #endregion

        #endregion

        public async Task<byte[]> GetReportStreamAsync(BookingReportRequestModel model)
        {
            using (var httpclient = new HttpClient())
            {
                string mainurl = MyHelper.GetConfig(_configuration, "JasperReportServer:MainURL");
                string reportsite = MyHelper.GetConfig(_configuration, "JasperReportServer:reportsite");
                string username = MyHelper.GetConfig(_configuration, "JasperReportServer:username");
                string password = MyHelper.GetConfig(_configuration, "JasperReportServer:password");

                string url = $"{mainurl}{reportsite}/xxใส่ชื่อรายงานตรงนี้xx.{model.filetype}?{MyHelper.GetParameterForJasperReport(model)}&j_username={username}&j_password={password}";

                if (model.filetype == "xlsx")
                {
                    url += "&ignorePagination=true";
                }

                using (var data = await httpclient.GetAsync(url))
                using (var content = data.Content)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        var stream = await content.ReadAsStreamAsync();
                        stream.CopyTo(memoryStream);
                        return memoryStream.ToArray();
                    }
                }
                
            }
        }

    }
}