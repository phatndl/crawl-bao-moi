var { requestApi } = require("./request");

exports.format = (str) => {
    return str.match(/[^\s*].*[^\s*]/g);
}

exports.crawl = (crawlEls, callback) => {
    crawlEls.map((crawlEl, i) => {
        var newHref = crawlEl.href ? crawlEl.href.replace("/r/", "/c/") : "";
        // if (i <= 2){
        try{
            requestApi(newHref).then((body) => {
                // body.pipe(callback
                callback(crawlEl, body);
            })
        }catch(e){
            console.log(e, newHref, "Error here");
        }
        // }
        // else{
        //     console.log("not call api");
        // }
        
    })
}