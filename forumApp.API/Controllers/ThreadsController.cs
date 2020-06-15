using System;
using System.Collections.Generic;
using System.Linq;
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
            //foreach()
            var commentsFromRepo = await _repo.GetCommentsForThread(id);
            var comments = _mapper.Map<IEnumerable<CommentsForThreadDto>>(commentsFromRepo);
            //thread.Comments = comments;
            var finalThread = _mapper.Map<ThreadsForListDto>(thread);// po to zeby niie zwracac calego obiektu tylko wybrane pola
            finalThread.Comments = comments;
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

        [HttpDelete("{id}/{userId}")]
        public async Task<IActionResult> DeleteThread(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var user = await _repo.GetUser(userId);

            if(!user.Threads.Any( t => t.Id == id))
            {
                return Unauthorized();
            }

            var thread = await _repo.GetThread(id);
            _repo.Delete(thread);

            if(await _repo.Save())
                return Ok();

            return BadRequest("Failed to delete thread");
        }

    }
}