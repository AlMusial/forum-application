using System.Threading.Tasks;
using forumApp.API.Data;
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
        public ThreadsController(IForumRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetThreads()
        {
            var threads = await _repo.GetThreads();
            return Ok(threads);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetThread(int id)
        {
            var thread = await _repo.GetThread(id);
            return Ok(thread);
        }
    }
}