using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.HelperClasses
{
    public class AdminConfig
    {
        public static string AdminConfigFile = "adminconfig.json";
        public PaymentPolicy PaymentPolicy { get; set; } = new();
        public ReputationPolicy ReputationPolicy { get; set; } = new();
    }

    public class PaymentPolicy
    {
        public decimal ProjectFee { get; set; }
        public decimal BidFee { get; set; }
        public decimal WithdrawalFee { get; set; }
    }

    public class ReputationPolicy
    {
        public int BeforeDeadline { get; set; }
        public int RightDeadline { get; set; }
        public int EarlylateDeadline { get; set; }
        public int LateDeadline { get; set; }
        public int CompleteProject { get; set; }
    }
}
