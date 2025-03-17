namespace Helpers.DTOs.PayPal.Model
{
    public sealed class Paypal
    {
        public Name name { get; set; }
        public string email_address { get; set; }
        public string account_id { get; set; }
    }
}