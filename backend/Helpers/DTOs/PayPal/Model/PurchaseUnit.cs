using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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