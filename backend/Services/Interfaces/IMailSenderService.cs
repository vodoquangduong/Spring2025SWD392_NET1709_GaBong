using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IMailSenderService
    {
        public bool SendVerifyEmail(string toEmail, string name, string token, string subject);
        public bool SendResetEmail(string toEmail, string name, string token, string subject);

        //send more mail type
    }
}
