using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.DTOs.Project
{
    public class VerrifiedProjectDTO
    {
        public long ProjectId { get; set; }
        
        public bool IsVerified { get; set; }
    }
}
