#! /usr/bin/env node
const https = require('https');
const showAllCurrencies = require('./show-all-currency');
const showCurrency = require('./show-currency');
const help = require('./help');

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
  return showAllCurrencies( translateCurrency );
}

if(arguments === '--help'){
  return help();
};

if(translateCurrency[currency.toUpperCase()]){
  if(!value){
    return showCurrency(currency, translateCurrency);
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