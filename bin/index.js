#! /usr/bin/env node
const https = require('https');
const querystring = require('querystring');

const arguments = process.argv.splice(2, process.argv.length -1).join(' ')
const argArray = arguments.split(' ');

const currency = argArray[0];
const value = argArray[1];

const translateCurrency = {
  'USD': 'Dólar',
  'AUD': 'Dólar australiano',
  'BRL': 'Real brasileiro',
  'CAD': 'Dólar canadense',
  'CHF': 'Franco suiço',
  'CLP': 'Peso chileno',
  'CNY': 'China Yuan/Renminbi',
  'DKK': 'Coroa dinamarquesa',
  'EUR': 'Euro',
  'GBP': 'Libra esterlina',
  'HKD': 'Dolar Honkongense',
  'INR': 'India Rupee',
  'ISK': 'Dinar iraquiano',
  'JPY': 'Iene japonês',
  'KRW': 'Won sul-coreano',
  'NZD': 'Dólar neozelandês',
  'PLN': 'Zloty polonês',
  'RUB': 'Rublo russo',
  'SEK': 'Coroa sueca',
  'SGD': 'Dólar cingapurense',
  'THB': 'Baht tailandês',
  'TWD': 'Dólar taiwanês'
}


if(!arguments){
  https
  .get('https://blockchain.info/ticker', function(res){
    let data = ''

    res.on('data', function(newData){
      data += newData
    });

    res.on('end', function(){

      const coins = JSON.parse(data)
      const coinsKeys = Object.keys(coins);
      const coinsValues = Object.values(coins);

      const coinsObj = Object.keys(coins).map(i => {
        return { currency: i, details: coins[i] }
      });

      console.log('================ Valores de todas as moedas suportadas   ====================');
      console.log();
      coinsObj.forEach(item => {
        console.log(`Moeda: ${translateCurrency[item.currency]} - Símbolo: ${item.details.symbol}`);
        console.log('-------');
        console.log(`Última valor registrado: ${item.details.last}`);
        console.log(`Valor da última venda: ${item.details.sell}`);
        console.log(`Valor da última compra: ${item.details.buy}`);
        console.log('-------');
        console.log();
        console.log();
      });
      console.log();
      console.log('=============================================================================');
    });
  });
}

if(translateCurrency[currency]){
  if(!value){
    https
      .get('https://blockchain.info/ticker', function(res){
        let data = ''

        res.on('data', function(newData){
          data += newData
        });

        res.on('end', function(){

          const coins = JSON.parse(data)
          const coinsKeys = Object.keys(coins);
          const index = coinsKeys.indexOf(currency);
          const coinsValues = Object.values(coins);

          const coinsObj = Object.keys(coins).map(i => {
            return { currency: i, details: coins[i] }
          });

          console.log('================ Valores da moeda ====================');
          console.log();
          const item = coinsValues[index];
          console.log(`Moeda: ${translateCurrency[currency]} - Símbolo: ${item.symbol}`);
          console.log('-------');
          console.log(`Última valor registrado: ${item.last}`);
          console.log(`Valor da última venda: ${item.sell}`);
          console.log(`Valor da última compra: ${item.buy}`);
          console.log('-------');
          console.log();
          console.log('=======================================================');
        });
      });
  }
}