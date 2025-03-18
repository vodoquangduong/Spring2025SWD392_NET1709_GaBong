using Helpers.DTOs.PayPal.Model;

namespace Helpers.DTOs.PayPal.Response
{
    public sealed class CreateOrderResponse
    {
        public string id { get; set; }
        public string status { get; set; }
        public List<Link> links { get; set; }

    }
}
