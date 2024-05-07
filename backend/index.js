const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(cookieParser());
app.use(cors());

const routes = require('./routes');
app.use('/', routes);

require('./programs/alerts');

app.listen(process.env.PORT,() => {
    console.log(`listening at port ${process.env.PORT}`);
})