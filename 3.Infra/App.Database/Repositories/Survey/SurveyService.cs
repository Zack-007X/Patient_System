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
    public class SurveyService : ISurveyService
    {
        private IBaseRepository<SurveyEntity, Guid> _repository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public SurveyService(
            IBaseRepository<SurveyEntity, Guid> repository, 
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

        private SurveyEntity GetEntity(SurveyInputModel model)
        {
            return _mapper.Map<SurveyEntity>(model);
        }
        private SurveyViewModel GetDto(SurveyEntity entity)
        {
            return _mapper.Map<SurveyViewModel>(entity);
        }
       
        #endregion

        #region Public Functions
        #region Query Functions

        public async Task<SurveyViewModel?> GetAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return GetDto(entity);
        }

        public async Task<SurveyEntity?> GetEntityAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return entity;
        }

        public async Task<SurveyWithSelectionViewModel> GetWithSelectionAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);
            var i = _mapper.Map<SurveyWithSelectionViewModel>(entity);
            i.item_patientId = await _dataContext.Patients.Select(x => _mapper.Map<PatientViewModel>(x)).ToListAsync();
            i.item_doctorId = await _dataContext.Users.Select(x => _mapper.Map<UserViewModel>(x)).ToListAsync();
            i.item_masterPatientStateId = await _dataContext.MasterPatientStates.Select(x => _mapper.Map<MasterPatientStateViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<SurveyWithSelectionViewModel> GetBlankItemAsync()
        {
            var i = new SurveyWithSelectionViewModel();
            i.item_patientId = await _dataContext.Patients.Select(x => _mapper.Map<PatientViewModel>(x)).ToListAsync();
            i.item_doctorId = await _dataContext.Users.Select(x => _mapper.Map<UserViewModel>(x)).ToListAsync();
            i.item_masterPatientStateId = await _dataContext.MasterPatientStates.Select(x => _mapper.Map<MasterPatientStateViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<List<SurveyViewModel>> GetListBySearchAsync(SurveySearchModel model)
        {
            var data = await (
                from m_survey in _dataContext.Surveys

                join fk_patient1 in _dataContext.Patients on m_survey.patientId equals fk_patient1.id
                into patientResult1
                from fk_patientResult1 in patientResult1.DefaultIfEmpty()

                join fk_user2 in _dataContext.Users on m_survey.doctorId equals fk_user2.id
                into userResult2
                from fk_userResult2 in userResult2.DefaultIfEmpty()

                join fk_masterpatientstate3 in _dataContext.MasterPatientStates on m_survey.masterPatientStateId equals fk_masterpatientstate3.id
                into masterpatientstateResult3
                from fk_masterpatientstateResult3 in masterpatientstateResult3.DefaultIfEmpty()


				where
                1 == 1 
                && (!model.patientId.HasValue || m_survey.patientId == model.patientId)
                && (!model.doctorId.HasValue || m_survey.doctorId == model.doctorId)
                && (string.IsNullOrEmpty(model.masterPatientStateId) || m_survey.masterPatientStateId.Contains(model.masterPatientStateId))


                orderby m_survey.created descending
                select new SurveyViewModel()
                {
                    id = m_survey.id,
                    patientId = m_survey.patientId,
                    doctorId = m_survey.doctorId,
                    masterPatientStateId = m_survey.masterPatientStateId,
                    BloodPressure = m_survey.BloodPressure,
                    OxygenLevel = m_survey.OxygenLevel,
                    HeartRate = m_survey.HeartRate,
                    SurveyDate = m_survey.SurveyDate,
                    SurveyDetail = m_survey.SurveyDetail,
                    remark = m_survey.remark,

                    patientId_Patient_firstname = fk_patientResult1.firstname,
                    doctorId_User_username = fk_userResult2.username,
                    masterPatientStateId_MasterPatientState_name = fk_masterpatientstateResult3.name,

                    isActive = m_survey.isActive,
                    created = m_survey.created,
                    updated = m_survey.updated
                }
            ).Take(1000).ToListAsync();

            return data;
        }

        #endregion        

        #region Manipulation Functions



        public async Task<SurveyViewModel?> InsertAsync(SurveyInputModel model, bool is_force_save)
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
                return _mapper.Map<SurveyViewModel>(entity);
            }
        }

        public async Task<SurveyViewModel?> UpdateAsync(Guid id, SurveyInputModel model, bool is_force_save)
        {
            var existingEntity = await _repository.GetAsync(id);
            if (existingEntity != null)
            {
                existingEntity.patientId = model.patientId;
                existingEntity.doctorId = model.doctorId;
                existingEntity.masterPatientStateId = model.masterPatientStateId;
                existingEntity.BloodPressure = model.BloodPressure;
                existingEntity.OxygenLevel = model.OxygenLevel;
                existingEntity.HeartRate = model.HeartRate;
                existingEntity.SurveyDate = model.SurveyDate;
                existingEntity.SurveyDetail = model.SurveyDetail;
                existingEntity.remark = model.remark;


                if (is_force_save)
                {
                    var updated = await _repository.UpdateAsync(id, existingEntity);
                    return await GetAsync(updated.id);
                }
                else
                {
                    await _repository.UpdateWithoutCommitAsync(id, existingEntity);
                    return _mapper.Map<SurveyViewModel>(existingEntity);
                }
            }
            else
            throw new Exception("No data to update");
        }

		public async Task<int> UpdateMultipleAsync(List<SurveyInputModel> model, bool is_force_save)
        {
            foreach(var i in model)
            {
                if (i.active_mode == "1" && i.id.HasValue) // update
                {                    
                    var existingEntity = await _repository.GetAsync(i.id.Value);
                    if (existingEntity != null)
                    {
                existingEntity.patientId = i.patientId;
                existingEntity.doctorId = i.doctorId;
                existingEntity.masterPatientStateId = i.masterPatientStateId;
                existingEntity.BloodPressure = i.BloodPressure;
                existingEntity.OxygenLevel = i.OxygenLevel;
                existingEntity.HeartRate = i.HeartRate;
                existingEntity.SurveyDate = i.SurveyDate;
                existingEntity.SurveyDetail = i.SurveyDetail;
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
            var all_items = _dataContext.Surveys;
            foreach (var item in all_items)
            {
                
            }
            await _dataContext.SaveChangesAsync();
        }

        #endregion

        #region Match Item

        #endregion

        #endregion

        public async Task<byte[]> GetReportStreamAsync(SurveyReportRequestModel model)
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