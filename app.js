const express = require('express')
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

module.exports = app;