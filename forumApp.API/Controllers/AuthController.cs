using System.Text;
using System.Reflection.Metadata;
using System.Security.Claims;
using System.Threading.Tasks;
using forumApp.API.Data;
using forumApp.API.Dtos;
using forumApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;

namespace forumApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController] // ważne bez tego walidacja przez modelState
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper) // wstrzykiwanie potrzebnych zaleznosci do danej klasy
        {
            _mapper = mapper;
            _config = config;
            _repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await _repo.UserExist(userForRegisterDto.Username))
                return BadRequest("Username is already taken");

            var userToCreate = _mapper.Map<User>(userForRegisterDto);

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);
            var userToReturn = _mapper.Map<UserForListDto>(createdUser);
            return CreatedAtRoute("GetUser", new {Controller = "Users", id = createdUser.Id}, userToReturn);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password); // sprawdzamy czy dane zgadzaja sie z tymi w bazie

            if (userForLoginDto == null)
                return Unauthorized();

            var claims = new[] // token sklada sie z dwoch inormacji: id i username
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature); // bierze klucz dostepu z appsettings i hashujemy go algorytmem Hmac

            var tokenDescriptor = new SecurityTokenDescriptor // tworzymy token z wczesniej zadeklarowanymi claims
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1), // informacja kiedy token wygaśnie - waznosc 1 dzien
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor); //zawiera token jwt ktory chcemy zwrocic do klienta
            var user = _mapper.Map<UserForListDto>(userFromRepo);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token), // odpowiedz wysylana do strony klienta
                user
            });
        }

    }
}