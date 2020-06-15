const fs = require("fs");
const csv = require("csv-parse");

module.exports = {
    readFile(path) {
        const csvData = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(path)
                .pipe(csv({ delimiter: ";" }))
                .on("data", function (row) {
                    csvData.push(row);
                })
                .on("end", function () {
                    resolve(csvData);
                })
                .on("error", function (error) {
                    reject(error);
                });
        });
    },
};
