using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class CustomerMappingProfile : Profile
    {
        public CustomerMappingProfile()
        {
            CreateMap<CustomerInputModel, CustomerEntity>();
            CreateMap<CustomerEntity, CustomerInputModel>();
            CreateMap<CustomerEntity, CustomerViewModel>();
            CreateMap<CustomerEntity, CustomerWithSelectionViewModel>();
        }
    }
}
