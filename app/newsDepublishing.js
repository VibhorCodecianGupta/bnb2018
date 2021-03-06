module.exports = function (cron) {
    var mongoose = require('mongoose')
    var company = require('./models/company');
    var customer = require('./models/customer');
    var news = require('./models/news');
    var parameters = require('./parameters.js');
    mongoose.Promise = global.Promise;
    
  
    let companyPriceOnTime = new cron.CronJob({
      cronTime : '*/6 * * * * *',  // The time pattern when you want the job to start
      onTick : changePrice, // Task to run
      onComplete : reset, // When job is completed and It stops.
      start : true, // immediately starts the job.
      timeZone : "Asia/Kolkata" // The timezone
    });
  
    var number = 0;
    function changePrice() {news.find({}, function(err, News){
    
        if (err) {
            console.log(err);
            res.send("unable to load news");
        }
        else{ 
            var k=0;
          while(k!=News.length-1) {
          if(News[k].flag=="2"){
          k++;}}
                if((k<News.length)&&(News[k].flag=="1")){
                News[k].flag="2";
                // console.log("change in",k)
                console.log("news not available is",k);
                News[k].save();
                if(k<News.length-1){k++};
                }
    
                }
    });
    }
    function reset() {
      console.log('Task update Completed');
      number=0;
    }
  
    return companyPriceOnTime;
  
  };