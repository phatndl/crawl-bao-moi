var express = require("express");
var { requestApi } = require("./utils/request");
var { crawl } = require("./utils/format");
require("dotenv").config({path: "./config.env"});
var Caterogy = require("./controller/categoryController");
var Provider = require("./controller/providerController");
var app = express();
var html = [];

app.get('/', function(req, res) {
    res.send(html);
});

(async function crawlData(){
    var body = await requestApi();
    var caterogy = new Caterogy();
    var provider = new Provider();
    console.log("===================================")
    var caterogies = await caterogy.process(body).data;
    var getCaterogies = await caterogy.get();

    await crawl(getCaterogies, (el, body) => {
        provider.process(el._id, body).save();
        if (el.sub_caterogies.length){
            crawl(el.sub_caterogies, (subEl, subBody) => {
                provider.process(subEl._id, subBody).save();
            })
        }
    });
})()
 
module.exports = app;