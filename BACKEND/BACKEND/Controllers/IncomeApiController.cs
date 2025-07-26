using BACKEND.Data;
using BACKEND.Models;
using Microsoft.AspNetCore.Mvc;

namespace BACKEND.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IncomeController : ControllerBase
    {
        IIncomeRepository repository;

        public IncomeController(IIncomeRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public IEnumerable<Income> GetIncomes()
        {
            return this.repository.Read();
        }

        [HttpGet("{id}")]
        public Income? GetIncome(int id)
        {
            return this.repository.Read(id);
        }

        [HttpPost]
        public void CreateIncome([FromBody] Income income)
        {
            this.repository.Create(income);
        }

        [HttpPut]
        public void UpdateIncome([FromBody] Income income)
        {
            this.repository.Update(income);
        }

        [HttpDelete("{id}")]
        public void DeleteIncome(int id)
        {
            this.repository.Delete(id);
        }
    }
}
