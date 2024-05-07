const cron = require('node-cron');

const {sql } = require('../database');
const {sendTo} = require('../controllers/mail');

cron.schedule('* * 25 */1 *', async () => {
    console.log('Running scheduler...');
    const mailContent = {
        subject: 'Rent Alert',
        content: `
        <p>Hello User!!!</p>
        <p>This is a reminder regarding your rent due for this month.</p>
        <p>Ignore if already paid.</p>
        `
    }

    const query = await sql`
    select 
        tenant_name, email, property_title
        from tenants;
    `

    query.forEach((tenant) => {
        if(tenant.email)
        sendTo(tenant.email, mailContent.subject, mailContent.content);
    })
})