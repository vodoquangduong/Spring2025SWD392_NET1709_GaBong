﻿using System.ComponentModel.DataAnnotations;
using Helpers.HelperClasses;

namespace Helpers.DTOs.Project
{
    public class ChooseFreelancerDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Project ID")]
        public long ProjectId { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Freelancer ID")]
        public long FreelancerId { get; set; }
        
    }
}
