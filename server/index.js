const express = require('express');
const database = require('./configs/db');

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(8080, () => {
    database();
    console.log("Listening on port 8080");
});