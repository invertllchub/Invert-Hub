namespace Invert.Api.Entities
{

    public class ProjectImage
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Url { get; set; } = string.Empty;

        //array of images
        // public List<string> Images { get; set; } = null!;

        public Project Project { get; set; } = null!;
    }

}
