const utils = {};

// checks if string contains only numbers
utils.isNumber = function(string) {
    return /^\d+$/.test(string);
}

utils.addSbiProperty = function () {

}

utils.createJson = function (data, fileName) {
  fs.writeFile(`./data/output/${fileName}.json`, data, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = utils;