using BACKEND.Models;

namespace BACKEND.Data
{
    public class IncomeRepository : IIncomeRepository
    {
        AppDbContext db;

        public IncomeRepository(AppDbContext db)
        {
            this.db = db;
        }

        public void Create(Income income)
        {
            this.db.Add(income);

            db.SaveChanges();
        }

        public void Update(Income income)
        {
            Income incomeToUpdate = this.Read(income.ID);

            incomeToUpdate.Desc = income.Desc;
            incomeToUpdate.Amount = income.Amount;
            incomeToUpdate.Category = income.Category;

            db.SaveChanges();
        }

        public void Delete(int id)
        {
            Income incomeToDelete = this.Read(id);
            this.db.Remove(incomeToDelete);

            db.SaveChanges();
        }

        public Income? Read(int id)
        {
            return this.db.Incomes.FirstOrDefault(x => x.ID == id);
        }

        public IEnumerable<Income> Read()
        {
           return this.db.Incomes;
        }
    }
}
