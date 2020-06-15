const { isEqual, before } = require("lodash");
const { readFile } = require("../../utils/readFile");
const { processData } = require("../../utils/processData");
const validation = require("../../utils/validation");
const provider = require("../../config/provider.config");
const responseHelper = require("../../helpers/response.helper");
const _ = require("lodash");
const fs = require("fs");

module.exports = {
  async parseCsv(req, res) {
    const {
      params: { providerName = null },
      file = {},
    } = req;
    const { path = null } = file;
    console.log(req.file);
    const { isValid, errors } = validation({
      providerName,
      file,
    });
    if (!isValid) {
      return responseHelper.badRequest(res, "", error);
    }

    let csvData = [];
    const columnNameAllow = provider[providerName];
    if (!columnNameAllow)
      return responseHelper.badRequest(res, "Invalid Provider", {
        provider: providerName,
      });

    try {
      csvData = await readFile(path);
    } catch (error) {
      console.log("Error reading the file", error);
      return responseHelper.badRequest(res, "Error reading the file", error);
    }
    const [headers = []] = csvData;
    let newData = [];
    if (isEqual(headers, columnNameAllow)) {
      newData = csvData;
    } else {
      newData = processData({
        csvData,
        headers,
        columnNameAllow,
        provider: providerName,
      })
        .then((newData) => {
          console.log(newData);
          var data = [];
          for (let index = 1; index < newData.length; index++) {
            let x1 = {};
            for (let index1 = 0; index1 < provider[providerName].length; index1++) {
              x1[provider[providerName][index1].replace(/\s/g, "")] = newData[index][index1];
              _.assign(x1, { provider: providerName }, { married: false });
            }
            data.push(x1);
          }

          const { create } = require("../../utils/storeDB");
          create(data);
          fs.unlinkSync(req.file.path);



          console.log("Final Data", data);
          return responseHelper.success(res, {}, "File uploaded and successfully processed");
        })
        .catch((error) => responseHelper.badRequest(res, error.message, error.values));
    }
  },

  getProvider(req, res) {
    const provider = req.params.providerName;
    const { findProviderStuff } = require("../../utils/storeDB");
    console.log(provider);
    findProviderStuff(provider).then((data) => responseHelper.success(res, data, "Success"));
  },
};
