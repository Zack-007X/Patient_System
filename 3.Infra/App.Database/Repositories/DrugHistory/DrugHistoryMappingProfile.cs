using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class DrugHistoryMappingProfile : Profile
    {
        public DrugHistoryMappingProfile()
        {
            CreateMap<DrugHistoryInputModel, DrugHistoryEntity>();
            CreateMap<DrugHistoryEntity, DrugHistoryInputModel>();
            CreateMap<DrugHistoryEntity, DrugHistoryViewModel>();
            CreateMap<DrugHistoryEntity, DrugHistoryWithSelectionViewModel>();
        }
    }
}
