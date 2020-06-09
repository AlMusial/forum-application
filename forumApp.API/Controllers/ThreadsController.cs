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
            var finalThread = _mapper.Map<ThreadsForListDto>(thread);
            return Ok(finalThread);
        }
    }
}