using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.DTOs.PayPal.Model
{
    public class Amount
    {
        public string currency_code { get; set; }
        public string value { get; set; }
    }
}
