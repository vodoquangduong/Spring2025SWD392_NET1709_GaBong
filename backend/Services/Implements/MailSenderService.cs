using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;


namespace Services.Implements
{
    public class MailSenderService : IMailSenderService
    {
        private readonly IConfiguration _config;

        public MailSenderService(IConfiguration config)
        {
            _config = config;
        }
        public bool SendResetEmail(string toEmail, string name, string token, string subject)
        {
            try
            {
                string url = $"{_config["ClientUrl"]}/authentication/reset-password?token={token}";
                var message = new MailMessage()
                {
                    From = new MailAddress(_config["Mail:Address"], _config["Mail:DisplayName"]),
                    Subject = subject,
                    IsBodyHtml = true,
                   // Body = GetResetContent(name, url),
                };
                message.To.Add(toEmail);
                var smtp = new SmtpClient(_config["Mail:Host"])
                {
                    Port =
                        _config["Mail:Port"] != null ? Convert.ToInt32(_config["Mail:Port"]) : 587,
                    Credentials = new NetworkCredential(
                        _config["Mail:Address"],
                        _config["Mail:AppPassword"]
                    ),
                    EnableSsl = bool.Parse(_config["Mail:EnableSsl"]),
                };
                smtp.Send(message);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        public bool SendVerifyEmail(string toEmail, string name, string token, string subject)
        {
            try
            {
                string url = $"{_config["ClientUrl"]}/authentication/verify-gmail?token={token}";
                var message = new MailMessage()
                {
                    From = new MailAddress(_config["Mail:Address"], _config["Mail:DisplayName"]),
                    Subject = subject,
                    IsBodyHtml = true,
                    //Body = GetVerifyContent(name, url),
                };
                message.To.Add(toEmail);
                var smtp = new SmtpClient(_config["Mail:Host"])
                {
                    Port =
                        _config["Mail:Port"] != null ? Convert.ToInt32(_config["Mail:Port"]) : 587,
                    Credentials = new NetworkCredential(
                        _config["Mail:Address"],
                        _config["Mail:AppPassword"]
                    ),
                    EnableSsl = bool.Parse(_config["Mail:EnableSsl"]),
                };
                smtp.Send(message);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }
    }
}
