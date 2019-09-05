var categoryModel = require("../models/categoryModel");

exports.saveCaterogies = (data) => {
    categoryModel.create(data)
    .then(result => {console.log("category is created in database")})
    .catch(e => {console.log(e)})
}

exports.getCaterogies = () => {
    return new Promise((resolve, reject) => {
        categoryModel.find((err, result) => {
            if (err) reject(new Error("can't get categories from database"));
            resolve(result);
        })
    })
   
}