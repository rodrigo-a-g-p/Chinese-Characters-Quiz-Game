const fs = require("fs");
const csvString = require("csv-string");

exports.getData = (filepath) => {
  return csvString.parse(fs.readFileSync(filepath, "utf8"));
};

exports.getAllFilesInFolder = (folderPath, fileType) => {
  const allFilesInFolder = fs.readdirSync(folderPath);

  if (fileType !== "csv") {
    return allFilesInFolder;
  }

  const combinedData = [];

  allFilesInFolder.forEach((file) => {
    const currentFileData = this.getData(`${folderPath}/${file}`);
    combinedData.push(...currentFileData);
  });

  return [...new Set(combinedData)]; // remove duplicates
};
