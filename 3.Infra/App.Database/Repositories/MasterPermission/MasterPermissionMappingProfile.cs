using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class MasterPermissionMappingProfile : Profile
    {
        public MasterPermissionMappingProfile()
        {
            CreateMap<MasterPermissionInputModel, MasterPermissionEntity>();
            CreateMap<MasterPermissionEntity, MasterPermissionInputModel>();
            CreateMap<MasterPermissionEntity, MasterPermissionViewModel>();
            CreateMap<MasterPermissionEntity, MasterPermissionWithSelectionViewModel>();
        }
    }
}
