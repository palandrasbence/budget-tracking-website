using BACKEND.Models;

namespace BACKEND.Data
{
    public interface IIncomeRepository
    {
        void Create(Income income);
        void Update(Income income);
        void Delete(int id);
        Income? Read(int id);
        IEnumerable<Income> Read();
    }
}
