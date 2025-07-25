using System.ComponentModel.DataAnnotations;

namespace BACKEND.Models
{
    public enum ExpenseCategory
    {
        [Display(Name = "Essential")]
        Essential = 0,

        [Display(Name = "Housing")]
        Housing = 1,

        [Display(Name = "Food")]
        Food = 2,

        [Display(Name = "Entertainment")]
        Entertainment = 3,

        [Display(Name = "Transportation")]
        Transportation = 4,

        [Display(Name = "Health")]
        Health = 5,
    }
    public class Expense
    {
        [Key]
        public int ID { get; set; }
        public DateOnly Date { get; set; }
        public string Desc { get; set; }
        public int Amount { get; set; }
        public ExpenseCategory Category { get; set; }
    }
}
