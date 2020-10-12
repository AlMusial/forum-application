using AutoMapper;
using forumApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.Extensions.Options;
using forumApp.API.Helpers;
using CloudinaryDotNet;
using forumApp.API.Dtos;
using System.Threading.Tasks;
using forumApp.API.Models;
using CloudinaryDotNet.Actions;
using System.Security.Claims;

namespace forumApp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photo")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly IForumRepository _repo;
        private readonly IMapper _mapper;
        public readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotoController(IForumRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
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

        [HttpGet("{id}", Name = "GetPhoto")] //sciezka bedzie wymagac id
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photo = await _repo.GetPhoto(id);
            //aby nie zwracac calego usera mapujemy z source czyli User do destination czyli wzor DTO do wyswietlenia 
            var finalPhoto = _mapper.Map<PhotoForReturnDto>(photo);
            return Ok(finalPhoto);
        }
        
        [HttpPost]
        public async Task<IActionResult> AddPhoto(int userId, [FromForm]PhotoForUploadDto photoForUploadDto)
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
                var finalPhoto = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new { userId = userId, id = photo.Id }, finalPhoto);
            }

            return BadRequest("Could not upload the photo");
        }
    }
}