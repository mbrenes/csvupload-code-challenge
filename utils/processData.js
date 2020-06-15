const { difference } = require("lodash");
const provider = require("../config/provider.config");
module.exports = {
    processData({ csvData, headers, columnNameAllow, providerName }) {
        return new Promise((resolve, reject) => {
            const necessaryColumns = [];
            const newData = [];
            // filter out necessary columns
            headers.forEach((value, index) => {
                if (columnNameAllow.includes(value)) {
                    necessaryColumns.push(index);
                }
            });

            // loop for csv file data
            for (let i = 0; i < csvData.length; i++) {
                let newRow = [];
                // loop check for single row
                for (let j = 0; j < csvData[i].length; j++) {
                    if (necessaryColumns.includes(j)) {
                        newRow.push(csvData[i][j]);
                    }
                }
                // check if some allowed column values are missing
                if (newRow.length < columnNameAllow.length) {
                    // return reject()
                    if (i === 0) {
                        let headerDifference = difference(
                            columnNameAllow,
                            newRow
                        );
                        // reject if missing column
                        return reject({
                            message: "Column missing in your file",
                            values: headerDifference,
                        });
                    }
                    let differenceColumn =
                        columnNameAllow.length - newRow.length;

                    // reject if missing column
                    return reject({
                        message: "Properties missing in your file",
                        values: differenceColumn,
                    });
                }
                newData.push(newRow);
            }

            resolve(newData);
        });
    },
};
