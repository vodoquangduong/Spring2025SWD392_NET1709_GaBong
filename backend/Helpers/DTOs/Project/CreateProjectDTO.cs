using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Helpers.DTOs.Project
{
    public class CreateProjectDTO
    {
        [Required]
        public string ProjectDescription { get; set; } = string.Empty;
    }
}