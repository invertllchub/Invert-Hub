using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Invert.Api.Entities
{
    public class Article
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        
        [Required]
        [MaxLength(500)]
        public string Title { get; set; } = string.Empty;
        
        // Store EditorJS JSON as string
        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string ContentJson { get; set; } = string.Empty;
        
        [MaxLength(200)]
        public string? Author { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Constructor for creating new article
        public Article() { }

        public Article(string title, string contentJson, string? author = null)
        {
            Id = Guid.NewGuid();
            Title = title;
            ContentJson = contentJson;
            Author = author;
            CreatedAt = DateTime.UtcNow;
        }

        // Method to update article
        public void Update(string? title, string? contentJson, string? author)
        {
            if (!string.IsNullOrWhiteSpace(title))
                Title = title;
            
            if (!string.IsNullOrWhiteSpace(contentJson))
                ContentJson = contentJson;
            
            if (!string.IsNullOrWhiteSpace(author))
                Author = author;
            
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
