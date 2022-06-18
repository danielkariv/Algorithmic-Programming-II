using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Messenger_WebAPI.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        [JsonIgnore]
        public string ContactId { get; set; }
        public string Content { get; set; }

        public DateTime Created { get; set; }

        public bool Sent { get; set; }
    }
}
