namespace Invert.Api.Dtos.Job
{
    public class JobDto
    {
        public int Id { get; init; }
        public string Title { get; init; } = string.Empty;
        public string Location { get; init; } = string.Empty;
        public string EmploymentType { get; init; } = string.Empty;
        public string ExperienceLevel { get; init; } = string.Empty;
        public string Salary { get; init; } = string.Empty;
        public string Status { get; init; } = string.Empty;
        public DateTime DatePosted { get; init; }
        public DateTime ClosingDate { get; init; }
        public string Description { get; init; } = string.Empty;
        public string[] Requirements { get; init; } = Array.Empty<string>();
        public string[] Skills { get; init; } = Array.Empty<string>();
        public string[] Benefits { get; init; } = Array.Empty<string>();
    }
}
