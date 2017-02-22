const express = require('express');
const router = require('./server/routes/router.js')

const app = express();
const port = 8080;

app.use('/', express.static(__dirname + '/dist'));

app.listen(port, () => console.log('Express listening on port', port))