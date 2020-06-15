using System;
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
    [Route("api/threads/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IForumRepository _repo;
        private readonly IMapper _mapper;
        public CommentController(IForumRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        
         [HttpGet("{id}", Name = "GetComment")]
         public async Task<IActionResult> GetComment(int id)
         {
             var commentFromRepo = await _repo.GetComment(id);
             var comment = _mapper.Map<CommentsForThreadDto>(commentFromRepo);

             return Ok(comment);
         }

        [HttpPost("{threadId}/{userId}")]
        public async Task<IActionResult> AddComment(int threadId, int userId,  CommentForCreateDto commentForCreateDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);
            var threadFromRepo =await _repo.GetThread(threadId);

            commentForCreateDto.userId = userFromRepo.Id;
            commentForCreateDto.threadId = threadFromRepo.Id;

            var comment = _mapper.Map<Comment>(commentForCreateDto);

            threadFromRepo.Comments.Add(comment);
            userFromRepo.Comments.Add(comment);
             if (await _repo.Save())
             {
                 var finalComment = _mapper.Map<CommentsForThreadDto>(comment);
                 return CreatedAtRoute("GetComment", new { userId = userId, threadId = threadId, id = comment.Id }, finalComment);
             }
             return BadRequest("Could not add new comment");
        }

        [HttpDelete("{id}/{userId}")]
        public async Task<IActionResult> DeleteThread(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var user = await _repo.GetUser(userId);

            if(!user.Comments.Any( c => c.Id == id))
            {
                return Unauthorized();
            }

            var comment = await _repo.GetComment(id);
            _repo.Delete(comment);

            if(await _repo.Save())
                return Ok();

            return BadRequest("Failed to delete comment");
        }

    }
}