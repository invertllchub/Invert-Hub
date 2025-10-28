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
        IEnumerable<string> Requirements,
        IEnumerable<string> Skills,
        IEnumerable<string> Benefits
    );
}