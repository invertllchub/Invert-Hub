namespace Invert.Api.Dtos.Job
{
    public record CreateJobDto(
        string Title,
        string Location,
        string EmploymentType,
        string ExperienceLevel,
        string Salary,
        string Status,
        string DatePosted,
        string ClosingDate,
        string Description,
        string Requirements, // JSON string of array
        string Skills,       // JSON string of array
        string Benefits      // JSON string of array
    );
}