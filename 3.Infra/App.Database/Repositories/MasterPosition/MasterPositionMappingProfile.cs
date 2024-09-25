using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class MasterPositionMappingProfile : Profile
    {
        public MasterPositionMappingProfile()
        {
            CreateMap<MasterPositionInputModel, MasterPositionEntity>();
            CreateMap<MasterPositionEntity, MasterPositionInputModel>();
            CreateMap<MasterPositionEntity, MasterPositionViewModel>();
            CreateMap<MasterPositionEntity, MasterPositionWithSelectionViewModel>();
        }
    }
}
