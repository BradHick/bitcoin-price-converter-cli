#! /usr/bin/env node
const https = require('https');
const querystring = require('querystring');

const arguments = process.argv.splice(2, process.argv.length -1).join(' ')
const argArray = arguments.split(' ');

const currency = argArray[0];
const value = argArray[1];


if(!arguments){
  https
  .get('https://blockchain.info/ticker', function(res){
    var data = ''

    res.on('data', function(newData){
      data += newData
    });

    res.on('end', function(){

      const coins = JSON.parse(data)
      const resp = Object.values(coins);

      const teste = Object.keys(coins).map(i => {
        return { coin: i, detail: coins[i] }
      });

      console.log('====================================');
      console.log(teste);
      console.log('====================================');
    })
  })
}

