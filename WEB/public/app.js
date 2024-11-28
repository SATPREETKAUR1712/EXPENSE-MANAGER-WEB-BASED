// This function fetches the list of expenses from the backend API
async function loadExpenses() {
    try {
        const response = await fetch('/api/expenses');
        const expenses = await response.json();

        // Display expenses in the #expenses-list div
        const expensesList = document.getElementById('expenses-list');
        expensesList.innerHTML = '<h3>List of Expenses:</h3>'; // Reset the list content

        expenses.forEach(expense => {
            expensesList.innerHTML += `<p>Expense ID: ${expense.id}, Amount: $${expense.amount}, Category: ${expense.category}</p>`;
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
}

// This function adds a new expense by sending a POST request
async function addExpense(event) {
    event.preventDefault(); // Prevent page refresh

    const amount = document.getElementById('add-amount').value;
    const category = document.getElementById('add-category').value;

    // Simple validation
    if (isNaN(amount) || !category) {
        alert('Please enter valid data.');
        return;
    }

    try {
        const response = await fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, category })
        });

        if (response.ok) {
            alert('Expense added successfully!');
            loadExpenses(); // Reload expenses list
        } else {
            alert('Error adding expense.');
        }
    } catch (error) {
        console.error('Error adding expense:', error);
    }

    // Reset form
    document.getElementById('add-expense-form').reset();
}

// This function edits an existing expense by sending a PUT request
async function editExpense(event) {
    event.preventDefault(); // Prevent page refresh

    const id = document.getElementById('edit-id').value;
    const amount = document.getElementById('edit-amount').value;
    const category = document.getElementById('edit-category').value;

    // Simple validation
    if (isNaN(amount) || !category) {
        alert('Please enter valid data.');
        return;
    }

    try {
        const response = await fetch(`/api/expenses/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, category })
        });

        if (response.ok) {
            alert('Expense updated successfully!');
            loadExpenses(); // Reload expenses list
        } else {
            alert('Error updating expense.');
        }
    } catch (error) {
        console.error('Error updating expense:', error);
    }

    // Reset form
    document.getElementById('edit-expense-form').reset();
}
