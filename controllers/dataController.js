const {
  getData,
  getAllFilesInFolder,
} = require("./../utils/dataHelperFunctions");

exports.getCSVData = (req, res, next) => {
  let result;

  if (req.params.level === "ALL") {
    result = getAllFilesInFolder(`${__dirname}/../data`, "csv");
  } else {
    result = getData(`${__dirname}/../data/${req.params.level}.csv`);
  }

  result = result
    .filter((el) => el[0] !== "Hanzi" && el[1] !== "Pinyin")
    .sort((a, b) => a[1].localeCompare(b[1], ["zh-CN-u-co-pinyin"]));

  res.status(200).json({
    status: "success",
    result,
  });
};

exports.getAllAssets = (req, res, next) => {
  res.status(200).json({
    status: "success",
    result: getAllFilesInFolder(`${__dirname}/../public/${req.params.type}`),
  });
};
