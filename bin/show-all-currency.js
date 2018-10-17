const https = require('https');


module.exports = (translateCurrency) => {
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
};

  

  