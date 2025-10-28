namespace Invert.Api.Dtos.Article
{
    public class ArticleDto
    {
        public Guid Id { get; init; }
        public string Title { get; init; } = string.Empty;
        public string ContentJson { get; init; } = string.Empty;
        public DateTime CreatedAt { get; init; }
        public DateTime? UpdatedAt { get; init; }
    }
}
