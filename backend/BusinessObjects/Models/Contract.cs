using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjects.Models
{
    public class Contract
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("contract_id")]
        public long ContractId { get; set; }

        [Column("project_id")]
        public long ProjectId { get; set; }
        [Column("contract_policy")]
        public string ContractPolicy { get; set; } = string.Empty;
        [Column("start_date")]
        public DateTime StartDate { get; set; }
        // Navigation properties
        [ForeignKey("ProjectId")]
        public Project Project { get; set; } = null!;



    }
}