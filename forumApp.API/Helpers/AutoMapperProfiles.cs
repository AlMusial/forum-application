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
                .ForMember(d => d.ProfilePhoto, opt => opt.MapFrom(src => 
                    src.Photo.Url)); //aby przeslac jedynie url obrazka do profilePhoto (destination) mapujemy url z obiektu ze zrodla
            CreateMap<User, UserForProfileDto>()
                .ForMember(d => d.ProfilePhoto, option => option.MapFrom(src => src.Photo.Url));
            CreateMap<ThreadForCreateDto, Thread>();
            CreateMap<Thread, ThreadsForListDto>()
                .ForMember(p => p.Photo, opt => opt.MapFrom(src => src.User.Photo.Url)) 
                .ForMember(d => d.Username, opt => opt.MapFrom(src => src.User.Username))
                .ForMember(d => d.UserId, opt => opt.MapFrom(src => src.User.Id));
            CreateMap<Thread, ThreadsForProfileDto>();
            CreateMap<CommentForCreateDto, Comment>();
            CreateMap<Comment, CommentsForThreadDto>()
                .ForMember(p => p.Photo, opt => opt.MapFrom(src => src.User.Photo.Url)) 
                .ForMember(d => d.Username, opt => opt.MapFrom(src => src.User.Username))
                .ForMember(d => d.UserId, opt => opt.MapFrom(src => src.User.Id));
            CreateMap<UserForUpdateDto, User>();
        }
    }
}