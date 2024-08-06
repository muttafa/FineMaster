using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

public class EmailService
{
    private readonly SmtpClient _smtpClient;

    public EmailService()
    {
        _smtpClient = new SmtpClient("smtp.gmail.com")
        {
            Port = 587,
            UseDefaultCredentials = false, 
            Credentials = new NetworkCredential("mucarr419@gmail.com", "mucarr.Klu21"), 
            EnableSsl = true
        };
    }

    public async Task SendEmailAsync(string recipientEmail, string subject, string body)
    {
        try
        {
            //var mailMessage = new MailMessage
            //{
            //    From = new MailAddress("mucarr419@gmail.com"),
            //    Subject = subject,
            //    Body = body,
            //    IsBodyHtml = true,
            //};

            //mailMessage.To.Add(recipientEmail);

            //await _smtpClient.SendMailAsync(mailMessage);
        }
        catch (Exception)
        {

            throw;
        }
        

    }
}
