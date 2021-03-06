module.exports = function (cron) {

    var parameters = require('./parameters');
    var company = require('./models/company');
    var mongoose = require('mongoose');
    var news = require('./models/news.js');
  
  
    let companyPriceOnTime = new cron.CronJob({
      cronTime : '*/12 * * * * *',  // The time pattern when you want the job to start
      onTick : changePrice, // Task to run
      onComplete : reset, // When job is completed and It stops.
      start : true, // immediately starts the job.
      timeZone : "Asia/Kolkata" // The timezone
    });

    let number = 0;
    function changePrice() {
        company.find({} , function(err, Company) {
          if (err){
              console.log(err);
              res.send("unable to fetch companies");
          }else{
              news.find({}, function(err, News){
                  if (err) {
                      console.log(err);
                      res.send("unable to load news");
                  }
                  else{
                    for(var i = 0; i<Company.length; i++){
                        var j=0;
                        // console.log(News[j].flag,"one", Company[i].stockPrice)
                        while(j<News.length){
                        if(News[j].flag=="1"){
                            // console.log(News[j].flag,"sec",News[j].newsImpact[i].impact)
                            // console.log("value of j is",j)
                        Company[i].stockPrice = (Company[i].stockPrice * (1 + (News[j].newsImpact[i].impact/parameters.stockParameter))).toFixed(0);
                        // console.log("change in price by newsimpact",News[j].newsImpact[i].impact,"of",j,"news","in company",Company[i].symbol,"is",Company[i].stockPrice);}
                        j++;
                        }

                        Company[i].history.push({
                            timeStamp : Date.now(),
                            stockPrice : Company[i].stockPrice,
                            availableQuantity : Company[i].availableQuantity
                        });
                        Company[i].save();
                    }  
                  }
              });
                                  
          }
        });
    }



    function reset() {
      console.log('Task update Completed');
      number=0;
    }
  
    return companyPriceOnTime;
  
  };

  