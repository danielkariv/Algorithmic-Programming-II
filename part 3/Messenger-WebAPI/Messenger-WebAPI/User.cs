using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Messenger_WebAPI.Models
{
    public class User
    {
        // Username
        public string Id { get; set; }
        // Display Name
        public string Name { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }

    }
}
