using AutoMapper;
using forumApp.API.Dtos;
using forumApp.API.Models;

namespace forumApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(d => d.ProfilePhoto, option => option.MapFrom( src => 
                    src.Photo.Url)); //aby przeslac jedynie url obrazka do profilePhoto (destination) mapujemy url z obiektu ze zrodla
            CreateMap<User, UserForProfileDto>()
                .ForMember(d => d.ProfilePhoto, option => option.MapFrom( src => 
                    src.Photo.Url));
            CreateMap<Thread, ThreadsForProfileDto>();
        }
    }
}