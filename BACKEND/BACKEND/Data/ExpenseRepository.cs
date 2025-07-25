using BACKEND.Models;

namespace BACKEND.Data
{
    public class ExpenseRepository : IExpenseRepository
    {
        AppDbContext db;

        public ExpenseRepository(AppDbContext db)
        {
            this.db = db;
        }

        public void Create(Expense expense)
        {
            this.db.Add(expense);

            db.SaveChanges();
        }

        public void Update(Expense expense)
        {
            Expense expenseToUpdate = this.Read(expense.ID);

            expenseToUpdate.Date = expense.Date;
            expenseToUpdate.Amount = expense.Amount;
            expenseToUpdate.Category = expense.Category;

            db.SaveChanges();
        }

        public void Delete(int id)
        {
            Expense expenseToDelete = this.Read(id);
            this.db.Remove(expenseToDelete);

            db.SaveChanges();
        }

        public Expense? Read(int id)
        {
            return this.db.Expenses.FirstOrDefault(x => x.ID == id);
        }
        public IEnumerable<Expense> Read()
        {
            return this.db.Expenses;
        }
    }
}
