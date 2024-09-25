using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class RoleHasPermissionMappingProfile : Profile
    {
        public RoleHasPermissionMappingProfile()
        {
            CreateMap<RoleHasPermissionInputModel, RoleHasPermissionEntity>();
            CreateMap<RoleHasPermissionEntity, RoleHasPermissionInputModel>();
            CreateMap<RoleHasPermissionEntity, RoleHasPermissionViewModel>();
            CreateMap<RoleHasPermissionEntity, RoleHasPermissionWithSelectionViewModel>();
        }
    }
}
