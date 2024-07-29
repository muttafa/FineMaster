using System.ComponentModel.DataAnnotations;

namespace FineMaster.Server.Models
{
    public class Profiler
    {
        [Key]
        public int ProfileID { get; set; }

        public int? UserID { get; set; }

        public string UP_Code { get; set; }
    }
}
