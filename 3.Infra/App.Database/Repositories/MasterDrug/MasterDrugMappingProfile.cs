using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class MasterDrugMappingProfile : Profile
    {
        public MasterDrugMappingProfile()
        {
            CreateMap<MasterDrugInputModel, MasterDrugEntity>();
            CreateMap<MasterDrugEntity, MasterDrugInputModel>();
            CreateMap<MasterDrugEntity, MasterDrugViewModel>();
            CreateMap<MasterDrugEntity, MasterDrugWithSelectionViewModel>();
        }
    }
}
