const express = require('express');
const router = require('./server/routes/router.js');
const methodOverride = require('method-override');
const Multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const port = 80;

app.use('/', express.static(__dirname + '/dist'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () => console.log('Express listening on port', port))