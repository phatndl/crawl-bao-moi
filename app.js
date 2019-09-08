var express = require("express");
var { requestApi } = require("./utils/request");
var { crawl } = require("./utils/format");
require("dotenv").config({path: "./config.env"});
var Caterogy = require("./controller/categoryController");
var Provider = require("./controller/providerController");
var News = require("./controller/newsController");
var app = express();
var html = [];

app.get('/', function(req, res) {
    res.send(html);
});

(async function crawlData(){
    var body = await requestApi();
    var caterogy = new Caterogy();
    var provider = new Provider();
    
    console.log("===================================");
    // var caterogies = await caterogy.process(body).save().data;
    var caterogies = await caterogy.get();
    console.log(caterogies.length);
    // no exist caterogies in db
    if (!caterogies.length) return;

    // html = l;
    // console.log(l, "parse");
    var providers = await provider.get();
    // console.log(providers.length);
    var stats = false;
    var curLen = 0;
    try{
        for (var count = 0; count < providers.length; count++){
            var providerEl = providers[count];
            try{
                // setTimeout(function(){
                    console.log("===========================================================", count);
                    crawl(providerEl.data, async (el, body) => {
                        var news = new News();
                        console.log(el.href);
                        news.process(el._id, el.href, body).save();
                    })
                // }, count*1000);
                
                
                // await (new Promise((resolve, reject) => {
                //     setTimeout(() => {
                //         console.log(curLen, "curLen");
                //         resolve();
                //     }, 10000);
                // }))()

                // await a();


            }catch(e){

            }
        }
    // providers.map(async (providerEl, i) => {
    //     // var pEl = await caterogy.find({_id: providerEl._id});
    //     // var breadthumbs = pEl.caterogy_title;
    //     // html.push(pEl);
            
    // })
}catch(e){
    console.log(e, "hereee");
}

    
    // var provider = new Provider();
    // // save providers to db
    // crawl(caterogies, (el, body) => {
    //     provider.process(el._id, body).save();
    // });


})()
 
module.exports = app;