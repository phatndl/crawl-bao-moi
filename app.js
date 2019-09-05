const request = require('request');
const cheerio = require('cheerio');
var express = require("express");
var {ObjectId} = require('mongodb');
require("dotenv").config({path: "./config.env"});
var { save, getAll } = require("./controller/crawlController");
var { saveCaterogies, getCaterogies } = require("./controller/categoryController");
var app = express();
var obj = [];

app.get('/', function(req, res) {
    res.send(obj);
});

function getPage(endpoint) {
    if (!endpoint) endpoint = "";
    const url = process.env.URL;
    console.log("url: ", url + endpoint);
    var uri = url + endpoint;
    return new Promise((resolve, reject) => {
        request({
            uri: uri,
            method: "GET",
            gzip: true,
        }, (err, res, body)=> {
            if (err) return reject(new Error('Could not request the API'));
            if (res.statusCode !== 200) return reject(new Error('The API responsed status code '+ res.statusCode));
            resolve(body);
        }); 
    });
}

// console.log(getAll(), "all");

(async function crawlMenu() {
    function format(str){
        return str.match(/[^\s*].*[^\s*]/g);
    }

    var body = await getPage();
    var $ = cheerio.load(body);

    // $($(".main-filter").find("a")[2]).find("span").first().text()
    $(".main-filter").find("a").each((i, el) => {
        // saveCaterogies({
        //     caterogy_title: format($(el).first().text())[0],
        //     href: $(el).attr("href")        
        // })
        // console.log(, , "<==");
    })

    $(".nav__parent").each((i, el) => {
        // parent
        var parent = $(el).find("a").first();
        var href = $(parent).attr("href");

        // childs
        var childs = $(el).find(".nav__child a");

        // 
        var sub_caterogies = [];

        // save href childs
        if (childs.length > 1){
            $(childs).each((i, child) => {
                sub_caterogies.push({
                    title: format(childs.text())[i],
                    href: $(child).attr("href")
                })
            })
        }
        
        if (format(parent.text())){
            var obj = {
                caterogy_title: format(parent.text())[0], 
                href,
                sub_caterogies
            }
            // console.log(saveCaterogies(obj));
        }
    })
})();



(async function crawlNews(){

    function crawlNew(newsEls){
        newsEls.map( (newsEl, i) => {
            // var a = new ObjectId("12");
            getPage(newsEl.href).then((body) => {
                console.log(newsEl._id);
                crawlNewDetail(newsEl._id, body)
            })
            // console.log(newsEl.href);
        })
    }

    function crawlNewDetail(_id, body){
        var $ = cheerio.load(body);
        $('.story').each((i, article) => {
            var id = _id;
            var thumb = $(article).find(".story__thumb img").attr("src");
            var title = $(article).find(".story__heading a").text();
            var href = $(article).find(".story__heading a").attr("href");
            var source = {
                text: $(article).find(".story__meta .source").text(),
                link: $(article).find(".story__meta .source").attr("href")
            }
            var time = $(article).find("time").attr("datetime");
            var relate = $(article).find(".relate").text()
            
            var idx = obj.findIndex(s => s.sourceFrom === source.text);
            if (idx === -1){
                obj[obj.length] = {
                    id,
                    sourceFrom: source.text,
                    link: source.link,
                    data: []
                }

                if (!title && !thumb) return;
                obj[obj.length - 1].data.push({
                    thumb, title, href, time, relate
                })
            }
            else{
                if (!title && !thumb) return;
                obj[idx].data.push({
                    thumb, title, href, time, relate
                })
            }
        });

            
            // obj.forEach(function(data){
            // save(data)
            // })    
            // var data = await getAll();
            // console.log(data.length, obj.length);

    }
    
    
    // var thumb = $(".story__thumb").find("img").attr("src");
    // var href = $(".story__thumb").find("a").attr("href");
    // var title = $(".story__heading").find("a").text();

    getCaterogies().then(result => {
        crawlNew(result);
    })
    // .catch(e => { new Error(e)})
    // var type = $()

    // console.log(thumb);
    // console.log(href);
    // console.log(title);
})()

 
module.exports = app;