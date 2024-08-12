using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class RepairMappingProfile : Profile
    {
        public RepairMappingProfile()
        {
            CreateMap<RepairInputModel, RepairEntity>();
            CreateMap<RepairEntity, RepairInputModel>();
            CreateMap<RepairEntity, RepairViewModel>();
            CreateMap<RepairEntity, RepairWithSelectionViewModel>();
        }
    }
}
