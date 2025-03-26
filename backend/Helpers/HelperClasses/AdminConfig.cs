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
        /// <summary>
        /// Fee per projec in %
        /// </summary>
        ///<example>10</example>
        public decimal ProjectFee { get; set; } = 10M;
        /// <summary>
        /// Fee per bid in $
        /// </summary>
        ///<example>2</example>
        public decimal BidFee { get; set; } = 2M;
        /// <summary>
        /// Fee per withdrawal in $
        /// </summary>
        /// <example>2</example>
        public decimal WithdrawalFee { get; set; } = 2M;
    }

    public class ReputationPolicy
    {
        /// <summary>
        /// Reputaion gain on completing milestone before deadline
        /// </summary>
        /// <example>200</example>
        public int BeforeDeadline { get; set; } = 200;
        /// <summary>
        /// Reputaion gain on completing milestone on deadline
        /// </summary>
        /// <example>100</example>
        public int RightDeadline { get; set; } = 100;
        /// <summary>
        /// Reputaion loss on completing milestone late by 1 day
        /// </summary>
        /// <example>-50</example>
        public int EarlylateDeadline { get; set; } = -50;
        /// <summary>
        /// Reputaion loss on completing milestone late by more than 1 day
        /// </summary>
        /// <example>-150</example>
        public int LateDeadline { get; set; } = -150;
        /// <summary>
        /// Reputaion gain on completing project on deadline
        /// </summary>
        /// <example>200</example>
        public int CompleteProject { get; set; } = -200;
    }
}
