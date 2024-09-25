using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class MasterRoleMappingProfile : Profile
    {
        public MasterRoleMappingProfile()
        {
            CreateMap<MasterRoleInputModel, MasterRoleEntity>();
            CreateMap<MasterRoleEntity, MasterRoleInputModel>();
            CreateMap<MasterRoleEntity, MasterRoleViewModel>();
            CreateMap<MasterRoleEntity, MasterRoleWithSelectionViewModel>();
        }
    }
}
