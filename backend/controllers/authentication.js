const bcrypt = require('bcryptjs');

// Database connection establishment
const {sql } = require('../database');

/**
 * NOTE:
 * The table name for storing user auth credententials is `users`
 * 
 */

const authControllers = {};

authControllers.login = async (req, res) => {
    email = req.body.email;
    password = req.body.password;
    console.log(req.body);
    var query = await sql`
        select 
        userid, name, phone_no, email, password
        from users 
        where email = ${email.toLowerCase()}
    `;
    if(query.length) {
        bcrypt.compare(password, query[0].password).then( (matched)=> {
            if(matched) {
                delete query[0].password;
                res.status(200).json(query[0]).send();
            } else {
                res.status(300).send('password is incorrect');
            }
        })
    } else {
        res.status(300).send(`The id: ${email} does not exist`);
    }
}

authControllers.register = async (req, res) => {
    email = req.body.email;
    password = req.body.password;
    bcrypt.hash(password, 10).then( async (hash) => {
        const payload = {
            name: req.body.name,
            phone_no: req.body.phone, 
            email: email.toLowerCase(), 
            password: hash
        };

        const query = await sql`
            insert into users ${
                sql(payload, 'name', 'phone_no', 'email', 'password')
            }
            returning userid, name, phone_no, email
        `

        res.status(200).json(query[0]).send();
    })
    .catch(err => {
        console.log(err);
        res.status(300).send('Unable to create profile')});
}

authControllers.getUserDetails = async (req, res) => {
    username = req.body.username;
    var query = await sql`
        select 
            name, 
            username,  
            mail, 
            verified 
        from users 
        where username = ${username}
    `;
    if(query)
        res.status(200).json(query[0]).send();
    else
        res.status(300).send(`UserID ${username} does not exist`);
}

authControllers.checkUsername = async (req, res) => {
    username = req.body.username;
    if(!username.length)
    res.status(300).send();
    var query = await sql`
        select 
        username 
        from users 
        where username = ${username}
    `;
    if(query.length) {
        res.status(300).send();
    } else {
        res.status(200).send();
    }
}

module.exports = authControllers;