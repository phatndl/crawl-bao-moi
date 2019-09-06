var { requestApi } = require("./request");

exports.format = (str) => {
    return str.match(/[^\s*].*[^\s*]/g);
}

exports.crawl = (crawlEls, callback) => {
    crawlEls.map( (crawlEl, i) => {
        requestApi(crawlEl.href).then((body) => {
            callback(crawlEl, body);
        })
    })
}