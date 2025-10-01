namespace Invert.Api.Entities
{
    public class Fact
    {
        public int Id { get; set; }
        public int number { get; set; }
        public string? label { get; set; } = string.Empty;
        public string? Text { get; set; } = string.Empty;
        public string? pathImg { get; set; } = string.Empty;

        public int ProjectId { get; set; }
        public Project Project { get; set; } = null!;
    }
}
