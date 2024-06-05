namespace FineMaster.Server.ViewModels
{
    public class ChatMessage
    {
        public int ID { get; set; }
        public string Message { get; set; }
        public string senderID { get; set; }
        public string receiverID { get; set; }
        public DateTime date { get; set; }
    }
}
