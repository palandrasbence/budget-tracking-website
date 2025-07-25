using BACKEND.Models;

namespace BACKEND.Data
{
    public interface IIncomeRepository
    {
        void Create(Income income);
        void Delete(int id);
        IEnumerable<Income> Read();
        Income? Read(int id);
        void Update(Income income);
    }
}
