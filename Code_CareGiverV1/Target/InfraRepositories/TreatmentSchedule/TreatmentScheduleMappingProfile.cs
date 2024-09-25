using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class TreatmentScheduleMappingProfile : Profile
    {
        public TreatmentScheduleMappingProfile()
        {
            CreateMap<TreatmentScheduleInputModel, TreatmentScheduleEntity>();
            CreateMap<TreatmentScheduleEntity, TreatmentScheduleInputModel>();
            CreateMap<TreatmentScheduleEntity, TreatmentScheduleViewModel>();
            CreateMap<TreatmentScheduleEntity, TreatmentScheduleWithSelectionViewModel>();
        }
    }
}
