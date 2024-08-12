using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class PaymentMappingProfile : Profile
    {
        public PaymentMappingProfile()
        {
            CreateMap<PaymentInputModel, PaymentEntity>();
            CreateMap<PaymentEntity, PaymentInputModel>();
            CreateMap<PaymentEntity, PaymentViewModel>();
            CreateMap<PaymentEntity, PaymentWithSelectionViewModel>();
        }
    }
}
