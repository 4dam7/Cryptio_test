const axios = require('axios');

test('good convertion status', () => {
  axios.post('http://localhost:5000/convert', { base_currency: 'USD', value: 6666, quote_currency: 'EUR' })
    .then((resp) => {
      expect(resp.status).toBe(200);
    })
});

test('wrong base convertion status', () => {
  axios.post('http://localhost:5000/convert', { base_currency: 'USD', value: 6666, quote_currency: '123' })
    .then((resp) => {
      expect(resp.status).toBe(400);
    }).catch((err) => {
      expect(err.response.status).toBe(400);
    });
});

test('wrong quote convertion status', () => {
  axios.post('http://localhost:5000/convert', { base_currency: 'HELLO', value: 6666, quote_currency: 'USD' })
    .then((resp) => {
      expect(resp.status).toBe(400);
    }).catch((err) => {
      expect(err.response.status).toBe(400);
    });
});

test('basic convertion status', () => {
  axios.get('https://api.exchangeratesapi.io/latest?base=CHF').then((resp) => {
    const expected = 200 * resp.data.rates.USD;
    axios.post('http://localhost:5000/convert', { base_currency: 'CHF', value: 200, quote_currency: 'USD' })
      .then((ret) => {
        expect(ret.data.res).toBe(expected);
      })
  })
});
