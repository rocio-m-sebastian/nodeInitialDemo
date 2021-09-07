const express = require('express');
const bodyParser = require('body-parser');

const apiRouter = require('../routes/api');

const app = express();

require('../db.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', apiRouter);

app.listen(8000, function() {
    console.log(`Listen http:/localhost:8000`);
});

module.exports = app;