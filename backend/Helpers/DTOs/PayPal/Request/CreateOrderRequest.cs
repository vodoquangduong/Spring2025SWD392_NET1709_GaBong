using Helpers.DTOs.PayPal.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Helpers.DTOs.PayPal.Request
{
    public sealed class CreateOrderRequest
	{
		public string intent { get; set; }
		public List<PurchaseUnit> purchase_units { get; set; } = new();
	}

}