namespace Invert.Api.Entities
{
    public class Article
    {
        public Guid Id { get; private set; } = Guid.NewGuid(); // Generate Id automatically if not using DB auto-gen
        public string Title { get; private set; }
        public string ContentJson { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public DateTime? UpdatedAt { get; private set; }

        public Article(string title, string contentJson)
        {
            Title = title;
            ContentJson = contentJson;
            CreatedAt = DateTime.UtcNow;
        }

        public void UpdateContent(string newContentJson)
        {
            ContentJson = newContentJson;
            UpdatedAt = DateTime.UtcNow;
        }

        // Add method to update Title if needed
        public void UpdateTitle(string newTitle)
        {
            Title = newTitle;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}

