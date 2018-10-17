const https = require('https');

module.exports = (currency, translateCurrency) => {
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