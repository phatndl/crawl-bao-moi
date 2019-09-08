var providerModel = require("../models/providerModel");
var mongoose = require("mongoose");
const cheerio = require('cheerio');
var { format } = require("../utils/format");

var Provider = class Providers {

    constructor(){
        this.data = {};
    }

    reset(){
        this.data = {}
    }

    process(id, body){
        var $ = cheerio.load(body);
        // reset
        this.reset();
        var self = this;
        
        $('.story').each((idx, article) => {
            var _id = new mongoose.mongo.ObjectId(id);
            var thumb = $(article).find(".story__thumb img").attr("src");
            var title = $(article).find(".story__heading a").text();
            var href = $(article).find(".story__heading a").attr("href");
            var time = $(article).find("time").attr("datetime");
            var relate = $(article).find(".relate").text();
            var source = format($(article).find(".source").text());
            
            // var pos = self.data.findIndex(s => s._id === _id);
            if (href){
                // console.log("href:" , href);
                if (!idx){
                    self.data = {
                        _id,
                        length: $(".story").length * 1,
                        data: [{
                            idx, thumb, title, href, time, relate, source: source ? source[0] : ""
                        }]
                    }
                }
                else{
                    self.data.data.push({
                        idx, thumb, title, href, time, relate, source: source ? source[0] : ""
                    })
                }
            }
        });
        console.log($(".story").length, id);
        // console.log(this.data)
        return this; 
    }

    save(){
        providerModel.create(this.data).then(result => {
            console.log("provider is created in database");
        }).catch(e => console.log("error before save", this.data.length))
        
        return this;
        
    }

    get(){
        return new Promise((resolve, reject) => {
            providerModel.find((err, result) => {
                if (err) reject(new Error(err));
                resolve(result);
            })
        })
    }
}


module.exports = Provider;