using System.ComponentModel.DataAnnotations;

namespace Reviews_WebApp.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [Range(1,5)]
        public int Grade { get; set; }

        public string Feedback { get; set; }

        public DateTime Date { get; set; }
    }
}
