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
    public class UserService : IUserService
    {
        private IBaseRepository<UserEntity, Guid> _repository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(
            IBaseRepository<UserEntity, Guid> repository, 
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

        private UserEntity GetEntity(UserInputModel model)
        {
            return _mapper.Map<UserEntity>(model);
        }
        private UserViewModel GetDto(UserEntity entity)
        {
            return _mapper.Map<UserViewModel>(entity);
        }
       
        #endregion

        #region Public Functions
        #region Query Functions

        public async Task<UserViewModel?> GetAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return GetDto(entity);
        }

        public async Task<UserEntity?> GetEntityAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return entity;
        }

        public async Task<UserWithSelectionViewModel> GetWithSelectionAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);
            var i = _mapper.Map<UserWithSelectionViewModel>(entity);
            i.item_masterPrefixId = await _dataContext.MasterPrefixs.Select(x => _mapper.Map<MasterPrefixViewModel>(x)).ToListAsync();
            i.item_masterRoleId = await _dataContext.MasterRoles.Select(x => _mapper.Map<MasterRoleViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<UserWithSelectionViewModel> GetBlankItemAsync()
        {
            var i = new UserWithSelectionViewModel();
            i.item_masterPrefixId = await _dataContext.MasterPrefixs.Select(x => _mapper.Map<MasterPrefixViewModel>(x)).ToListAsync();
            i.item_masterRoleId = await _dataContext.MasterRoles.Select(x => _mapper.Map<MasterRoleViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<List<UserViewModel>> GetListBySearchAsync(UserSearchModel model)
        {
            var data = await (
                from m_user in _dataContext.Users

                join fk_masterprefix4 in _dataContext.MasterPrefixs on m_user.masterPrefixId equals fk_masterprefix4.id
                into masterprefixResult4
                from fk_masterprefixResult4 in masterprefixResult4.DefaultIfEmpty()

                join fk_masterrole8 in _dataContext.MasterRoles on m_user.masterRoleId equals fk_masterrole8.id
                into masterroleResult8
                from fk_masterroleResult8 in masterroleResult8.DefaultIfEmpty()


				where
                1 == 1 
                && (string.IsNullOrEmpty(model.username) || m_user.username.Contains(model.username))
                && (string.IsNullOrEmpty(model.firstname) || m_user.firstname.Contains(model.firstname))
                && (string.IsNullOrEmpty(model.lastname) || m_user.lastname.Contains(model.lastname))


                orderby m_user.created descending
                select new UserViewModel()
                {
                    id = m_user.id,
                    username = m_user.username,
                    passwordHash = m_user.passwordHash,
                    email = m_user.email,
                    masterPrefixId = m_user.masterPrefixId,
                    firstname = m_user.firstname,
                    lastname = m_user.lastname,
                    telephoneNumber = m_user.telephoneNumber,
                    masterRoleId = m_user.masterRoleId,
                    remark = m_user.remark,

                    masterPrefixId_MasterPrefix_name = fk_masterprefixResult4.name,
                    masterRoleId_MasterRole_name = fk_masterroleResult8.name,

                    isActive = m_user.isActive,
                    created = m_user.created,
                    updated = m_user.updated
                }
            ).Take(1000).ToListAsync();

            return data;
        }

        #endregion        

        #region Manipulation Functions



        public async Task<UserViewModel?> InsertAsync(UserInputModel model, bool is_force_save)
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
                return _mapper.Map<UserViewModel>(entity);
            }
        }

        public async Task<UserViewModel?> UpdateAsync(Guid id, UserInputModel model, bool is_force_save)
        {
            var existingEntity = await _repository.GetAsync(id);
            if (existingEntity != null)
            {
                existingEntity.username = model.username;
                existingEntity.passwordHash = model.passwordHash;
                existingEntity.email = model.email;
                existingEntity.masterPrefixId = model.masterPrefixId;
                existingEntity.firstname = model.firstname;
                existingEntity.lastname = model.lastname;
                existingEntity.telephoneNumber = model.telephoneNumber;
                existingEntity.masterRoleId = model.masterRoleId;
                existingEntity.remark = model.remark;


                if (is_force_save)
                {
                    var updated = await _repository.UpdateAsync(id, existingEntity);
                    return await GetAsync(updated.id);
                }
                else
                {
                    await _repository.UpdateWithoutCommitAsync(id, existingEntity);
                    return _mapper.Map<UserViewModel>(existingEntity);
                }
            }
            else
            throw new Exception("No data to update");
        }

		public async Task<int> UpdateMultipleAsync(List<UserInputModel> model, bool is_force_save)
        {
            foreach(var i in model)
            {
                if (i.active_mode == "1" && i.id.HasValue) // update
                {                    
                    var existingEntity = await _repository.GetAsync(i.id.Value);
                    if (existingEntity != null)
                    {
                existingEntity.username = i.username;
                existingEntity.passwordHash = i.passwordHash;
                existingEntity.email = i.email;
                existingEntity.masterPrefixId = i.masterPrefixId;
                existingEntity.firstname = i.firstname;
                existingEntity.lastname = i.lastname;
                existingEntity.telephoneNumber = i.telephoneNumber;
                existingEntity.masterRoleId = i.masterRoleId;
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
            var all_items = _dataContext.Users;
            foreach (var item in all_items)
            {
                
            }
            await _dataContext.SaveChangesAsync();
        }

        #endregion

        #region Match Item

        #endregion

        #endregion

        public async Task<byte[]> GetReportStreamAsync(UserReportRequestModel model)
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