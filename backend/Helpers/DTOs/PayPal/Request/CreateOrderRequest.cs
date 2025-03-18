using Helpers.DTOs.PayPal.Model;


namespace Helpers.DTOs.PayPal.Request
{
    public sealed class CreateOrderRequest
    {
        public string intent { get; set; }
        public List<PurchaseUnit> purchase_units { get; set; } = new();
    }

}