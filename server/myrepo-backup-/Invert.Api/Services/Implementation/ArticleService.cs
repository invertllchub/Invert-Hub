using AutoMapper;
using Invert.Api.Data;
using Invert.Api.Dtos;
using Invert.Api.Dtos.Article;
using Invert.Api.Entities;
using Invert.Api.Repositories.Implementation;
using Invert.Api.Repositories.Interface;
using Invert.Api.Services.Interface;
using System.Text.Json;

namespace Invert.Api.Services.Implementation
{
    public class ArticleService : IArticleService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<ArticleService> _logger;

        public ArticleService(IUnitOfWork unitOfWork, ILogger<ArticleService> logger)
        {
            _unitOfWork = unitOfWork;

            _logger = logger;
        }

        public async Task<Guid> CreateArticleAsync(CreateArticleDto dto)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(dto.Title))
            {
                throw new ArgumentException("Title is required.");
            }
            if (string.IsNullOrWhiteSpace(dto.ContentJson))
            {
                throw new ArgumentException("ContentJson is required.");
            }

            // Create new article entity
            var article = new Article(dto.Title, dto.ContentJson);


            _unitOfWork.Article.Add(article);
            _unitOfWork.Save(); // Use async save for better performance
            return article.Id;
        }

        public async Task DeleteArticleAsync(Guid id)
        {
            // Delete article by id
            var article = _unitOfWork.Article.Get(a => a.Id == id);
            if (article == null) throw new KeyNotFoundException($"Article with id {id} not found");
            _unitOfWork.Article.Remove(article);
            _unitOfWork.Save();
        }

        public async Task<IEnumerable<ArticleDto>> GetAllAsync()
        {
            // Get all articles
            var articles = _unitOfWork.Article.GetAll();
            var articleDtos = articles.Select(a => new ArticleDto
            {
                Id = a.Id,
                Title = a.Title,
                ContentJson = a.ContentJson,
                CreatedAt = a.CreatedAt
            });
            return articleDtos;
        }

        public async Task<ArticleDto?> GetByIdAsync(Guid id)
        {
            // Get article by id
            var article = _unitOfWork.Article.Get(a => a.Id == id);
            if (article == null) return null;
            return new ArticleDto
            {
                Id = article.Id,
                Title = article.Title,
                ContentJson = article.ContentJson,
                CreatedAt = article.CreatedAt
            };
        }

        public async Task UpdateArticleAsync(Guid id, UpdateArticleDto dto)
        {
            // Update article by id
            var article = _unitOfWork.Article.Get(a => a.Id == id);
            if (article == null) throw new KeyNotFoundException($"Article with id {id} not found");

            if (!string.IsNullOrEmpty(dto.Title))
                article.UpdateTitle(dto.Title); // Assuming UpdateTitle is a method in Entity to handle title updates

            if (!string.IsNullOrEmpty(dto.ContentJson))
                article.UpdateContent(dto.ContentJson); // Assuming UpdateContent is a method in Entity to handle JSON updates


            _unitOfWork.Article.Update(article);
            _unitOfWork.Save();
        }
    }
}