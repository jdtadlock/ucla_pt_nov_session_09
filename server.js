const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const api_routes = require('./routes/api_routes');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ucla_ubereats');
mongoose.Promise = Promise;

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

api_routes(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on ${port}`));