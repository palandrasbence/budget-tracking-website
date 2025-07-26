using BACKEND.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace BACKEND.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnumController
    {
        [HttpGet("expense-categories")]
        public Dictionary<int, string> GetExpenseCategories()
        {
            Dictionary<int, string> categories = Enum.GetValues(typeof(ExpenseCategory))
                .Cast<ExpenseCategory>()
                .ToDictionary(
                    e => (int)e,
                    e => CultureInfo.CurrentCulture.TextInfo.ToTitleCase(e.ToString())
                );
            return categories;
        }

        [HttpGet("income-categories")]
        public Dictionary<int, string> GetIncomeCategories()
        {
            Dictionary<int, string> categories = Enum.GetValues(typeof(IncomeCategory))
                .Cast<IncomeCategory>()
                .ToDictionary(
                    e => (int)e,
                    e => CultureInfo.CurrentCulture.TextInfo.ToTitleCase(e.ToString())
                );
            return categories;
        }
    }
}
