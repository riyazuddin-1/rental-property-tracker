const bcrypt = require('bcryptjs');

// Database connection establishment
const {sql, tables } = require('../database');
const { properties } = require('./property');
const { parseDate } = require('../programs/utils');

/**
 * NOTE:
 * The table name for storing user auth credententials is `finance`
 * 
 */

const getIncome = async (propertyid, incomeType) => {
    const query = await sql`
        select * from income
        where propertyid = ${propertyid} 
        and income_type = ${incomeType}
    `

    for(let i=0; i<query.length; i++) {
        let record = query[i];
        record.paid_for_month = parseDate(record.paid_for_month);
        record.last_updated = parseDate(record.last_updated);
        query[i] = record;
    }

    return query;
}

const financeControllers = {};

financeControllers.addIncome = async (req, res) => {
    console.log(req.body);
    let payload = req.body;
    
    if(payload.income_type == 'rent')
        payload.amount = payload.rent_amount;

    payload.paid_for_month = payload.date;
    delete payload.date;

    payload.last_updated = new Date();
    await sql`
        insert into income ${
            sql(payload, 'amount', 'propertyid', 'income_type', 'paid_for_month', 'description', 'last_updated')
        }
    `

    const recent = await sql`
        select income from financialOutcomes
        where propertyid = ${payload.propertyid}
    `

    await sql`
        update financialOutcomes
        set income = ${recent[0].income + parseInt(payload.amount)}, last_updated = ${new Date()}
        where propertyid = ${payload.propertyid}
    `

    console.log(payload);

    res.status(200).send();
}

financeControllers.addExpense = async (req, res) => {
    propertyid = req.body.propertyid;
    amount = req.body.amount;
    await sql`
        insert into expenses ${
            sql(req.body, 'amount', 'propertyid', 'date', 'description')
        }
    `

    const recent = await sql`
        select expenses from financialOutcomes
        where propertyid = ${propertyid}
    `

    await sql`
        update financialOutcomes
        set expenses = ${recent[0].expenses + parseInt(amount)}, last_updated = ${new Date()}
        where propertyid = ${propertyid}
    `
    
    res.status(200).send();
}

financeControllers.incomeAndExpenseStatements = async (req, res) => {
    userid = req.body.userid;
    const query = await sql`
        select * from financialOutcomes
        inner join property on financialOutcomes.propertyid = property.propertyid
        where property.userid = ${userid};
    `
    res.status(200).json(query).send();
}

financeControllers.getTotal = async (req, res) => {
    userid = req.body.userid;
    const query = await sql`
        select sum(income) as overall_income,
        sum(expenses) as overall_expenses
        from financialOutcomes
        where userid = ${userid}
    `

    if(query.length)
    res.status(200).json(query[0]).send();
    else
    res.status(300).send(`Financial data is unavailable for ${userid}`)
}

financeControllers.getRentRoll = async (req, res) => {
    propertyid = req.body.propertyid;
    const query = await getIncome(propertyid, 'rent');

    console.log(query);
    
    res.status(200).json(query).send();
}

financeControllers.getPropertyIncome = async (req, res) => {
    propertyid = req.body.propertyid;
    const query = await getIncome(propertyid, 'other')
    
    console.log(query);

    res.status(200).json(query).send();
}

financeControllers.getPropertyExpenses = async (req, res) => {
    propertyid = req.body.propertyid;
    const query = await sql`
        select * from expenses 
        where propertyid = ${propertyid}
    `

    for(let i=0; i<query.length; i++) {
        let record = query[i];
        record.date = parseDate(record.date);
        query[i] = record;
    }
    
    res.status(200).json(query).send();
}

module.exports = financeControllers;