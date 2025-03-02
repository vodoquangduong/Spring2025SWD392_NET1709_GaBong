using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.DTOs.PayPal
{

    public class CaptureRequest
    {
        public string OrderId { get; set; }
    }
}
