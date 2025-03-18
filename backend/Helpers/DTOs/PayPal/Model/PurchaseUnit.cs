namespace Helpers.DTOs.PayPal.Model
{
    public sealed class PurchaseUnit
    {
        public Amount amount { get; set; }
        public string transactionId { get; set; }
        public Shipping shipping { get; set; }
        public Payments payments { get; set; }
    }

}