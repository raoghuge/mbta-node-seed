const fs = require('fs');

async function readJson(file) {
    return new Promise((resolve, reject) => {
        try {
            let fileName = `./config/data/${file}.data.json`;

            fs.readFile(fileName, 'utf8', (err, jsonString) => {
                if (err) {
                    reject(err)
                }
                if(jsonString){
                    resolve(JSON.parse(jsonString))
                }else{
                    resolve([]);
                }
                
            })
        } catch (error) {
            reject(error)
        }

    })
}

async function saveToJson(file, data) {
    return new Promise((resolve, reject) => {
        try {
            let fileName = `./config/data/${file}.data.json`;
            fs.readFile(fileName, 'utf8', (err, jsonString) => {
                if (err) {
                    reject(err)
                }
                jsonString = JSON.parse(jsonString);
                jsonString.push(data);
                fs.writeFile(fileName, JSON.stringify(jsonString), 'utf8', function (err) {
                    if (err)
                        reject(err);
                    resolve(jsonString)
                });
               
            })
        } catch (error) {
            reject(error)
        }

    })
}

module.exports = {
    readJson,
    saveToJson
}