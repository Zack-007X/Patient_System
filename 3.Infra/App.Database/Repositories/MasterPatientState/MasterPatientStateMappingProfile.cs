using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class MasterPatientStateMappingProfile : Profile
    {
        public MasterPatientStateMappingProfile()
        {
            CreateMap<MasterPatientStateInputModel, MasterPatientStateEntity>();
            CreateMap<MasterPatientStateEntity, MasterPatientStateInputModel>();
            CreateMap<MasterPatientStateEntity, MasterPatientStateViewModel>();
            CreateMap<MasterPatientStateEntity, MasterPatientStateWithSelectionViewModel>();
        }
    }
}
