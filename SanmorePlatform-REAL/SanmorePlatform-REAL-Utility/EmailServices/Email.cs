using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Utility.EmailServices
{
    public class EmailHelper
    {
        private readonly IConfiguration _configuration;
        public EmailHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<bool> SendEmailPasswordResetAsync(string userEmail, string Subject, string MsgBody)
        {
            // Gmail SMTP server details
            string smtpAddress = "smtp.gmail.com";
            int portNumber = 587;
            bool enableSSL = true;

            // Gmail username and password
            string emailFrom = "Chetutest1482@gmail.com";
            string password = "deepnhpxndiiltwd";

            // Email details
            string emailTo = userEmail;
            string subject = Subject;
            string body = MsgBody;

            try
            {
                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress(emailFrom);
                    mail.To.Add(emailTo);
                    mail.Subject = subject;
                    mail.Body = body;
                    mail.IsBodyHtml = true;
                    using (SmtpClient smtp = new SmtpClient(smtpAddress, portNumber))
                    {
                        smtp.Credentials = new NetworkCredential(emailFrom, password);
                        smtp.EnableSsl = enableSSL;
                        await smtp.SendMailAsync(mail);
                        return true;
                    }
                }
            }

            catch (Exception)
            {
            }
            return false;
        }
        // Gmail SMTP server details
    }
}
