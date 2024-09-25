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
    public class RoleHasPermissionService : IRoleHasPermissionService
    {
        private IBaseRepository<RoleHasPermissionEntity, Guid> _repository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public RoleHasPermissionService(
            IBaseRepository<RoleHasPermissionEntity, Guid> repository, 
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

        private RoleHasPermissionEntity GetEntity(RoleHasPermissionInputModel model)
        {
            return _mapper.Map<RoleHasPermissionEntity>(model);
        }
        private RoleHasPermissionViewModel GetDto(RoleHasPermissionEntity entity)
        {
            return _mapper.Map<RoleHasPermissionViewModel>(entity);
        }
       
        #endregion

        #region Public Functions
        #region Query Functions

        public async Task<RoleHasPermissionViewModel?> GetAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return GetDto(entity);
        }

        public async Task<RoleHasPermissionEntity?> GetEntityAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return entity;
        }

        public async Task<RoleHasPermissionWithSelectionViewModel> GetWithSelectionAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);
            var i = _mapper.Map<RoleHasPermissionWithSelectionViewModel>(entity);
            i.item_masterRoleId = await _dataContext.MasterRoles.Select(x => _mapper.Map<MasterRoleViewModel>(x)).ToListAsync();
            i.item_masterPermissionId = await _dataContext.MasterPermissions.Select(x => _mapper.Map<MasterPermissionViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<RoleHasPermissionWithSelectionViewModel> GetBlankItemAsync()
        {
            var i = new RoleHasPermissionWithSelectionViewModel();
            i.item_masterRoleId = await _dataContext.MasterRoles.Select(x => _mapper.Map<MasterRoleViewModel>(x)).ToListAsync();
            i.item_masterPermissionId = await _dataContext.MasterPermissions.Select(x => _mapper.Map<MasterPermissionViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<List<RoleHasPermissionViewModel>> GetListBySearchAsync(RoleHasPermissionSearchModel model)
        {
            var data = await (
                from m_rolehaspermission in _dataContext.RoleHasPermissions

                join fk_masterrole1 in _dataContext.MasterRoles on m_rolehaspermission.masterRoleId equals fk_masterrole1.id
                into masterroleResult1
                from fk_masterroleResult1 in masterroleResult1.DefaultIfEmpty()

                join fk_masterpermission2 in _dataContext.MasterPermissions on m_rolehaspermission.masterPermissionId equals fk_masterpermission2.id
                into masterpermissionResult2
                from fk_masterpermissionResult2 in masterpermissionResult2.DefaultIfEmpty()


				where
                1 == 1 
                && (!model.masterRoleId.HasValue || m_rolehaspermission.masterRoleId == model.masterRoleId)
                && (!model.masterPermissionId.HasValue || m_rolehaspermission.masterPermissionId == model.masterPermissionId)


                orderby m_rolehaspermission.created descending
                select new RoleHasPermissionViewModel()
                {
                    id = m_rolehaspermission.id,
                    masterRoleId = m_rolehaspermission.masterRoleId,
                    masterPermissionId = m_rolehaspermission.masterPermissionId,
                    create = m_rolehaspermission.create,
                    read = m_rolehaspermission.read,
                    update = m_rolehaspermission.update,
                    delete = m_rolehaspermission.delete,
                    remark = m_rolehaspermission.remark,

                    masterRoleId_MasterRole_name = fk_masterroleResult1.name,
                    masterPermissionId_MasterPermission_name = fk_masterpermissionResult2.name,

                    isActive = m_rolehaspermission.isActive,
                    created = m_rolehaspermission.created,
                    updated = m_rolehaspermission.updated
                }
            ).Take(1000).ToListAsync();

            return data;
        }

        #endregion        

        #region Manipulation Functions



        public async Task<RoleHasPermissionViewModel?> InsertAsync(RoleHasPermissionInputModel model, bool is_force_save)
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
                return _mapper.Map<RoleHasPermissionViewModel>(entity);
            }
        }

        public async Task<RoleHasPermissionViewModel?> UpdateAsync(Guid id, RoleHasPermissionInputModel model, bool is_force_save)
        {
            var existingEntity = await _repository.GetAsync(id);
            if (existingEntity != null)
            {
                existingEntity.masterRoleId = model.masterRoleId;
                existingEntity.masterPermissionId = model.masterPermissionId;
                existingEntity.create = model.create;
                existingEntity.read = model.read;
                existingEntity.update = model.update;
                existingEntity.delete = model.delete;
                existingEntity.remark = model.remark;


                if (is_force_save)
                {
                    var updated = await _repository.UpdateAsync(id, existingEntity);
                    return await GetAsync(updated.id);
                }
                else
                {
                    await _repository.UpdateWithoutCommitAsync(id, existingEntity);
                    return _mapper.Map<RoleHasPermissionViewModel>(existingEntity);
                }
            }
            else
            throw new Exception("No data to update");
        }

		public async Task<int> UpdateMultipleAsync(List<RoleHasPermissionInputModel> model, bool is_force_save)
        {
            foreach(var i in model)
            {
                if (i.active_mode == "1" && i.id.HasValue) // update
                {                    
                    var existingEntity = await _repository.GetAsync(i.id.Value);
                    if (existingEntity != null)
                    {
                existingEntity.masterRoleId = i.masterRoleId;
                existingEntity.masterPermissionId = i.masterPermissionId;
                existingEntity.create = i.create;
                existingEntity.read = i.read;
                existingEntity.update = i.update;
                existingEntity.delete = i.delete;
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
            var all_items = _dataContext.RoleHasPermissions;
            foreach (var item in all_items)
            {
                
            }
            await _dataContext.SaveChangesAsync();
        }

        #endregion

        #region Match Item

        #endregion

        #endregion

        public async Task<byte[]> GetReportStreamAsync(RoleHasPermissionReportRequestModel model)
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