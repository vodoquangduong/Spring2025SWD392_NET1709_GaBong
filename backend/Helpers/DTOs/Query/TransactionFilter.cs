using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.DTOs.Query
{
    public class TransactionFilter
    {
        public List<string> TransactionType { get; set; } = new List<string>();
    }
}
