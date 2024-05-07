const bcrypt = require('bcryptjs');

// Database connection establishment
const {sql } = require('../database');

const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

/**
 * NOTE:
 * The table name for storing user auth credententials is `property`
 * 
 */

const { addTenant, getTenantsQuery } = require("./tenants");

const propertyControllers = {};

propertyControllers.addProperty = async (req, res) => {
    payload = req.body;
    console.log(payload);
    tenantPayload = JSON.parse(req.body.tenant);
    console.log(tenantPayload);
    delete payload.tenant;
    payload.vacant = payload.vacant == 'yes';
    image = req.files.image;
    try {
        const byteArrayBuffer = image.data;
        new Promise((resolve) => {
            cloudinary.v2.uploader.upload_stream((error, uploadResult) => {
                return resolve(uploadResult);
            }).end(byteArrayBuffer);
        }).then(async (uploadResult) => {
            payload = {
                ...payload,
                image_url: uploadResult.url,
                image_id: uploadResult.public_id
            }
            console.log(payload);
            const query = await sql`
                insert into property ${
                    sql(payload, 'userid', 'property_title', 'address', 'city', 'address_landmark', 'property_type', 'land_size', 'rent_amount', 'vacant', 'description', 'image_url', 'image_id')
                }
                returning propertyid, property_title, address, city, address_landmark, rent_amount
            `

            await sql`
                insert into financialOutcomes(userid, propertyid, income, expenses, last_updated)
                values(${req.body.userid}, ${query[0].propertyid}, 0, 0, ${new Date()})
            `

            if(!payload.vacant) {
                tenantPayload["ownerid"] = payload.userid;
                tenantPayload["propertyid"] = query[0].propertyid;
                tenantPayload["property_title"] = query[0].property_title;
                tenantPayload["rent_amount"] = payload.rent_amount;
                req.body = tenantPayload;
                addTenant(req, res);
            }

            res.status(200).json(query[0]).send();
        });
    } catch (error) {
        console.error(error);
        res.status(300).send('Unable to create profile');
    }
}

propertyControllers.properties = async (req, res) => {
    userid = req.body.userid;
    var query = await sql`
        select
        propertyid, property_title, address, city, address_landmark, rent_amount, vacant, image_url
        from property
        where userid = ${userid}
    `

    let index = 0;
    console.log(req.body.getTenants);

    if(req.body.getTenants)
    for(let record of query) {
        const temp = await getTenantsQuery(record.propertyid);

        if(temp.length)
            record = {...record, ...temp[0]};

        query[index] = record;
        index++;
    }

    if(query)
        res.status(200).json(query).send();
    else
        res.status(300).send(`UserID ${username} does not exist`);
}

propertyControllers.propertyInfo = async (req, res) => {
    propertyid = req.body.propertyid;
    console.log(req.body);
    var query = await sql`
        select * from property where propertyid = ${propertyid}
    `
    if(query.length) {
        if(req.body.getTenants) {
            let record = query[0];
            const temp = await getTenantsQuery(record.propertyid);
    
            if(temp.length)
                record = {...record, ...temp[0]};
    
            query[0] = record;
        }
    
        res.status(200).json(query[0]).send();
    } else
        res.status(300).send(`Property does not exist`);
}

module.exports = propertyControllers;