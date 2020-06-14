using System.Security.Claims;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using forumApp.API.Data;
using forumApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.Extensions.Options;
using forumApp.API.Helpers;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using forumApp.API.Models;

namespace forumApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IForumRepository _repo;
        private readonly IMapper _mapper;
        public readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public UsersController(IForumRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }
        
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();
            var finalUsers = _mapper.Map<IEnumerable<UserForListDto>>(users);
            return Ok(finalUsers);
        }

        [HttpGet("{id}")] //sciezka bedzie wymagac id
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            //aby nie zwracac calego usera mapujemy z source czyli User do destination czyli wzor DTO do wyswietlenia 
            var finalUser = _mapper.Map<UserForProfileDto>(user);
            return Ok(finalUser);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            // ochrona przed edycja nieswojego profilu
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);
            _mapper.Map(userForUpdateDto, userFromRepo); // wpisuje zmienione daze z userForUpdate do userFromRepo
            if (await _repo.Save())
                return NoContent();

            throw new Exception($"Failed to update user");
        }

        [HttpPut]
        public async Task<IActionResult> AddPhoto(int userId, PhotoForUploadDto photoForUploadDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);

            var file = photoForUploadDto.File;
            var uploadResult = new ImageUploadResult(); // przechowanie odpowiedzi od cloudinary

            if(file.Length > 0)// jezeli cos jest w tym pliku
            {
                using (var stream = file.OpenReadStream())// aby pokazac co jest w tym pliku po zaladownaiu go
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face") // zeby przerobic duze zdjecie na kwadrat
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            // pobranie reeszty danych z cloudinary do dto
            photoForUploadDto.Url = uploadResult.Url.ToString();
            photoForUploadDto.PublicId = uploadResult.PublicId;
            //mapowanie z tych wartosci do instancji modelu photo z dto

            var photo = _mapper.Map<Photo>(photoForUploadDto);
            userFromRepo.Photo = photo;

            if(await _repo.Save())
            {
                return Ok();
            }

            return BadRequest("Could not upload the photo");
        }
    }
}