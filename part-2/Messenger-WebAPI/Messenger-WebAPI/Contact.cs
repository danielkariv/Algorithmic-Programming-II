using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Messenger_WebAPI.Models
{
    public class Contact
    {
        [JsonIgnore]
        [Key]
        public int Index { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        // Username (of contact)
        public string Id { get; set; }
        // DisplayName (of contact)
        public string Name { get; set; }

        public string Server { get; set; }

        public string? Last { get; set; }

        public DateTime? Lastdate { get; set; }
    }
}
