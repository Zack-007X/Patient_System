using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class MasterPrefixMappingProfile : Profile
    {
        public MasterPrefixMappingProfile()
        {
            CreateMap<MasterPrefixInputModel, MasterPrefixEntity>();
            CreateMap<MasterPrefixEntity, MasterPrefixInputModel>();
            CreateMap<MasterPrefixEntity, MasterPrefixViewModel>();
            CreateMap<MasterPrefixEntity, MasterPrefixWithSelectionViewModel>();
        }
    }
}
