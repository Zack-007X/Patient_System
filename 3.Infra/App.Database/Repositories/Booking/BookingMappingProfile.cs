using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class BookingMappingProfile : Profile
    {
        public BookingMappingProfile()
        {
            CreateMap<BookingInputModel, BookingEntity>();
            CreateMap<BookingEntity, BookingInputModel>();
            CreateMap<BookingEntity, BookingViewModel>();
            CreateMap<BookingEntity, BookingWithSelectionViewModel>();
        }
    }
}
