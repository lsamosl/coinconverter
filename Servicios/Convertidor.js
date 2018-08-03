const axios = require('axios');

function getCurrency(convertType, amount, MxnToUsd, callBack) {
    let amountConvert = 0;
    axios.get('http://data.fixer.io/api/latest?access_key=9e4577cd900628cc95537145a256855e')
    .then(function (response) {
      // handle success
      const monedas = response.data.rates;
      if(convertType == MxnToUsd)
      {
        amountConvert = amount / monedas.MXN;
      }
      else
      {
        amountConvert = amount * monedas.MXN;
      }
      callBack(amountConvert.toFixed(2));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

export {getCurrency}