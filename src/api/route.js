const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require("cors")

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.post('/convert', (req, res) => {
  axios.get(`https://api.exchangeratesapi.io/latest?base=${req.body.base_currency}`).then((resp) => {
    if (resp.data.rates[req.body.quote_currency] === undefined) {
      res.status(400);
      res.send({ success: false, error: 'iso "req.body.quote_currency" not found' });
      return;
    }
    const ret = req.body.value * resp.data.rates[req.body.quote_currency];
    res.status(200);
    res.send({ success: true, res: ret, rate: resp.data.rates[req.body.quote_currency]});
  }).catch((err) => {
    res.status(400);
    res.send({ success: false, error: err });
  });
});

module.exports = app;
