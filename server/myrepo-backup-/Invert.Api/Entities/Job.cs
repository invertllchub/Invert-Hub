namespace Invert.Api.Entities
{

    public class Job
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string EmploymentType { get; set; } = string.Empty;
        public string ExperienceLevel { get; set; } = string.Empty;
        public string Salary { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime DatePosted { get; set; }
        public DateTime ClosingDate { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Requirements { get; set; } = string.Empty; // Semicolon-separated
        public string Skills { get; set; } = string.Empty;       // Semicolon-separated
        public string Benefits { get; set; } = string.Empty;     // Semicolon-separated

    }
}
