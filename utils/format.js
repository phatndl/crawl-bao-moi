var { requestApi } = require("./request");
var { event } = require("../event");
var Queue = require("../queue");
const cheerio = require('cheerio');

exports.format = (str) => {
    return str.match(/[^\s*].*[^\s*]/g);
}
var queue = new Queue(1);

exports.crawl = (crawlEls, eventEmitter, callback) => {
    var i = 0;
    var curEl = 0;
    event.add("process", function(){
        try{
            var crawlEl = crawlEls[i];
            if (queue.add(crawlEl)){
                var el = queue.first;
                var newHref = el.href ? el.href.replace("/r/", "/c/") : "";
                requestApi(newHref).then((body) => {
                    curEl = el;
                    callback(el, body);
                })
            }
        }catch(e){
            console.log("Error: ", e);
        }
    })

    event.add("success-DB", function(){
        if (i === crawlEls.length - 1) {
            event.emit("finish");
        }
        else{
            queue.remove();
            i++;
            event.emitEvent("process");
        }
    })

    event.add("error-DB", function(){
        console.log(curEl, "curEl");
        i++;
        event.emitEvent("process");
    })


    event.emitEvent("process");

    // }, 5);

    // crawlEls.map((crawlEl, i) => {
    // for (var i = 0; i < crawlEls.length; i++){
    //     var crawlEl = crawlEls[i];
    //     var newHref = crawlEl.href ? crawlEl.href.replace("/r/", "/c/") : "";
    //     if (queue.add(newHref)){
    //         var el = queue.first;
    //         console.log("el: ", el);
    //         requestApi(el).then((body) => {
    //             console.log("callback");
    //             callback(crawlEl, body);
    //             queue.remove();
    //         })
    //     }
    //     else{
    //         console.log("wait i: ", i);
    //         i = i - 1;
    //     }
    // // }
    // return true;


        // try{
        //     requestApi(newHref).then((body) => {
        //         // body.pipe(callback
        //         callback(crawlEl, body);
        //     })
        // }catch(e){
        //     console.log(e, newHref, "Error here");
        // }        
    // })
}