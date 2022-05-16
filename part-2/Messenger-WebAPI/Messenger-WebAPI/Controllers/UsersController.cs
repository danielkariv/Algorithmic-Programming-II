using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Messenger_WebAPI.Data;
using Messenger_WebAPI.Models;

namespace Messenger_WebAPI.Controllers
{
    [ApiController]
    [Route("Users")]
    public class UsersController : Controller
    {

        private readonly Messenger_WebAPIContext _context;

        public UsersController(Messenger_WebAPIContext context)
        {
            _context = context;
        }

        // Gets all users registered
        // TODO: Only used for debugging, and isn't part of API, we could drop it.
        [HttpGet("")]
        public async Task<IActionResult> Index()
        {
            // get all users
              return _context.Users != null ? 
                          Json(await _context.Users.ToListAsync()) :
                          NotFound();
        }
        public class LoginRq
        {
            public string Id { get; set; }
            public string Password { get; set; }
        }
        // Tries to login with given Id, Password. (Notice: not part of API but we need it for login/register).
        [HttpPost("Login")]
        public ActionResult Login(LoginRq loginRq)
        {
            if (_context.Users == null) return NotFound();

            var found = _context.Users.Where(u => u.Id == loginRq.Id && u.Password == loginRq.Password).FirstOrDefault();
            
            if (found != null)
            {
                HttpContext.Session.SetString("Id", found.Id);
                return Ok();
            }
            // wrong password/username.
            return BadRequest();
        }
        // Register new user with given information (Notice: not part of API but we need it for login/register).
        [HttpPost("Register")]
        public async Task<IActionResult> Register([Bind("Id,Name,Password")] User user)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _context.Add(user);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    return BadRequest();
                }
                return Created("~/Users/Register", user);
            }
            return BadRequest();
        }

        // Logout action (Notice: not part of API but we need it for login/register).
        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            HttpContext.Session.Clear();
            return Ok();
        }

        // Gets details for given id (username). (Used for debugging meanlly)
        // TODO: Only used for debugging, and isn't part of API, we could drop it.
        [HttpPost("Details")]
        public async Task<IActionResult> Details(string id)
        {
            string? user_id = HttpContext.Session.GetString("Id");

            if (id == null || user_id == null || _context.Users == null)
            {
                return NotFound();
            }
            if (user_id != id)
                return BadRequest();

            var user = await _context.Users
                .FirstOrDefaultAsync(m => m.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            return Json(user);
        }
        
    }
}
