using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class UserHasSpecialMappingProfile : Profile
    {
        public UserHasSpecialMappingProfile()
        {
            CreateMap<UserHasSpecialInputModel, UserHasSpecialEntity>();
            CreateMap<UserHasSpecialEntity, UserHasSpecialInputModel>();
            CreateMap<UserHasSpecialEntity, UserHasSpecialViewModel>();
            CreateMap<UserHasSpecialEntity, UserHasSpecialWithSelectionViewModel>();
        }
    }
}
