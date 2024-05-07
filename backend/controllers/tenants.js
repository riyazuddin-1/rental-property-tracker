const bcrypt = require('bcryptjs');

// Database connection establishment
const {sql } = require('../database');

const { parseDate } = require('../programs/utils');

/**
 * NOTE:
 * The table name for storing user auth credententials is `property`
 * 
 */

const tenantsControllers = {};

tenantsControllers.getTenantsQuery = async (propertyid) => {
    const query =  await sql`
        select * from tenants where propertyid = ${propertyid}
    `
    return query;
}

tenantsControllers.getTenant = async (req, res) => {
    propertyid = req.body.propertyid;
    console.log(propertyid);
    var query = tenantsControllers.getTenantsQuery(propertyid);

    if(query.length)
        res.status(200).json(query[0]).send();
    else
        res.status(300).send(`Tenant for property does not exist`);
}

tenantsControllers.addTenant = async (req, res) => {
    const payload = {
        contact_no: req.body.contact_number,
        ...req.body
    }
    console.log(req.body);

    await sql`
        insert into tenants ${
            sql(payload, 'tenant_name', 'contact_no', 'email', 'propertyid', 'start_at', 'end_at', 'ownerid', 'rent_amount', 'property_title')
        }
    `

    res.status(200).send();
}

tenantsControllers.getTenantsList = async (req, res) => {
    console.log(req.body);
    const query = await sql`
        select * from tenants
        where ownerid = ${req.body.userid}
    `

    console.log(query);

    if(query.length)
        res.status(200).json(query).send();
    else
        res.status(300).send(`There are no tenants updated`);
}

module.exports = tenantsControllers;