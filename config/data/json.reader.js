const fs = require('fs');

async function readJson(file) {
    return new Promise((resolve, reject) => {
        try {
            let fileName = `./config/data/${file}.data.json`;
            console.log(fileName);

            fs.readFile(fileName, 'utf8', (err, jsonString) => {
                if (err) {
                    console.log("File read failed:", err)
                    reject(err)
                }
                resolve(JSON.parse(jsonString))
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
                    console.log("File read failed:", err)
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