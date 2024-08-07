using FineMaster.Server.Models;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;

public class PaymentTestClass
{
    private readonly ApplicationDBContext _dbContext;

    // Dependency Injection ile ApplicationDBContext'i alıyoruz
    public PaymentTestClass(ApplicationDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public void ProcessPayments()
    {
        // Veritabanından ödeme yapılmamış kullanıcıları alıyoruz
        List<Users> users = _dbContext.Users.Where(x => x.IsPayment == false || x.IsPayment == null).ToList();

        foreach (var user in users)
        {
            // RabbitMQ kuyruğuna mesaj gönder
            SendRabbitMQMessage(user);
        }
        Console.WriteLine("Hangfire çalıştı ve RabbitMQ mesajları gönderildi");
    }

    private void SendRabbitMQMessage(Users user)
    {
        var factory = new ConnectionFactory() { HostName = "localhost" };
        using (var connection = factory.CreateConnection())
        using (var channel = connection.CreateModel())
        {
            channel.QueueDeclare(queue: "paymentQueue", durable: false, exclusive: false, autoDelete: false, arguments: null);

            string message = $"User {user.ID} payment to be processed.";
            var body = System.Text.Encoding.UTF8.GetBytes(message);

            channel.BasicPublish(exchange: "", routingKey: "paymentQueue", basicProperties: null, body: body);
            Console.WriteLine($"Kullanıcı {user.ID} için mesaj RabbitMQ kuyruğuna eklendi");

            // Ödeme işlemini tetikle
            ProcessPayment(user);
            
        }
    }

    private void ProcessPayment(Users user)
    {
        try
        {
            // Buraya ödeme işlemi entegrasyonunu ekleyin
            bool paymentSuccess = true; // Ödeme işlemi başarı durumu

            if (paymentSuccess)
            {
                // Ödeme işlemi başarılı olursa kullanıcıyı güncelle
                user.IsPayment = true;
                _dbContext.SaveChanges();
                Console.WriteLine($"Kullanıcı {user.ID} için ödeme işlemi başarılı oldu ve veritabanı güncellendi");
            }
        }
        catch (Exception ex)
        {
            // Hata yönetimi burada yapılacak
            Console.WriteLine($"Kullanıcı {user.ID} için ödeme işlemi başarısız oldu: {ex.Message}");
        }
    }
}
