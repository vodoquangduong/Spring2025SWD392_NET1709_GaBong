namespace Helpers.DTOs.PayPal.Model
{
    public sealed class PurchaseUnit
    {
        public Amount amount { get; set; } = new Amount();
        public string transactionId { get; set; } = string.Empty;
        public Shipping shipping { get; set; } = new Shipping();
        public Payments payments { get; set; } = new Payments();
    }

}