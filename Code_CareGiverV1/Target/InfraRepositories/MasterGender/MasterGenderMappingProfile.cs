using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class MasterGenderMappingProfile : Profile
    {
        public MasterGenderMappingProfile()
        {
            CreateMap<MasterGenderInputModel, MasterGenderEntity>();
            CreateMap<MasterGenderEntity, MasterGenderInputModel>();
            CreateMap<MasterGenderEntity, MasterGenderViewModel>();
            CreateMap<MasterGenderEntity, MasterGenderWithSelectionViewModel>();
        }
    }
}
