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
    public class RepairService : IRepairService
    {
        private IBaseRepository<RepairEntity, Guid> _repository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public RepairService(
            IBaseRepository<RepairEntity, Guid> repository, 
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

        private RepairEntity GetEntity(RepairInputModel model)
        {
            return _mapper.Map<RepairEntity>(model);
        }
        private RepairViewModel GetDto(RepairEntity entity)
        {
            return _mapper.Map<RepairViewModel>(entity);
        }
       
        #endregion

        #region Public Functions
        #region Query Functions

        public async Task<RepairViewModel?> GetAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return GetDto(entity);
        }

        public async Task<RepairEntity?> GetEntityAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return entity;
        }

        public async Task<RepairWithSelectionViewModel> GetWithSelectionAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);
            var i = _mapper.Map<RepairWithSelectionViewModel>(entity);
            i.item_bookingId = await _dataContext.Bookings.Select(x => _mapper.Map<BookingViewModel>(x)).ToListAsync();
            i.item_technicianId = await _dataContext.Users.Select(x => _mapper.Map<UserViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<RepairWithSelectionViewModel> GetBlankItemAsync()
        {
            var i = new RepairWithSelectionViewModel();
            i.item_bookingId = await _dataContext.Bookings.Select(x => _mapper.Map<BookingViewModel>(x)).ToListAsync();
            i.item_technicianId = await _dataContext.Users.Select(x => _mapper.Map<UserViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<List<RepairViewModel>> GetListBySearchAsync(RepairSearchModel model)
        {
            var data = await (
                from m_repair in _dataContext.Repairs

                join fk_booking1 in _dataContext.Bookings on m_repair.bookingId equals fk_booking1.id
                into bookingResult1
                from fk_bookingResult1 in bookingResult1.DefaultIfEmpty()

                join fk_user3 in _dataContext.Users on m_repair.technicianId equals fk_user3.id
                into userResult3
                from fk_userResult3 in userResult3.DefaultIfEmpty()


				where
                1 == 1 
                && (!model.bookingId.HasValue || m_repair.bookingId == model.bookingId)
                && (string.IsNullOrEmpty(model.repairCode) || m_repair.repairCode.Contains(model.repairCode))
                && (!model.technicianId.HasValue || m_repair.technicianId == model.technicianId)
                && (!model.startDate.HasValue || m_repair.startDate == model.startDate)
                && (!model.endDate.HasValue || m_repair.endDate == model.endDate)


                orderby m_repair.created descending
                select new RepairViewModel()
                {
                    id = m_repair.id,
                    bookingId = m_repair.bookingId,
                    repairCode = m_repair.repairCode,
                    technicianId = m_repair.technicianId,
                    startDate = m_repair.startDate,
                    endDate = m_repair.endDate,
                    totalCostEA = m_repair.totalCostEA,
                    repairNote = m_repair.repairNote,

                    bookingId_Booking_bookingNumber = fk_bookingResult1.bookingNumber,
                    technicianId_User_nickname = fk_userResult3.nickname,

                    isActive = m_repair.isActive,
                    created = m_repair.created,
                    updated = m_repair.updated
                }
            ).Take(1000).ToListAsync();

            return data;
        }

        #endregion        

        #region Manipulation Functions



        public async Task<RepairViewModel?> InsertAsync(RepairInputModel model, bool is_force_save)
        {
            var entity = GetEntity(model);
            entity.id = Guid.NewGuid();


            
            if (is_force_save)
            {
                var inserted = await _repository.InsertAsync(entity);
                return await GetAsync(inserted.id);
            }
            else
            {
                await _repository.InsertWithoutCommitAsync(entity);
                return _mapper.Map<RepairViewModel>(entity);
            }
        }

        public async Task<RepairViewModel?> UpdateAsync(Guid id, RepairInputModel model, bool is_force_save)
        {
            var existingEntity = await _repository.GetAsync(id);
            if (existingEntity != null)
            {
                existingEntity.bookingId = model.bookingId;
                existingEntity.repairCode = model.repairCode;
                existingEntity.technicianId = model.technicianId;
                existingEntity.startDate = model.startDate;
                existingEntity.endDate = model.endDate;
                existingEntity.totalCostEA = model.totalCostEA;
                existingEntity.repairNote = model.repairNote;


                if (is_force_save)
                {
                    var updated = await _repository.UpdateAsync(id, existingEntity);
                    return await GetAsync(updated.id);
                }
                else
                {
                    await _repository.UpdateWithoutCommitAsync(id, existingEntity);
                    return _mapper.Map<RepairViewModel>(existingEntity);
                }
            }
            else
            throw new Exception("No data to update");
        }

		public async Task<int> UpdateMultipleAsync(List<RepairInputModel> model, bool is_force_save)
        {
            foreach(var i in model)
            {
                if (i.active_mode == "1" && i.id.HasValue) // update
                {                    
                    var existingEntity = await _repository.GetAsync(i.id.Value);
                    if (existingEntity != null)
                    {
                existingEntity.bookingId = i.bookingId;
                existingEntity.repairCode = i.repairCode;
                existingEntity.technicianId = i.technicianId;
                existingEntity.startDate = i.startDate;
                existingEntity.endDate = i.endDate;
                existingEntity.totalCostEA = i.totalCostEA;
                existingEntity.repairNote = i.repairNote;


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
            var all_items = _dataContext.Repairs;
            foreach (var item in all_items)
            {
                
            }
            await _dataContext.SaveChangesAsync();
        }

        #endregion

        #region Match Item

        #endregion

        #endregion

        public async Task<byte[]> GetReportStreamAsync(RepairReportRequestModel model)
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