namespace Helpers.DTOs.PayPal.Model
{
    public sealed class Paypal
    {
        public Name name { get; set; } = new Name();
        public string email_address { get; set; } = string.Empty;
        public string account_id { get; set; } = string.Empty;
    }
}