using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using forumApp.API.Data;
using forumApp.API.Dtos;
using forumApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace forumApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ThreadsController : ControllerBase
    {
        private readonly IForumRepository _repo;
        private readonly IMapper _mapper;
        public ThreadsController(IForumRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetThreads()
        {
            var threads = await _repo.GetThreads();
            var finalThreads = _mapper.Map<IEnumerable<ThreadsForListDto>>(threads);
            return Ok(finalThreads);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetThread(int id)
        {
            var thread = await _repo.GetThread(id);
            var finalThread = _mapper.Map<ThreadsForListDto>(thread);// po to zeby niie zwracac calego obiektu tylko wybrane pola
            //var comment = _mapper.Map<ThreadsForListDto, CommentsForThreadDto>(comment);
            return Ok(finalThread);
        }

        [HttpPost("add/{userId}")]
        public async Task<IActionResult> Add(int userId, ThreadForCreateDto threadForCreateDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
                
        var userFromRepo = await _repo.GetUser(userId);
        threadForCreateDto.UserId = userFromRepo.Id;
        var thread = _mapper.Map<Thread>(threadForCreateDto);
        
        userFromRepo.Threads.Add(thread);

        if (await _repo.Save())
             {
                 var finalThread= _mapper.Map<ThreadsForListDto>(thread);
                 return Ok(finalThread);
             }
            return BadRequest("Could not add new thread");
        } 


    }
}