using BACKEND.Models;

namespace BACKEND.Data
{
    public interface IExpenseRepository
    {
        void Create(Expense expense);
        void Update(Expense expense);
        void Delete(int id);
        Expense? Read(int id);
        IEnumerable<Expense> Read();
    }
}
