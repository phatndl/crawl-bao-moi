const request = require('request');
const cheerio = require('cheerio');
var express = require("express");

var { requestApi } = require("./utils/request");
var { crawl } = require("./utils/format");

var mongoose = require('mongoose');
require("dotenv").config({path: "./config.env"});
var { save, getAll } = require("./controller/crawlController");
// var { saveCaterogies, getCaterogies } = require("./controller/categoryController");
var Caterogy = require("./controller/categoryController");
var Provider = require("./controller/providerController");
var { saveProvider, getProviders } = require("./controller/providerController");
var app = express();
var obj = [];
var html = [];

app.get('/', function(req, res) {
    res.send(html);
});

// function getPage(endpoint) {
//     if (!endpoint) endpoint = "";
//     const url = process.env.URL;
//     var uri = url + endpoint;
//     return new Promise((resolve, reject) => {
//         request({
//             uri,
//             method: "GET",
//             gzip: true,
//         }, (err, res, body)=> {
//             if (err) return reject(new Error('Could not request the API'));
//             if (res.statusCode !== 200) return reject(new Error('The API responsed status code '+ res.statusCode));
//             resolve(body);
//         }); 
//     });
// }

(async function crawlData(){
    var body = await requestApi();
    var caterogy = new Caterogy();
    var provider = new Provider();
    console.log("===================================")
    var caterogies = await caterogy.process(body).data;
    var getCaterogies = await caterogy.get();

    console.log(getCaterogies.length, "getCaterogies");
    // 
    await crawl(getCaterogies, (el, body) => {
        console.log("hello");
        provider.process(el._id, body).save();
        if (el.sub_caterogies.length){
            crawl(el.sub_caterogies, (subEl, subBody) => {
                provider.process(subEl._id, subBody).save();
            })
        }
    });
   


})()
 
module.exports = app;