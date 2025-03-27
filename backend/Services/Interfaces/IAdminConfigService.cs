using Helpers.HelperClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IAdminConfigService
    {
        AdminConfig GetConfig();

        Task<bool> UpdateConfig(AdminConfig adminConfig);
    }
}
