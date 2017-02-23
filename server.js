const express = require('express');
const router = require('./server/routes/router.js');
const MethodOverride = require('Method-override');
const Multer = require('Multer');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use('/', express.static(__dirname + '/dist'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true });


app.listen(port, () => console.log('Express listening on port', port))