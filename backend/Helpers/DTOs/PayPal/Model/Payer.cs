namespace Helpers.DTOs.PayPal.Model
{
    public sealed class Payer
    {
        public Name name { get; set; } = new Name();
        public string email_address { get; set; } = string.Empty;
        public string payer_id { get; set; } = string.Empty;
    }
}