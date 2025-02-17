using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

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
        [ForeignKey("project_id")]
        public virtual Project Project { get; set; } = null!;
        
        

    }
}