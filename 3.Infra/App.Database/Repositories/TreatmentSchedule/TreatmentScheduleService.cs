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
    public class TreatmentScheduleService : ITreatmentScheduleService
    {
        private IBaseRepository<TreatmentScheduleEntity, Guid> _repository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TreatmentScheduleService(
            IBaseRepository<TreatmentScheduleEntity, Guid> repository, 
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

        private TreatmentScheduleEntity GetEntity(TreatmentScheduleInputModel model)
        {
            return _mapper.Map<TreatmentScheduleEntity>(model);
        }
        private TreatmentScheduleViewModel GetDto(TreatmentScheduleEntity entity)
        {
            return _mapper.Map<TreatmentScheduleViewModel>(entity);
        }
       
        #endregion

        #region Public Functions
        #region Query Functions

        public async Task<TreatmentScheduleViewModel?> GetAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return GetDto(entity);
        }

        public async Task<TreatmentScheduleEntity?> GetEntityAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return entity;
        }

        public async Task<TreatmentScheduleWithSelectionViewModel> GetWithSelectionAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);
            var i = _mapper.Map<TreatmentScheduleWithSelectionViewModel>(entity);
            i.item_surveyId = await _dataContext.Surveys.Select(x => _mapper.Map<SurveyViewModel>(x)).ToListAsync();
            i.item_CaregiverId = await _dataContext.Users.Select(x => _mapper.Map<UserViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<TreatmentScheduleWithSelectionViewModel> GetBlankItemAsync()
        {
            var i = new TreatmentScheduleWithSelectionViewModel();
            i.item_surveyId = await _dataContext.Surveys.Select(x => _mapper.Map<SurveyViewModel>(x)).ToListAsync();
            i.item_CaregiverId = await _dataContext.Users.Select(x => _mapper.Map<UserViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<List<TreatmentScheduleViewModel>> GetListBySearchAsync(TreatmentScheduleSearchModel model)
        {
            var data = await (
                from m_treatmentschedule in _dataContext.TreatmentSchedules

                join fk_survey1 in _dataContext.Surveys on m_treatmentschedule.surveyId equals fk_survey1.id
                into surveyResult1
                from fk_surveyResult1 in surveyResult1.DefaultIfEmpty()

                join fk_user6 in _dataContext.Users on m_treatmentschedule.CaregiverId equals fk_user6.id
                into userResult6
                from fk_userResult6 in userResult6.DefaultIfEmpty()


				where
                1 == 1 
                && (!model.surveyId.HasValue || m_treatmentschedule.surveyId == model.surveyId)
                && (string.IsNullOrEmpty(model.planingTopic) || m_treatmentschedule.planingTopic.Contains(model.planingTopic))
                && (string.IsNullOrEmpty(model.planingDetails) || m_treatmentschedule.planingDetails.Contains(model.planingDetails))
                && (!model.CaregiverId.HasValue || m_treatmentschedule.CaregiverId == model.CaregiverId)


                orderby m_treatmentschedule.created descending
                select new TreatmentScheduleViewModel()
                {
                    id = m_treatmentschedule.id,
                    surveyId = m_treatmentschedule.surveyId,
                    planingTopic = m_treatmentschedule.planingTopic,
                    planingDetails = m_treatmentschedule.planingDetails,
                    startTreatmentDate = m_treatmentschedule.startTreatmentDate,
                    endtartTreatmentDate = m_treatmentschedule.endtartTreatmentDate,
                    CaregiverId = m_treatmentschedule.CaregiverId,
                    TreatmentReportTopic = m_treatmentschedule.TreatmentReportTopic,
                    TreatmentReportDetails = m_treatmentschedule.TreatmentReportDetails,
                    remark = m_treatmentschedule.remark,

                    surveyId_Survey_patientId = fk_surveyResult1.patientId,
                    CaregiverId_User_username = fk_userResult6.username,

                    isActive = m_treatmentschedule.isActive,
                    created = m_treatmentschedule.created,
                    updated = m_treatmentschedule.updated
                }
            ).Take(1000).ToListAsync();

            return data;
        }

        #endregion        

        #region Manipulation Functions



        public async Task<TreatmentScheduleViewModel?> InsertAsync(TreatmentScheduleInputModel model, bool is_force_save)
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
                return _mapper.Map<TreatmentScheduleViewModel>(entity);
            }
        }

        public async Task<TreatmentScheduleViewModel?> UpdateAsync(Guid id, TreatmentScheduleInputModel model, bool is_force_save)
        {
            var existingEntity = await _repository.GetAsync(id);
            if (existingEntity != null)
            {
                existingEntity.surveyId = model.surveyId;
                existingEntity.planingTopic = model.planingTopic;
                existingEntity.planingDetails = model.planingDetails;
                existingEntity.startTreatmentDate = model.startTreatmentDate;
                existingEntity.endtartTreatmentDate = model.endtartTreatmentDate;
                existingEntity.CaregiverId = model.CaregiverId;
                existingEntity.TreatmentReportTopic = model.TreatmentReportTopic;
                existingEntity.TreatmentReportDetails = model.TreatmentReportDetails;
                existingEntity.remark = model.remark;


                if (is_force_save)
                {
                    var updated = await _repository.UpdateAsync(id, existingEntity);
                    return await GetAsync(updated.id);
                }
                else
                {
                    await _repository.UpdateWithoutCommitAsync(id, existingEntity);
                    return _mapper.Map<TreatmentScheduleViewModel>(existingEntity);
                }
            }
            else
            throw new Exception("No data to update");
        }

		public async Task<int> UpdateMultipleAsync(List<TreatmentScheduleInputModel> model, bool is_force_save)
        {
            foreach(var i in model)
            {
                if (i.active_mode == "1" && i.id.HasValue) // update
                {                    
                    var existingEntity = await _repository.GetAsync(i.id.Value);
                    if (existingEntity != null)
                    {
                existingEntity.surveyId = i.surveyId;
                existingEntity.planingTopic = i.planingTopic;
                existingEntity.planingDetails = i.planingDetails;
                existingEntity.startTreatmentDate = i.startTreatmentDate;
                existingEntity.endtartTreatmentDate = i.endtartTreatmentDate;
                existingEntity.CaregiverId = i.CaregiverId;
                existingEntity.TreatmentReportTopic = i.TreatmentReportTopic;
                existingEntity.TreatmentReportDetails = i.TreatmentReportDetails;
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
            var all_items = _dataContext.TreatmentSchedules;
            foreach (var item in all_items)
            {
                
            }
            await _dataContext.SaveChangesAsync();
        }

        #endregion

        #region Match Item

        #endregion

        #endregion

        public async Task<byte[]> GetReportStreamAsync(TreatmentScheduleReportRequestModel model)
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