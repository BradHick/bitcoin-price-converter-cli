#! /usr/bin/env node
const https = require('https');

const arguments = process.argv.splice(2, process.argv.length -1).join(' ')
const argArray = arguments.split(' ');

const currency = argArray[0].toUpperCase();
const value = argArray[1];

const translateCurrency = {
  'USD': 'Dollar',
  'AUD': 'Australian dollar',
  'BRL': 'Brazilian Real',
  'CAD': 'Canadian dollar',
  'CLP': 'Chilean peso',
  'CNY': 'China Yuan / Renminbi',
  'DKK': 'Danish krone',
  'EUR': 'Euro',
  'GBP': 'Pound sterling',
  'HKD': 'Dolar Honkongense',
  'INR': 'India Rupee',
  'ISK': 'Iraqi Dinar',
  'JPY': 'Japanese yen',
  'KRW': 'Won South Korean',
  'NZD': 'New Zealand Dollar',
  'PLN': 'Polish Zloty',
  'RUB': 'Russian Ruble',
  'SEK': 'Swedish krona',
  'SGD': 'Singaporean dollar',
  'THB': 'Thai Baht',
  'TWD': 'Taiwanese dollar'
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

      const coinsObj = Object.keys(coins).map(i => {
        return { currency: i, details: coins[i] }
      });

      console.log("\x1b[36m", '================ Amounts of all supported currencies ====================');
      console.log();
      coinsObj.forEach(item => {
        console.log(`Currency: ${translateCurrency[item.currency.toUpperCase()]} - Symbol: ${item.details.symbol}`);
        console.log('-------');
        console.log(`Last value recorded: ${item.details.last}`);
        console.log(`Last sale value: ${item.details.sell}`);
        console.log(`Last buy value: ${item.details.buy}`);
        console.log('-------');
        console.log();
        console.log();
      });
      console.log();
      console.log('====================================================================================');
    });
  });
}

if(arguments === '--help'){
  console.log('=========== Help bitcoin-price-converter =============');
  console.log();
  console.log('Parameters: [Currency] [Value]');
  console.log('--- Currency: Currency abbreviation');
  console.log('--- Value: Amount');
  console.log('--- Eg: bitcoin BRL 1000');
  console.log();
  console.log('If you only enter "bitcoin" in the terminal, a list with all the supported currencies and their details will be shown');
  console.log();
  console.log('By entering only "bitcoin [Currency]" in the terminal, the details of that currency will be shown');
  console.log('----Ed: bitcoin BRL');
  console.log();
  console.log('Use . (dot) for values ​​in currency subunits');
  console.log('----Ed: bitcoin BRL 571.75');
  console.log();
  console.log('====================================');
  console.log('List of supported currencies: ');
  console.log('USD - Dollar');
  console.log('AUD - Australian dollar');
  console.log('BRL - Brazilian Real');
  console.log('CAD - Canadian dollar');
  console.log('CLP - Chilean peso');
  console.log('CNY - China Yuan / Renminbi');
  console.log('DKK - Danish krone');
  console.log('EUR - Euro');
  console.log('GBP - Pound sterling');
  console.log('HKD - Dolar Honkongense');
  console.log('INR - India Rupee');
  console.log('ISK - Iraqi Dinar');
  console.log('JPY - Japanese yen');
  console.log('KRW - Won South Korean');
  console.log('NZD - New Zealand Dollar');
  console.log('PLN - Polish Zloty');
  console.log('RUB - Russian Ruble');
  console.log('SEK - Swedish krona');
  console.log('SGD - Singaporean dollar');
  console.log('THB - Thai Baht');
  console.log('TWD - Taiwanese dollar');
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


          console.log("\x1b[32m" ,'================ Amount of selected currency ====================');
          console.log();
          const item = coinsValues[index];
          console.log(`Currency: ${translateCurrency[currency.toUpperCase()]} - Symbol: ${item.symbol}`);
          console.log('-------');
          console.log(`Last value recorded: ${item.last}`);
          console.log(`Last sale value: ${item.sell}`);
          console.log(`Last buy value: ${item.buy}`);
          console.log('-------');
          console.log();
          console.log("\x1b[32m" ,'================================================================');
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
            console.log("\x1b[32m" ,'================ Valor em Bitcoin ====================');
            console.log(data);
            console.log('======================================================');
            console.log()
          });
        });
  };
};

if(currency && !translateCurrency[currency.toUpperCase()] && (arguments !== '--help')){
  console.error("\x1b[31m", 'Invalid parameters, if in doubt, type bitcoin --help');
};