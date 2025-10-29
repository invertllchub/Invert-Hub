using Invert.Api.Dtos.Article;
using Invert.Api.Dtos.Project;
using Invert.Api.Entities;
using Invert.Api.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Invert.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _service;
    public ProjectsController(IProjectService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        //get all projects by ProjectService
        var projects = await _service.GetAllAsync();
        return Ok(projects);
    }


    [HttpPost]
    // [Authorize(Roles = "Admin")]
    public IActionResult Create([FromBody] CreateProjectDto dto)
    {
        //create project by ProjectService and add validation and exception handling
        if (!ModelState.IsValid) return BadRequest(ModelState);
        try
        {
            _service.CreateAsync(dto);
            return Ok("Project created successfully.");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }


    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var project = await _service.GetByIdAsync(id);
        if (project == null) return NotFound();
        return Ok(project);
    }

    [HttpPut("{id}")]
    // [Authorize(Roles = "Admin")]
    public async Task<IActionResult>  Update(int id, [FromForm] UpdateProjectDto dto)
    {
        var existingProject = _service.GetByIdAsync(id);
        if (existingProject == null) return NotFound();

        if (ModelState.IsValid == false)
        {
            return BadRequest(ModelState);
        }
        try
        {
            await _service.UpdateAsync(id, dto);
            return Ok("Project updated successfully.");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    // [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {

        if (id == 0) return BadRequest("Id mismatch.");
        try
        {
            await _service.DeleteAsync(id);
            return Ok("Project deleted successfully.");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}


