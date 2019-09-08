var request = require("request");
exports.requestApi = (endpoint) => {
    if (!endpoint) endpoint = "";
    const url = process.env.URL;
    var uri = url + endpoint;
    return new Promise((resolve, reject) => {
        request({
            uri,
            method: "GET",
            gzip: true,
        }, (err, res, body)=> {
            if (err) return reject(new Error('Could not request the API' + uri));
            if (res.statusCode !== 200) return reject(new Error('The API responsed status code '+ res.statusCode));
            resolve(body);
        }); 
    });
}