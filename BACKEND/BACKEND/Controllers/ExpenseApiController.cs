using BACKEND.Data;
using BACKEND.Models;
using Microsoft.AspNetCore.Mvc;

namespace BACKEND.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController : ControllerBase
    {
        IExpenseRepository repository;

        public ExpenseController(IExpenseRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public IEnumerable<Expense> GetExpenses()
        {
            return this.repository.Read();
        }

        [HttpGet("{id}")]
        public Expense? GetExpense(int id)
        {
            return this.repository.Read(id);
        }

        [HttpPost]
        public void CreateExpense([FromBody] Expense expense)
        {
            this.repository.Create(expense);
        }

        [HttpPut]
        public void UpdateExpense([FromBody] Expense expense)
        {
            this.repository.Update(expense);
        }

        [HttpDelete("{id}")]
        public void DeleteExpense(int id)
        {
            this.repository.Delete(id);
        }
    }
}
