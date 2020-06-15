const { isEqual, before } = require("lodash");
const { readFile } = require("../utils/readFile");
const { processData } = require("../utils/processData");
const validation = require("../utils/validation");
const provider = require("../config/provider.config");
const _ = require("lodash");
const fs = require('fs');

module.exports = {
  parseCsv(path, providerName) {
    return new Promise(async (resolve, reject) => {
      const { isValid, errors } = validation({
        providerName: providerName,
        file: path,
      });
      if (!isValid) {
        return reject(error);
      }

      let csvData = [];
      const columnNameAllow = provider[providerName];
      if (!columnNameAllow)
        return reject({
          provider: providerName,
        });

      try {
        csvData = await readFile(path);
      } catch (error) {
        console.log("Error reading the file", error);
        return reject(error);
      }
      const [headers = []] = csvData;
      let newData = [];
      if (isEqual(headers, columnNameAllow)) {
        newData = csvData;
      } else {
        newData = processData({ csvData, headers, columnNameAllow })
          .then((newData) => {
            var data = [];
            for (let index = 1; index < newData.length; index++) {
              let x1 = {};
              for (let index1 = 0; index1 < provider[providerName].length; index1++) {
                x1[provider[providerName][index1].replace(/\s/g, "")] = newData[index][index1];
                _.assign(x1, { provider: providerName }, { married: false });
              }
              data.push(x1);
            }
            const { create } = require("../utils/storeDB");
            create(data);
            fs.unlinkSync(path);

            console.log("Final Data", newData);
            resolve("File uploaded and successfully processed");
          })
          .catch((error) => reject(error.message, error.values));
      }
    });
  },
};
