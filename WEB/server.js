const express = require('express');
const path = require('path');

// Create Express app
const app = express();

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
// Middleware to parse incoming JSON requests
app.use(express.json());

// Dummy data for expenses (this will act as our "database" for now)
let expenses = [
    { id: 1, amount: 50, category: 'Food' },
    { id: 2, amount: 20, category: 'Transport' }
];

// API endpoint to get expenses
app.get('/api/expenses', (req, res) => {
    res.json(expenses);
});

// API endpoint to add an expense
app.post('/api/expenses', (req, res) => {
    const { amount, category } = req.body;
    const newExpense = {
        id: expenses.length + 1, // Simple ID generation
        amount,
        category
    };
    expenses.push(newExpense);
    res.status(201).send('Expense added successfully!');
});

// API endpoint to edit an expense
app.put('/api/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { amount, category } = req.body;
    const expense = expenses.find(e => e.id === parseInt(id));

    if (!expense) {
        return res.status(404).send('Expense not found');
    }

    expense.amount = amount;
    expense.category = category;

    res.send('Expense updated successfully!');
});

// Serve the index.html when visiting the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
