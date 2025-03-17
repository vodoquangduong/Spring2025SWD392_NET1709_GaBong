namespace Services.Interfaces
{
    public interface IMailSenderService
    {
        public bool SendVerifyEmail(string toEmail, string name, string token, string subject);
        public bool SendResetEmail(string toEmail, string name, string token, string subject);
    }
}
