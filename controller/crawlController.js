var crawlModel = require("../models/crawlModel");

exports.save = function(data){
    crawlModel.create(data)
    .then(function(result){
        console.log("Saved data to database");
    }).catch(function(e){
        new Error(e);
    })
}

exports.getAll = function(){
    return crawlModel.find((err, result) => {
        return new Promise((resolve, reject) => {
            console.log(err, "err")
            if(err) reject( new Error("Can't get data from database"));

            // console.log(result, "data");
            resolve(result)
        })
    })
}