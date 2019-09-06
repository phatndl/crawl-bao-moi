var providerModel = require("../models/providerModel");
var mongoose = require("mongoose");
const cheerio = require('cheerio');

var Provider = class Providers {

    constructor(){
        this.data = [];
    }

    reset(){
        this.data = []
    }

    process(_id, body){
        var $ = cheerio.load(body);
        console.log("_id: ", _id, $(".story").length);
        // reset
        this.reset();
        var self = this;
        $('.story').each((idx, article) => {
            var sourceId = new mongoose.mongo.ObjectId(_id);
            var thumb = $(article).find(".story__thumb img").attr("src");
            var title = $(article).find(".story__heading a").text();
            var href = $(article).find(".story__heading a").attr("href");
            var time = $(article).find("time").attr("datetime");
            var relate = $(article).find(".relate").text()
            
            var pos = self.data.findIndex(s => s.sourceId === sourceId);
            if (pos === -1){
                self.data.push({
                    sourceId,
                    length: $(".story").length * 1,
                    data: [{
                        idx, thumb, title, href, time, relate
                    }]
                })
            }
            else{
                self.data[pos].data.push({
                    idx, thumb, title, href, time, relate
                })
            }
        });
        return this; 
    }

    save(){
        providerModel.create(this.data, (err, result) => {
            if (err) return new Error(err);
            console.log("provider is created in database");
            return this;
        })

    }
}

exports.getProviders = () => {
    return new Promise((resolve, reject) => {
        providerModel.find((err, result) => {
            if (err) reject(new Error(err));
            resolve(result);
        })
    })
}

module.exports = Provider;