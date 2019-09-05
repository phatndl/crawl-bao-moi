var providerModel = require("../models/providerModel");

exports.saveProvider = (data) => {
    providerModel.create(data)
    .then(result => {console.log("provider is created in database")})
    .catch(e => { new Error(e) })
}

exports.getProviders = () => {
    return new Promise((resolve, reject) => {
        providerModel.find((err, result) => {
            if (err) reject(new Error(err));
            resolve(result);
        })
    })
}