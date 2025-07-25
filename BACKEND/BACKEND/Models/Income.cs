using System.ComponentModel.DataAnnotations;

namespace BACKEND.Models
{
    public enum IncomeCategory
    {
        [Display(Name = "Salary")]
        Salary = 0,

        [Display(Name = "Freelance")]
        Freelance = 1,

        [Display(Name = "Investments")]
        Investments = 2,

        [Display(Name = "Gifts")]
        Gifts = 3,

        [Display(Name = "Other")]
        Other = 4
    }
    public class Income
    {
        [Key]
        public int ID { get; set; }
        public string Desc { get; set; }
        public int Amount { get; set; }
        public IncomeCategory Category { get; set; }
    }
}
