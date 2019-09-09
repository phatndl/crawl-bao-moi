var express = require("express");
var { requestApi } = require("./utils/request");
var { crawl } = require("./utils/format");
require("dotenv").config({path: "./config.env"});
var Caterogy = require("./controller/categoryController");
var Provider = require("./controller/providerController");
var News = require("./controller/newsController");
var Queue = require("./queue");
var { event } = require('./event');

// initialize
// var eventEmitter = new Event();


var app = express();
var html = [];

app.get('/', function(req, res) {
    res.send(html);
});

app.get("/news", (req, res) => {
    var provider = new Provider();
    var length = 0;

    provider.get().then(data => {
        data.map((el, i) => {
            length += el.length;
        })
        return res.status(200).json({
            providers_length: length
        })
    });
});

(async function crawlData(){
    var body = await requestApi();
    var caterogy = new Caterogy();
    var provider = new Provider();
    
    // save caterogies into db
    // var caterogies = await caterogy.process(body).save().data;

    // get all caterogies
    var caterogies = await caterogy.get();
    console.log(caterogies.length);

    // no exist caterogies in db
    if (!caterogies.length) return;

    // get all providers
    var providers = await provider.get();
    var queue = new Queue(1);

    var count = 0 ; 

    event.add('finish', function(){
        queue.remove();
        count++;
    });

    // var timeout = setInterval(function(){
    //     try{
    //         var providerEl = providers[count];
    //         if (queue.add(providerEl)){
    //             crawl(queue.first.data, eventEmitter, (el, body) => {
    //                 var news = new News();
    //                 news.process(el._id, el.href, body).save();
    //             })
    //         }

    //         if (count === providers.length - 1) {
    //             clearInterval(timeout);
    //             console.log("providers length: ", count, providers.length);
    //         }
    //     }catch(e){
    //         console.log("Error: ", e);
    //     }
    // }, 1);

    // save providers to db
    crawl(caterogies, "", async (el, body) => {
        const provider = new Provider();
        provider.process(el._id, body).save();
    });

})();
 
module.exports = app;