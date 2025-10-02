using Invert.Api.Dtos;
using Invert.Api.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Invert.Api.Controllers;

[ApiController]
[Route("[controller]")]
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
    [Authorize(Roles = "Admin")]
    public IActionResult Create([FromBody] CreateProjectDto dto)
    {
        //create project by ProjectService and add validation and exception handling
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
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var project = await _service.GetByIdAsync(id);
        return Ok(project);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Update([FromRoute] int id, [FromBody] ProjectDto dto)
    {
        if (dto.Id != id) return BadRequest("Id mismatch.");

        if (ModelState.IsValid == false)
        {
            return BadRequest(ModelState);
        }
        try
        {
            _service.UpdateAsync(dto);
            return Ok("Project updated successfully.");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }


    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Delete([FromRoute] int id)
    {

        if (id == 0) return BadRequest("Id mismatch.");
        try
        {
            _service.DeleteAsync(id);
            return Ok("Project deleted successfully.");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    

    //end Point to Fact


}


