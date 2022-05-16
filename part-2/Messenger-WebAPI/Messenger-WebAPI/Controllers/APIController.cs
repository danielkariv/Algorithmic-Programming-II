using Messenger_WebAPI.Data;
using Messenger_WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Messenger_WebAPI.Controllers
{
    [ApiController]
    [Route("api")]
    public class APIController : Controller
    {

        private readonly Messenger_WebAPIContext _context;

        // TODO: run over the returned error code and make sure they fit the API.
        public APIController(Messenger_WebAPIContext context)
        {
            _context = context;
        }

        // Gets all contacts for current session user.
        [HttpGet("contacts")]
        public async Task<IActionResult> ContactsGET()
        {
            string? user_id = HttpContext.Session.GetString("Id");

            if (user_id == null || _context.Contacts == null || _context.Users == null)
                return BadRequest();

            var user = _context.Users.Where(c => c.Id == user_id).FirstOrDefault();
            if (user == null)
                return BadRequest();
            // get all contacts belong to current session user.
            var contactsList = await _context.Contacts.Where(c => c.User == user).ToListAsync();

            return Json(contactsList);
        }

        public class AddContactRq
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public string Server { get; set; }
        }

        // Adds new contact for current session user with given Id, Name and Server.
        [HttpPost("contacts")]
        public async Task<IActionResult> ContactsPOST(AddContactRq contactRq)
        {
            string? user_id = HttpContext.Session.GetString("Id");

            if (user_id == null || contactRq == null || _context.Contacts == null || _context.Users == null)
                return NotFound(); // return 404 status code
            var found = _context.Contacts.Where(c => c.User.Id == user_id && c.Id == contactRq.Id).FirstOrDefault();
            if (found != null)
                return BadRequest();

            var user = _context.Users.Where(c => c.Id == user_id).FirstOrDefault();
            if (user == null)
                return BadRequest();

            // Notice: we can't check if contact info is actually valid, as it could be different servers from us (it is missing feature from API).
            Contact contact = new Contact();
            // add missing info.
            contact.User = user; // the session user id.
            contact.Id = contactRq.Id; // not null, it is the username
            contact.Name = contactRq.Name; // not null, a custom name user is choosing for contact.
            contact.Server = contactRq.Server;
            contact.Last = null;
            contact.Lastdate = null;

            // add new contact.
            try
            {
                _context.Contacts.Add(contact);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }
            // return 201 status code.
            return Created("~api/contacts/",contact);
        }
        // Gets contact of current session user with given id.
        [HttpGet("contacts/{id}")]
        public async Task<IActionResult> ContactsIDGET(string id)
        {
            string? user_id = HttpContext.Session.GetString("Id");

            if (user_id == null || _context.Contacts == null || _context.Users == null)
                return NotFound();

            var user = _context.Users.Where(c => c.Id == user_id).FirstOrDefault();
            if (user == null)
                return BadRequest();

            // search of conctact belong to current session user and with given id (username).
            var contact = _context.Contacts.Where(c => (c.User == user && c.Id == id)).FirstOrDefault();
            if (contact == null)
                return NotFound();
            else
                return Json(contact);
        }

        public class EditContactRq
        {
            public string Name { get; set; }
            public string Server { get; set; }
        }

        // Edit existing contact of current session user with given id, and the new info for contact (name, and server).
        [HttpPut("contacts/{id}")]
        public async Task<IActionResult> ContactsIDPUT(string id, EditContactRq contact)
        {
            string? user_id = HttpContext.Session.GetString("Id");

            if (user_id == null || id == null || _context.Contacts == null || _context.Users == null)
                return NotFound();

            var user = _context.Users.Where(c => c.Id == user_id).FirstOrDefault();
            if (user == null)
                return BadRequest();

            var foundContact = _context.Contacts.Where(c => (c.User == user && c.Id == id)).FirstOrDefault();
            if (foundContact == null)
                return BadRequest();
            // update info.
            foundContact.Name = contact.Name;
            foundContact.Server = contact.Server;
            // try to update and save.
            try
            {
                _context.Contacts.Update(foundContact);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }
            return NoContent(); 
        }
        // Removes contact of current session user with given {id} user.
        [HttpDelete("contacts/{id}")]
        public async Task<IActionResult> ContactsIDDELETE(string id)
        {
            string? user_id = HttpContext.Session.GetString("Id");

            if (user_id == null || id == null ||_context.Contacts == null || _context.Users == null)
                return NotFound();

            var user = _context.Users.Where(c => c.Id == user_id).FirstOrDefault();
            if (user == null)
                return BadRequest();

            var found = _context.Contacts.Where(c => (c.User == user && c.Id == id)).FirstOrDefault();
            if (found == null) return NotFound();

            // try remove contact belonging to current session user.
            try
            {
                _context.Remove(found);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound(); // TODO: not sure what to return when fail.
            }
            return NoContent();
        }
        // Gets all message between current session user and user {id}.
        [HttpGet("contacts/{id}/messages")]
        public ActionResult ContactsIDMessagesGET(string id)
        {
            string? user_id = HttpContext.Session.GetString("Id");

            if (user_id == null || id == null || _context.Messages == null || _context.Users == null)
                return NotFound();

            var user = _context.Users.Where(c => c.Id == user_id).FirstOrDefault();
            if (user == null)
                return BadRequest();

            var messages = _context.Messages.Where(m => (m.User == user && m.ContactId == id));

            return Json(messages);
        }
        public class AddMessageRq
        {
            public string? Content { get; set; }
        }
        // Adds new message between current session user and user {id}.
        [HttpPost("contacts/{id}/messages")]
        public async Task<IActionResult> ContactsIDMessagesPOST(string id, AddMessageRq messageRq)
        {
            string? user_id = HttpContext.Session.GetString("Id");

            if (user_id == null || id == null || messageRq.Content == null || _context.Messages == null || _context.Users == null || _context.Contacts == null)
                return NotFound();

            var user = _context.Users.Where(c => c.Id == user_id).FirstOrDefault();
            if (user == null)
                return BadRequest();

            // update contact info.
            var contact = _context.Contacts.Where(c => c.Id == id && c.User == user).FirstOrDefault();
            if (contact == null)
                return BadRequest();

            DateTime date = DateTime.Now;
            // adds missing data for Message.
            Message message = new Message
            {
                Content = messageRq.Content,
                User = user,
                ContactId = id,
                Created = DateTime.Now,
                Sent = true // the current session user is the one sending, and the message link to him.
            };

            // try adding the new message to database.
            try
            {
                _context.Add(message);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound(); // TODO: not sure what to return when fail.
            }

            // update the last date and last message for the content we send info to.
            contact.Lastdate = date;
            contact.Last = messageRq.Content;

            try
            {
                _context.Update(contact);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound(); // TODO: not sure what to return when fail.
            }


            return Accepted();
        }
        // Gets the message with id = {id2} from contacts = {id} of current session user.
        [HttpGet("contacts/{id}/messages/{id2}")]
        public ActionResult ContactsIDMessagesID2GET(string id,int id2)
        {
            string? user_id = HttpContext.Session.GetString("Id");

            if (user_id == null || id == null || _context.Messages == null || _context.Users == null)
                return NotFound();

            var user = _context.Users.Where(c => c.Id == user_id).FirstOrDefault();
            if (user == null)
                return BadRequest();

            var message = _context.Messages.Where(m => (m.User == user && m.ContactId == id && m.Id == id2)).FirstOrDefault();
            if (message == null)
                return NotFound();

            return Json(message);
        }
        [HttpPut("contacts/{id}/messages/{id2}")]
        // Edits message with given id {id2} from/to user {id} who message with current session user.
        public async Task<IActionResult> ContactsIDMessagesID2PUT(string id, int id2, AddMessageRq messageRq)
        {
            string? user_id = HttpContext.Session.GetString("Id");

            if (user_id == null || id == null || messageRq == null || messageRq.Content == null|| _context.Messages == null || _context.Users == null)
                return NotFound();

            var user = _context.Users.Where(c => c.Id == user_id).FirstOrDefault();
            if (user == null)
                return BadRequest();

            var message = _context.Messages.Where(m => (m.User == user && m.ContactId == id && m.Id == id2)).FirstOrDefault();
            if (message == null)
                return NotFound();

            // change its content with the new one.
            message.Content = messageRq.Content;
            // try to update and save.
            try
            {
                _context.Update(message);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound(); // TODO: not sure what to return when fail.
            }
            return NoContent();
        }
        // Removes message from/to {id}, with current session user, with id = {id2}.
        [HttpDelete("contacts/{id}/messages/{id2}")]
        public async Task<IActionResult> ContactsIDMessagesID2DELETE(string id, int id2)
        {
            string? user_id = HttpContext.Session.GetString("Id");

            if (user_id == null || id == null || _context.Messages == null || _context.Users == null)
                return NotFound();

            var user = _context.Users.Where(c => c.Id == user_id).FirstOrDefault();
            if (user == null)
                return BadRequest();

            var message = _context.Messages.Where(m => (m.User == user && m.ContactId == id && m.Id == id2)).FirstOrDefault();
            if (message == null)
                return NotFound();

            try
            {
                _context.Remove(message);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound(); // TODO: not sure what to return when fail.
            }
            return NoContent();
        }

        // So I assume that it is someone in this server adding someone from other server (to their contacts).
        [HttpPost("invitations")]
        public async Task<IActionResult> InvitationsPOST(Invitation invitation)
        {
            if (_context.Contacts == null || _context.Users == null)
                return NotFound();

            var user = _context.Users.Where(c => c.Id == invitation.To).FirstOrDefault();
            if (user == null)
                return BadRequest();

            // Notice: we can't check if contact info is actually valid, as it could be different servers from us (it is missing feature from API).
            Contact contact = new Contact();
            // From is the one sending the invitation, and it is from other server.
            contact.User = user;
            contact.Id = invitation.From; // id of new contact.
            contact.Name = invitation.From; // Note: the user recieving didn't pick a nickname for the contact, so we place its username.
            contact.Server = invitation.Server;
            contact.Lastdate = null;
            contact.Last = null;

            try
            {
                _context.Add(contact);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound(); // TODO: not sure what to return when fail.
            }
            return Accepted();
        }
        // Adds new message between two users.
        [HttpPost("transfer")]
        public async Task<IActionResult> TransferPOST([Bind("From,To,Content")] Transfer transfer)
        {
            
            if (_context.Contacts == null || _context.Users == null)
                return NotFound();

            var user = _context.Users.Where(c => c.Id == transfer.To).FirstOrDefault();
            if (user == null)
                return BadRequest();

            var contact = _context.Contacts.Where(c => c.User == user && c.Id == transfer.From).FirstOrDefault();
            if (contact == null)
                return BadRequest();

            DateTime date = DateTime.Now;
            // create new message object with the new info.
            Message message = new Message
            {
                User = user,
                ContactId = transfer.From,
                Content = transfer.Content,
                Created = date,
                Sent = false // called by the one that created the message (external or local), so the user it linked to didn't send it.
            };
            // try to add and update.
            try
            {
                _context.Add(message);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound(); // TODO: not sure what to return when fail.
            }

            // update the last date and last message for the content we got message from.
            contact.Lastdate = date;
            contact.Last = transfer.Content;

            try
            {
                _context.Update(contact);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound(); // TODO: not sure what to return when fail.
            }
            return Accepted();
        }
    }
}
