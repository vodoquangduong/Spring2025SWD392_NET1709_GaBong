using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Helpers.DTOs.Portfolio
{
    public class UpdatePortfolioDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Works { get; set; } = string.Empty;
        public string Certificate { get; set; } = string.Empty;
        public string About { get; set; } = string.Empty;
    }
}