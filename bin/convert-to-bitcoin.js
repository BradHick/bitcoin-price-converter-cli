const https = require('https');

module.exports = (currency, value) => {
  https
        .get(`https://blockchain.info/tobtc?currency=${currency}&value=${value}`, function(res){
          let data = ''
  
          res.on('data', function(newData){
            data += newData
          });
  
          res.on('end', function(){
            console.log()
            console.log("\x1b[32m" ,'================ Value in Bitcoin ====================');
            console.log(data);
            console.log('======================================================');
            console.log()
          });
        });
};