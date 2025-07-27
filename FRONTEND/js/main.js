const incomeCategoryEnum = {};
const expenseCategoryEnum = {};

async function fetchCategories() {
    const response1 = await fetch('http://localhost:5152/api/enum/income-categories');
    const incomeCategories = await response1.json();
    Object.assign(incomeCategoryEnum, incomeCategories);

    const response2 = await fetch('http://localhost:5152/api/enum/expense-categories');
    const expenseCategories = await response2.json();
    Object.assign(expenseCategoryEnum, expenseCategories);

    document.querySelector('#income-category').innerHTML = '';
    for (const key in incomeCategoryEnum) {
        if (Object.hasOwnProperty.call(incomeCategoryEnum, key)) {
            const option = document.createElement('option');
            option.value = key;
            option.innerText = incomeCategoryEnum[key];
            document.querySelector('#income-category').appendChild(option);
        }
    }
    
    document.querySelector('#expense-category').innerHTML = '';
    for (const key in expenseCategoryEnum) {
        if (Object.hasOwnProperty.call(expenseCategoryEnum, key)) {
            const option = document.createElement('option');
            option.value = key;
            option.innerText = expenseCategoryEnum[key];
            document.querySelector('#expense-category').appendChild(option);
        }
    }
}

async function downloadAndDisplay() {
    const response1 = await fetch('http://localhost:5152/api/income');
    const incomes = await response1.json();

    const response2 = await fetch('http://localhost:5152/api/expense');
    const expenses = await response2.json();

    document.querySelector('#income-all').innerHTML = '';
    document.querySelector('#expense-all').innerHTML = '';

    if (incomes.length > 0 || document.querySelectorAll('#income-list .budget__table-empty').length === 0) {
        document.querySelector('#income-list').innerHTML = '';
    }
    if(incomes.length == 0 && document.querySelectorAll('#income-list .budget__table-empty').length == 0) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.classList.add('budget__table-empty');
        td.setAttribute('colspan', '5');
        td.innerText = 'No incomes added yet.';
        tr.appendChild(td);
        document.querySelector('#income-list').appendChild(tr);
    }
    if (expenses.length > 0 || document.querySelectorAll('#expense-list .budget__table-empty').length === 0) {
        document.querySelector('#expense-list').innerHTML = '';
    }
    if(expenses.length == 0 && document.querySelectorAll('#expense-list .budget__table-empty').length == 0) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.classList.add('budget__table-empty');
        td.setAttribute('colspan', '5');
        td.innerText = 'No expenses added yet.';
        tr.appendChild(td);
        document.querySelector('#expense-list').appendChild(tr);
    }
    
    let incomeId = 1;
    incomes.map(income => {
        let tr = document.createElement('tr');
        let tdID = document.createElement('td');
        let tdCategory = document.createElement('td');
        let tdAmount = document.createElement('td');
        let tdDate = document.createElement('td');
        let tdAction = document.createElement('td');

        tdID.innerText = incomeId++;
        tdCategory.innerText = incomeCategoryEnum[income.category];
        tdAmount.innerText = income.amount + '€';
        tdDate.innerText = new Date(income.date).toLocaleDateString('en-GB');
        tdAction.innerHTML = `<button class="budget__button budget__button--delete" onclick="deleteIncome(${income.id})">X</button>`;

        tr.appendChild(tdID);
        tr.appendChild(tdCategory);
        tr.appendChild(tdAmount);
        tr.appendChild(tdDate);
        tr.appendChild(tdAction);

        document.querySelector('#income-list').appendChild(tr);
    });

    let expenseId = 1;
    expenses.map(expense => {
        let tr = document.createElement('tr');
        let tdID = document.createElement('td');
        let tdCategory = document.createElement('td');
        let tdAmount = document.createElement('td');
        let tdDate = document.createElement('td');
        let tdAction = document.createElement('td');

        tdID.innerText = expenseId++;
        tdCategory.innerText = expenseCategoryEnum[expense.category];
        tdAmount.innerText = expense.amount + '€';
        tdDate.innerText = new Date(expense.date).toLocaleDateString('en-GB');
        tdAction.innerHTML = `<button class="budget__button budget__button--delete" onclick="deleteExpense(${expense.id})">Delete</button>`;

        tr.appendChild(tdID);
        tr.appendChild(tdCategory);
        tr.appendChild(tdAmount);
        tr.appendChild(tdDate);
        tr.appendChild(tdAction);

        document.querySelector('#expense-list').appendChild(tr);
    });

    let sumAmounts = arr => arr.reduce((sum, item) => sum + item.amount, 0);
    let allIncome = sumAmounts(incomes);
    let allExpense = sumAmounts(expenses);
    let grossCashFlow = allIncome + allExpense;

    let percantageIncome = Math.round((allIncome / grossCashFlow) * 100, 0) || 0;
    let percantageExpense = Math.round((allExpense / grossCashFlow) * 100, 0) || 0;
    let degreeIncome = percantageIncome * 3.6;
    let degreeExpense = percantageExpense * 3.6;

    document.querySelector('#income-bar-text').innerHTML = allIncome + '€';
    document.querySelector('#expense-bar-text').innerHTML = allExpense + '€';

    document.querySelector('#income-all').innerHTML += allIncome + '€';
    document.querySelector('#expense-all').innerHTML += allExpense + '€';
    document.querySelector('#total').innerHTML = (allIncome - allExpense) + '€';
    
    document.querySelector('#income-percentage').innerHTML = percantageIncome + '%';
    document.querySelector('#expense-percentage').innerHTML = percantageExpense + '%';

    document.querySelector('#piechart').style.backgroundImage = 
        'conic-gradient(' +
        'var(--color-danger) 0deg ' + degreeExpense + 'deg, ' +
        'var(--color-success) ' + degreeExpense + 'deg 360deg)';

    document.querySelector('#income-bar').style.height = (percantageIncome * 2) + 'px';
    document.querySelector('#expense-bar').style.height = (percantageExpense * 2) + 'px';
}

fetchCategories();
downloadAndDisplay();

function deleteExpense(ID) {
    fetch('http://localhost:5152/api/expense/' + ID, {
        method: 'DELETE',
        headers: { 'Content-Type' : 'application/json' },
        body: null
    })
    .then(resp => {
        if (resp.status === 200) {
            downloadAndDisplay();
        }
    });
}

function deleteIncome(ID) {
    fetch('http://localhost:5152/api/income/' + ID, {
        method: 'DELETE',
        headers: { 'Content-Type' : 'application/json' },
        body: null
    })
    .then(resp => {
        if (resp.status === 200) {
            downloadAndDisplay();
        }
    });
}

function createIncome() {
    let amount = document.querySelector('#income-amount').value;
    let date = document.querySelector('#income-date').value;
    let category = document.querySelector('#income-category').value;

    fetch('http://localhost:5152/api/income/', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
            amount: amount,
            date: date,
            category: Number(category)
        })
    })
    .then(resp => {
        if (resp.status === 200) {
            downloadAndDisplay();
        }
    })
    .catch(error => console.log(error));
}

function createExpense() {
    let amount = document.querySelector('#expense-amount').value;
    let date = document.querySelector('#expense-date').value;
    let category = document.querySelector('#expense-category').value;

    fetch('http://localhost:5152/api/expense/', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
            amount: amount,
            date: date,
            category: Number(category)
        })
    })
    .then(resp => {
        if (resp.status === 200) {
            downloadAndDisplay();
        }
    })
    .catch(error => console.log(error));
}