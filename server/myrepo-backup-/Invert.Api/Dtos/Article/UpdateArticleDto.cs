using System.ComponentModel.DataAnnotations;

namespace Invert.Api.Dtos.Article
{
      public record UpdateArticleDto(string? Title, string? ContentJson);
}
