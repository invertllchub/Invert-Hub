﻿using System.ComponentModel.DataAnnotations.Schema;

namespace Invert.Api.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public string? AnimatedText { get; set; } = string.Empty;
        public string? Overview { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string? pathImg { get; set; } = string.Empty;

        public bool IsActive { get; set; }

        //array of images
        public List<string>? Images { get; set; }
        public ICollection<Fact> Facts { get; set; } = new List<Fact>();

    }
}
