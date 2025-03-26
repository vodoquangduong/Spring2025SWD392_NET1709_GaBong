using Helpers.HelperClasses;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Services.Implements
{
    public class AdminConfigService : IAdminConfigService
    {
        private AdminConfig _config = new();

        public AdminConfigService()
        {
            LoadConfig();
        }

        private void LoadConfig()
        {
            if (File.Exists(AdminConfig.AdminConfigFile))
            {
                var json = File.ReadAllText(AdminConfig.AdminConfigFile);
                _config = JsonSerializer.Deserialize<AdminConfig>(json) ?? new AdminConfig();
            }
            else
            {
                _config = new AdminConfig();
            }
        }

        public AdminConfig GetConfig()
        {
            return _config;
        }

        public async Task<bool> UpdateConfig(AdminConfig newConfig)
        {
            try
            {
                var json = JsonSerializer.Serialize(newConfig, new JsonSerializerOptions { WriteIndented = true });
                await File.WriteAllTextAsync(AdminConfig.AdminConfigFile, json);

                // Reload the config after updating
                LoadConfig();

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating config: {ex.Message}");
                return false;
            }
        }
    }
}
