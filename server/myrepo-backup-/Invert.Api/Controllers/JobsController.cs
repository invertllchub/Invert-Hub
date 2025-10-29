using Invert.Api.Dtos.Article;
using Invert.Api.Dtos.Job;
using Invert.Api.Dtos.Project;
using Invert.Api.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Invert.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobsController : ControllerBase
{
    private readonly IJobService _service;
    public JobsController(IJobService service) => _service = service;


    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        //get all projects by ProjectService
        var jobs = await _service.GetAllAsync();
        return Ok(jobs);
    }


    [HttpPost]
    // [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] CreateJobDto dto)
    {
        // create job by JobService and add validation and exception handling
        try
        {
            var jobId = await _service.CreateJobAsync(dto);
            return Ok(new { JobId = jobId, Message = "Job created successfully." });
        }
        catch (Exception ex)            
        {
            return BadRequest(ex.Message);
        }

    }


    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var job = await _service.GetByIdAsync(id);
        if (job == null) return NotFound();
        return Ok(job);
    }

    [HttpPut("{id}")]
    // [Authorize(Roles = "Admin")]
    public async Task<IActionResult>  Update(int id, [FromBody] UpdateJobDto dto)
    {
        var existingJob = _service.GetByIdAsync(id);
        if (existingJob == null) return NotFound();

        if (ModelState.IsValid == false)
        {
            return BadRequest(ModelState);
        }
        try
        {
            await _service.UpdateJobAsync(id, dto);
            return Ok("Job updated successfully.");
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
            await _service.DeleteJobAsync(id);
            return Ok("Job deleted successfully.");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}


