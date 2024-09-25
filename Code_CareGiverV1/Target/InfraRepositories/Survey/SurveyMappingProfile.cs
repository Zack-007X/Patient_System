using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class SurveyMappingProfile : Profile
    {
        public SurveyMappingProfile()
        {
            CreateMap<SurveyInputModel, SurveyEntity>();
            CreateMap<SurveyEntity, SurveyInputModel>();
            CreateMap<SurveyEntity, SurveyViewModel>();
            CreateMap<SurveyEntity, SurveyWithSelectionViewModel>();
        }
    }
}
