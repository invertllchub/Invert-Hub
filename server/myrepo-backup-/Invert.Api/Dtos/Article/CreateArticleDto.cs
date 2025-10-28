namespace Invert.Api.Dtos.Article
{
    public class CreateArticleDto
    {
        public Guid Id { get; init; }
        public string Title { get; init; } = string.Empty;
        public string ContentJson { get; init; } = string.Empty;
        public DateTime CreatedAt { get; init; }

        //public record CreateArticleDto(string Title, string ContentJson);

        //// Application/Articles/Dtos/UpdateArticleDto.cs
        //
    }
}
