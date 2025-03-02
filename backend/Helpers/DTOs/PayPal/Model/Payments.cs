using System.Text.RegularExpressions;

namespace Helpers.DTOs.PayPal.Model
{
    public sealed class Payments
    {
        public List<Capture> captures { get; set; }
    }
}