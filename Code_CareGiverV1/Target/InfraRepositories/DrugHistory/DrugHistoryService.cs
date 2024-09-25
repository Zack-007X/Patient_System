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
    public class DrugHistoryService : IDrugHistoryService
    {
        private IBaseRepository<DrugHistoryEntity, Guid> _repository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DrugHistoryService(
            IBaseRepository<DrugHistoryEntity, Guid> repository, 
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

        private DrugHistoryEntity GetEntity(DrugHistoryInputModel model)
        {
            return _mapper.Map<DrugHistoryEntity>(model);
        }
        private DrugHistoryViewModel GetDto(DrugHistoryEntity entity)
        {
            return _mapper.Map<DrugHistoryViewModel>(entity);
        }
       
        #endregion

        #region Public Functions
        #region Query Functions

        public async Task<DrugHistoryViewModel?> GetAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return GetDto(entity);
        }

        public async Task<DrugHistoryEntity?> GetEntityAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return entity;
        }

        public async Task<DrugHistoryWithSelectionViewModel> GetWithSelectionAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);
            var i = _mapper.Map<DrugHistoryWithSelectionViewModel>(entity);
            i.item_masterDrugID = await _dataContext.MasterDrugs.Select(x => _mapper.Map<MasterDrugViewModel>(x)).ToListAsync();
            i.item_treatmentScheduleId = await _dataContext.TreatmentSchedules.Select(x => _mapper.Map<TreatmentScheduleViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<DrugHistoryWithSelectionViewModel> GetBlankItemAsync()
        {
            var i = new DrugHistoryWithSelectionViewModel();
            i.item_masterDrugID = await _dataContext.MasterDrugs.Select(x => _mapper.Map<MasterDrugViewModel>(x)).ToListAsync();
            i.item_treatmentScheduleId = await _dataContext.TreatmentSchedules.Select(x => _mapper.Map<TreatmentScheduleViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<List<DrugHistoryViewModel>> GetListBySearchAsync(DrugHistorySearchModel model)
        {
            var data = await (
                from m_drughistory in _dataContext.DrugHistorys

                join fk_masterdrug1 in _dataContext.MasterDrugs on m_drughistory.masterDrugID equals fk_masterdrug1.id
                into masterdrugResult1
                from fk_masterdrugResult1 in masterdrugResult1.DefaultIfEmpty()

                join fk_treatmentschedule2 in _dataContext.TreatmentSchedules on m_drughistory.treatmentScheduleId equals fk_treatmentschedule2.id
                into treatmentscheduleResult2
                from fk_treatmentscheduleResult2 in treatmentscheduleResult2.DefaultIfEmpty()


				where
                1 == 1 
                && (!model.masterDrugID.HasValue || m_drughistory.masterDrugID == model.masterDrugID)
                && (!model.treatmentScheduleId.HasValue || m_drughistory.treatmentScheduleId == model.treatmentScheduleId)


                orderby m_drughistory.created descending
                select new DrugHistoryViewModel()
                {
                    id = m_drughistory.id,
                    masterDrugID = m_drughistory.masterDrugID,
                    treatmentScheduleId = m_drughistory.treatmentScheduleId,
                    amount = m_drughistory.amount,
                    remark = m_drughistory.remark,

                    masterDrugID_MasterDrug_name = fk_masterdrugResult1.name,
                    treatmentScheduleId_TreatmentSchedule_planingTopic = fk_treatmentscheduleResult2.planingTopic,

                    isActive = m_drughistory.isActive,
                    created = m_drughistory.created,
                    updated = m_drughistory.updated
                }
            ).Take(1000).ToListAsync();

            return data;
        }

        #endregion        

        #region Manipulation Functions



        public async Task<DrugHistoryViewModel?> InsertAsync(DrugHistoryInputModel model, bool is_force_save)
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
                return _mapper.Map<DrugHistoryViewModel>(entity);
            }
        }

        public async Task<DrugHistoryViewModel?> UpdateAsync(Guid id, DrugHistoryInputModel model, bool is_force_save)
        {
            var existingEntity = await _repository.GetAsync(id);
            if (existingEntity != null)
            {
                existingEntity.masterDrugID = model.masterDrugID;
                existingEntity.treatmentScheduleId = model.treatmentScheduleId;
                existingEntity.amount = model.amount;
                existingEntity.remark = model.remark;


                if (is_force_save)
                {
                    var updated = await _repository.UpdateAsync(id, existingEntity);
                    return await GetAsync(updated.id);
                }
                else
                {
                    await _repository.UpdateWithoutCommitAsync(id, existingEntity);
                    return _mapper.Map<DrugHistoryViewModel>(existingEntity);
                }
            }
            else
            throw new Exception("No data to update");
        }

		public async Task<int> UpdateMultipleAsync(List<DrugHistoryInputModel> model, bool is_force_save)
        {
            foreach(var i in model)
            {
                if (i.active_mode == "1" && i.id.HasValue) // update
                {                    
                    var existingEntity = await _repository.GetAsync(i.id.Value);
                    if (existingEntity != null)
                    {
                existingEntity.masterDrugID = i.masterDrugID;
                existingEntity.treatmentScheduleId = i.treatmentScheduleId;
                existingEntity.amount = i.amount;
                existingEntity.remark = i.remark;


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
            var all_items = _dataContext.DrugHistorys;
            foreach (var item in all_items)
            {
                
            }
            await _dataContext.SaveChangesAsync();
        }

        #endregion

        #region Match Item

        #endregion

        #endregion

        public async Task<byte[]> GetReportStreamAsync(DrugHistoryReportRequestModel model)
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