namespace Helpers.DTOs.PayPal.Model
{
    public class Address
    {
        public string address_line_1 { get; set; } = string.Empty;
        public string address_line_2 { get; set; } = string.Empty;
        public string admin_area_2 { get; set; } = string.Empty;
        public string admin_area_1 { get; set; } = string.Empty;
        public string postal_code { get; set; } = string.Empty;
        public string country_code { get; set; } = string.Empty;
    }
}
