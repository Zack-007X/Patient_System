using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class PatientMappingProfile : Profile
    {
        public PatientMappingProfile()
        {
            CreateMap<PatientInputModel, PatientEntity>();
            CreateMap<PatientEntity, PatientInputModel>();
            CreateMap<PatientEntity, PatientViewModel>();
            CreateMap<PatientEntity, PatientWithSelectionViewModel>();
        }
    }
}
