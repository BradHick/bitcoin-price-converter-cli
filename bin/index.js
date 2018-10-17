#! /usr/bin/env node
const https = require('https');
const querystring = require('querystring');

const arguments = process.argv.splice(2, process.argv.length -1).join(' ')
const argArray = arguments.split(' ');

const currency = argArray[0].toUpperCase();
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
        console.log(`Moeda: ${translateCurrency[item.currency.toUpperCase()]} - Símbolo: ${item.details.symbol}`);
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

if(arguments === '--help'){
  console.log('=========== Ajuda bitcoin-price converter =============');
  console.log();
  console.log('Parâmetros: [Currency] [Value]');
  console.log('--- Currency: Abreviatura da moeda');
  console.log('--- Value: Valor desejado');
  console.log('--- Ex: bitcoin BRL 1000');
  console.log();
  console.log('Ao se digitar apenas "bitcoin" no terminal, será mostrada uma lista com todas as moedas suportadas e seus detalhes');
  console.log();
  console.log('Ao se digitar apenas "bitcoin [Currency]" no terminal, será mostrado os detalhes daquela moeda');
  console.log('----Ex: bitcoin BRL');
  console.log();
  console.log('====================================');
  console.log('Lista de moedas suportadas: ');
  console.log('USD - Dólar',);
  console.log('AUD - Dólar australiano',);
  console.log('BRL - Real brasileiro',);
  console.log('CAD - Dólar canadense',);
  console.log('CHF - Franco suiço',);
  console.log('CLP - Peso chileno',);
  console.log('CNY - China Yuan/Renminbi',);
  console.log('DKK - Coroa dinamarquesa',);
  console.log('EUR - Euro',);
  console.log('GBP - Libra esterlina',);
  console.log('HKD - Dolar Honkongense',);
  console.log('INR - India Rupee',);
  console.log('ISK - Dinar iraquiano',);
  console.log('JPY - Iene japonês',);
  console.log('KRW - Won sul-coreano',);
  console.log('NZD - Dólar neozelandês',);
  console.log('PLN - Zloty polonês',);
  console.log('RUB - Rublo russo',);
  console.log('SEK - Coroa sueca',);
  console.log('SGD - Dólar cingapurense',);
  console.log('THB - Baht tailandês',);
  console.log('TWD - Dólar taiwanês');
  console.log('====================================');
  
};

if(translateCurrency[currency.toUpperCase()]){
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
          console.log(`Moeda: ${translateCurrency[currency.toUpperCase()]} - Símbolo: ${item.symbol}`);
          console.log('-------');
          console.log(`Última valor registrado: ${item.last}`);
          console.log(`Valor da última venda: ${item.sell}`);
          console.log(`Valor da última compra: ${item.buy}`);
          console.log('-------');
          console.log();
          console.log('=======================================================');
        });
      });
  };

  if(value >= 0){
    https
        .get(`https://blockchain.info/tobtc?currency=${currency}&value=${value}`, function(res){
          let data = ''
  
          res.on('data', function(newData){
            data += newData
          });
  
          res.on('end', function(){
            console.log()
            console.log('================ Valor em Bitcoin ====================');
            console.log(data);
            console.log('======================================================');
            console.log()
          });
        });
  };
}