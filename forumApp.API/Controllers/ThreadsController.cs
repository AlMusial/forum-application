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

        // [HttpGet("{id}", Name = "GetComment")]
        // public async Task<IActionResult> GetComment(int id)
        // {
        //     var commentFromRepo = await _repo.GetComment(id);
        //     var comment = _mapper.Map<CommentsForThreadDto>(commentFromRepo);

        //     return Ok(comment);
        // }

        [HttpPost("AddComment")]
        public async Task<IActionResult> AddComment(int userId, int threadId, CommentForCreateDto commentForCreateDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);
            var threadFromRepo =await _repo.GetThread(threadId);

            var comment = _mapper.Map<Comment>(commentForCreateDto);

            threadFromRepo.Comments.Add(comment);
            userFromRepo.Comments.Add(comment);


            var commentToCreate = new Comment
            {
                Content = commentForCreateDto.Content,
                User = userFromRepo
            };

             if (await _repo.Save())
             {
                 var finalComment = _mapper.Map<CommentsForThreadDto>(comment);
                 //return CreatedAtRoute("GetComment", new { userId = userId, threadId = threadId }, finalComment);
                 return StatusCode(201);
             }
             return BadRequest("Could not add new comment");
        }
    }
}