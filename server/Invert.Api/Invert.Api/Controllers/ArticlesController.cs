using Invert.Api.Dtos;
using Invert.Api.Dtos.Article;
using Invert.Api.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Invert.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ArticlesController : ControllerBase
{
    private readonly IArticleService _service;
    public ArticlesController(IArticleService service) => _service = service;

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateArticleDto dto)
    {
        // create new article
        var articleId = await _service.CreateArticleAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = articleId }, null);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var article = await _service.GetByIdAsync(id);
        if (article == null) return NotFound();
        return Ok(article);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateArticleDto dto)
    {
        // Ensure the article exists
        var existingArticle = await _service.GetByIdAsync(id);
        if (existingArticle == null) return NotFound();

        await _service.UpdateArticleAsync(id, dto);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        // Ensure the article exists
        var existingArticle = await _service.GetByIdAsync(id);
        if (existingArticle == null) return NotFound();

        await _service.DeleteArticleAsync(id);
        return NoContent();
    }
}