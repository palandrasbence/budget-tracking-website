using BACKEND.Models;

namespace BACKEND.Data
{
    public interface IExpenseRepository
    {
        void Create(Expense expense);
        void Delete(int id);
        IEnumerable<Expense> Read();
        Expense? Read(int id);
        void Update(Expense expense);
    }
}
