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
    public class PatientService : IPatientService
    {
        private IBaseRepository<PatientEntity, Guid> _repository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PatientService(
            IBaseRepository<PatientEntity, Guid> repository, 
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

        private PatientEntity GetEntity(PatientInputModel model)
        {
            return _mapper.Map<PatientEntity>(model);
        }
        private PatientViewModel GetDto(PatientEntity entity)
        {
            return _mapper.Map<PatientViewModel>(entity);
        }
       
        #endregion

        #region Public Functions
        #region Query Functions

        public async Task<PatientViewModel?> GetAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return GetDto(entity);
        }

        public async Task<PatientEntity?> GetEntityAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return entity;
        }

        public async Task<PatientWithSelectionViewModel> GetWithSelectionAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);
            var i = _mapper.Map<PatientWithSelectionViewModel>(entity);
            i.item_masterPrefixId = await _dataContext.MasterPrefixs.Select(x => _mapper.Map<MasterPrefixViewModel>(x)).ToListAsync();
            i.item_masterGenderId = await _dataContext.MasterGenders.Select(x => _mapper.Map<MasterGenderViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<PatientWithSelectionViewModel> GetBlankItemAsync()
        {
            var i = new PatientWithSelectionViewModel();
            i.item_masterPrefixId = await _dataContext.MasterPrefixs.Select(x => _mapper.Map<MasterPrefixViewModel>(x)).ToListAsync();
            i.item_masterGenderId = await _dataContext.MasterGenders.Select(x => _mapper.Map<MasterGenderViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<List<PatientViewModel>> GetListBySearchAsync(PatientSearchModel model)
        {
            var data = await (
                from m_patient in _dataContext.Patients

                join fk_masterprefix1 in _dataContext.MasterPrefixs on m_patient.masterPrefixId equals fk_masterprefix1.id
                into masterprefixResult1
                from fk_masterprefixResult1 in masterprefixResult1.DefaultIfEmpty()

                join fk_mastergender5 in _dataContext.MasterGenders on m_patient.masterGenderId equals fk_mastergender5.id
                into mastergenderResult5
                from fk_mastergenderResult5 in mastergenderResult5.DefaultIfEmpty()


				where
                1 == 1 
                && (string.IsNullOrEmpty(model.firstname) || m_patient.firstname.Contains(model.firstname))
                && (string.IsNullOrEmpty(model.lastname) || m_patient.lastname.Contains(model.lastname))


                orderby m_patient.created descending
                select new PatientViewModel()
                {
                    id = m_patient.id,
                    masterPrefixId = m_patient.masterPrefixId,
                    firstname = m_patient.firstname,
                    lastname = m_patient.lastname,
                    brithDate = m_patient.brithDate,
                    masterGenderId = m_patient.masterGenderId,
                    age = m_patient.age,
                    height = m_patient.height,
                    weight = m_patient.weight,
                    telephoneNumber = m_patient.telephoneNumber,
                    relativeName = m_patient.relativeName,
                    relativeContract = m_patient.relativeContract,
                    remark = m_patient.remark,

                    masterPrefixId_MasterPrefix_name = fk_masterprefixResult1.name,
                    masterGenderId_MasterGender_name = fk_mastergenderResult5.name,

                    isActive = m_patient.isActive,
                    created = m_patient.created,
                    updated = m_patient.updated
                }
            ).Take(1000).ToListAsync();

            return data;
        }

        #endregion        

        #region Manipulation Functions



        public async Task<PatientViewModel?> InsertAsync(PatientInputModel model, bool is_force_save)
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
                return _mapper.Map<PatientViewModel>(entity);
            }
        }

        public async Task<PatientViewModel?> UpdateAsync(Guid id, PatientInputModel model, bool is_force_save)
        {
            var existingEntity = await _repository.GetAsync(id);
            if (existingEntity != null)
            {
                existingEntity.masterPrefixId = model.masterPrefixId;
                existingEntity.firstname = model.firstname;
                existingEntity.lastname = model.lastname;
                existingEntity.brithDate = model.brithDate;
                existingEntity.masterGenderId = model.masterGenderId;
                existingEntity.age = model.age;
                existingEntity.height = model.height;
                existingEntity.weight = model.weight;
                existingEntity.telephoneNumber = model.telephoneNumber;
                existingEntity.relativeName = model.relativeName;
                existingEntity.relativeContract = model.relativeContract;
                existingEntity.remark = model.remark;


                if (is_force_save)
                {
                    var updated = await _repository.UpdateAsync(id, existingEntity);
                    return await GetAsync(updated.id);
                }
                else
                {
                    await _repository.UpdateWithoutCommitAsync(id, existingEntity);
                    return _mapper.Map<PatientViewModel>(existingEntity);
                }
            }
            else
            throw new Exception("No data to update");
        }

		public async Task<int> UpdateMultipleAsync(List<PatientInputModel> model, bool is_force_save)
        {
            foreach(var i in model)
            {
                if (i.active_mode == "1" && i.id.HasValue) // update
                {                    
                    var existingEntity = await _repository.GetAsync(i.id.Value);
                    if (existingEntity != null)
                    {
                existingEntity.masterPrefixId = i.masterPrefixId;
                existingEntity.firstname = i.firstname;
                existingEntity.lastname = i.lastname;
                existingEntity.brithDate = i.brithDate;
                existingEntity.masterGenderId = i.masterGenderId;
                existingEntity.age = i.age;
                existingEntity.height = i.height;
                existingEntity.weight = i.weight;
                existingEntity.telephoneNumber = i.telephoneNumber;
                existingEntity.relativeName = i.relativeName;
                existingEntity.relativeContract = i.relativeContract;
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
            var all_items = _dataContext.Patients;
            foreach (var item in all_items)
            {
                
            }
            await _dataContext.SaveChangesAsync();
        }

        #endregion

        #region Match Item

        #endregion

        #endregion

        public async Task<byte[]> GetReportStreamAsync(PatientReportRequestModel model)
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