namespace Helpers.DTOs.Query
{
    public class AccountFilter
    {
        public const string SortReputation = "reputation";
        public const string SortTotalCredit = "total_credit";
        public const string SortCreatedAt = "created_at";
        /// <summary>
        /// Soft search by name
        /// </summary>
        public string? AccountName { get; set; }
        /// <summary>
        /// Filter by role 
        /// </summary>
        ///<example>"", "Admin", "Staff", "Client"</example>
        public string? AccountRole { get; set; }
        /// <summary>
        /// Filter by status 
        /// </summary>
        ///<example>"", "Active", "Suspended", "Banned"</example>
        public string? AccountStatus { get; set; }  //Enum.Parse<AccountStatus>()?
        /// <summary>
        /// Sort by "", "reputaion", "total_credit", "created_at"
        /// </summary>
        public string? SortBy { get; set; } //reputation, total_credit, created_at
    }
}
