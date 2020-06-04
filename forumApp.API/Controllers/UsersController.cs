using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using forumApp.API.Data;
using forumApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace forumApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IForumRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IForumRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();
            var finalUsers = _mapper.Map<IEnumerable<UserForListDto>>(users);
            return Ok(finalUsers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            //aby nie zwracac calego usera mapujemy z source czyli User do destination czyli wzor DTO do wyswietlenia 
            var finalUser = _mapper.Map<UserForProfileDto>(user);
            return Ok(finalUser);
        }
    }
}