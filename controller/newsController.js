var mongoose = require("mongoose");
const cheerio = require('cheerio');
var { format } = require("../utils/format");
var newsModel = require("../models/newsModel");

var News = class _News {
    constructor(){
        this.news = {}
    }

    process(id, href, body){
        const $ = cheerio.load(body);
        var _id = new mongoose.mongo.ObjectId(id);

        console.log("_id: ", id);
        var article_header = $(".article__header").text();
        var article_sapo = $(".article__sapo").text();
        var article_body = [];
        this.news = {};

        var els = $(".article__body p");
        for (var i = 0 ; i < els.length; i++){
            var text = "";
            var image = "";
            var video = "";
            var el = els[i];
            var stats = false;
            // console.log($(el).text());
            if ($(el).is(".body-image")){
                text = $(el).next().text();
                image = $(el).find("a>img").attr("src");
                console.log("image: ", image);
                stats = true;
            }
            else if ($(el).is(".body-text:not(.media-caption)")){
                text = $(el).text();
                stats = true;
            }
            else if ($(el).is(".body-video")){
                video = $(el).find("video").attr("src");
                text = $(el).next().text();
                stats = true;
            }
            if (stats) article_body.push({text, image, video});
        }
        // var article_body = $(".article__body p").each((i, el) => {
        //     var text = "";
        //     var image = "";
        //     var video = "";
        //     // console.log($(el).text());
        //     if ($(el).is(".body-image")){
        //         text = $(el).next().text();
        //         image = $(el).find("a>img").attr("src");
        //     }
        //     else if ($(el).is(".body-text:not(.media-caption)")){
        //         text = $(el).text();
        //     }
        //     else if ($(el).is(".body-video")){
        //         video = $(el).find("video").attr("src");
        //         text = $(el).next().text();
        //     }

        //     return {
        //         text, video, image
        //     }
        // })
        
        this.news = {
            _id,
            href,
            article_header,
            article_sapo,
            article_body
        }
        // console.log(_id, article_body)
        // article_title = $(".the-article-title").text();
        // var article_author = $(".the-article-meta .the-article-author a").map(function(i, el){
        //     return $(el).text()
        // })
        // var article_publish = $(".the-article-publish").text();
        // var article_summary = $(".the-article-summary").text();
        // var article_body = $(".the-article-body").children().map((i, el) => {
        //     var obj = {src: "", content: ""};
        //     var img = $(el).find("img");
        //     var content = $(el).text();

        //     if (img.length) obj.src = $(img).attr("src");
        //     if (content) obj.content = format(content);

        //     return obj;
        // })
        
        
        

        return this;
    }

    save(){
        newsModel.create(this.news)
        .then(result => { console.log("news is created in database"); })
        .catch(e => {console.log("e: ", e)});
            
    }

    get data(){
        return this.news;
    }
            
}

module.exports = News;