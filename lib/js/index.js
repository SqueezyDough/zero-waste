const csvToJson = require('convert-csv-to-json');

// const fs = require('fs');

const utils = require('./lib/utils.js');

const jsonSbi = csvToJson.getJsonFromCsv('./data/src/sbi-2019.csv');
const jsonWaste = csvToJson.formatValueByType().getJsonFromCsv('./data/src/waste.csv');

const cleanedSbiList = cleanSbiData(jsonSbi);

assignSbiCategories(jsonWaste, cleanedSbiList);

function cleanSbiData (data) {
  const results = data.map(obj => {
    const sbi = {};

    // remove dots and spaces
    let identifier = obj.SBI.replace(/\./g, '').trim();

    // parse to a number if a number
    if (utils.isNumber(identifier)) {
      identifier = parseInt(identifier);
    }

    // define object
    sbi.id = identifier;
    sbi.label = obj['StandaardBedrijfsindeling2008-versie2018update2019'];

    sbi.label = sbi.label.replace(/"/g, '').trim();
    console.log(sbi.label);

    return sbi;
  });

  return results;
}

function assignSbiCategories (data, sbiList) {
  data.forEach(obj => {
    if (obj.SBI) {
      const matchedSbi = findSbiId(obj.SBI, sbiList);

      if (matchedSbi) {
        obj.sbiSubCategory = matchedSbi.label;
      } else {
        if (utils.isNumber(obj.SBI)) {
          obj.sbiSubCategory = forceMatch(obj.SBI, sbiList).label;
        }
      }

      const categoryCode = findMainCategory(obj.code, sbiList);
      obj.sbiMainCategory = categoryCode;

      // console.log(categoryCode)
    }

    // console.log(obj)
  });
}

// RECURSIVE: finds an sbi object with decreased specificity
function forceMatch (id, sbiList) {
  const matchedSbi = findSbiId(id, sbiList);

  if (matchedSbi) {
    return matchedSbi;
  } else {
    let substring = id.toString();

    substring = substring.slice(0, -1);
    substring = parseInt(substring);

    return forceMatch(substring, sbiList);
  }
}

function findSbiId (id, sbiList) {
  return sbiList.find(x => x.id === id);
}

function findMainCategory (code, sbiList) {
  return sbiList.find(x => x.id === code);
}
