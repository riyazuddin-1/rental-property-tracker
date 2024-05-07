const express = require('express');
const app = express();

const controllers = require('../controllers').finance;

app.post('/add-income', controllers.addIncome);

app.post('/add-expense', controllers.addExpense);

app.post('/get-property-rent-roll', controllers.getRentRoll);

app.post('/get-property-income', controllers.getPropertyIncome);

app.post('/get-property-expenses', controllers.getPropertyExpenses);

app.post('/get-income-and-expense-statements', controllers.incomeAndExpenseStatements);

app.post('/get-total', controllers.getTotal);

module.exports = app;