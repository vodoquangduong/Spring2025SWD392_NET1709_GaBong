namespace Helpers.DTOs
{
    public class ContractDTO
    {
        public long ContractId { get; set; }
        public long ProjectId { get; set; }
        public string ContractPolicy { get; set; } = string.Empty;
        public string StartDate { get; set; } = string.Empty;
    }
}