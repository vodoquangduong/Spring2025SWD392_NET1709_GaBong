using System.ComponentModel.DataAnnotations;
using Helpers.HelperClasses;

namespace Helpers.DTOs.Bid
{
    public class CreateBidDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Project ID")]
        public long ProjectId { get; set; } = long.MinValue;
       
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Range(0, double.MaxValue, ErrorMessage = "Bid offer must be a positive number")]
        [Display(Name = "Bid offer")]
        public decimal BidOffer { get; set; } = 0;

        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Bid description")]
        public string BidDescription { get; set; } = string.Empty;
    }
}
