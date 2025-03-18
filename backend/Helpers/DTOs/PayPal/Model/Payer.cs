namespace Helpers.DTOs.PayPal.Model
{
    public sealed class Payer
    {
        public Name name { get; set; }
        public string email_address { get; set; }
        public string payer_id { get; set; }
    }
}