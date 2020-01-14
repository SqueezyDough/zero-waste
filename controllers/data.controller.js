const fs = require('fs');
const csvToJson = require('convert-csv-to-json');
const utils = require('./utils.controller');
const jsonSbi = csvToJson.getJsonFromCsv('./static/data/src/sbi-2019.csv');
const jsonWaste = csvToJson.formatValueByType().getJsonFromCsv('./static/data/src/waste.csv');
const cleanedSbiList = cleanSbiData(jsonSbi);

const dataController = {};

// assignSbiCategories(jsonWaste, cleanedSbiList);

dataController.load = function () {
  fetchData();

  // const stringifiedJson = JSON.stringify(jsonWaste);
  // utils.createJson(stringifiedJson, 'waste2');

  return true;
};

function fetchData () {
  fs.readFile('./static/data/output/waste.json', (err, jsonWaste) => {
    if (err) console.log(err);

    jsonWaste = JSON.parse(jsonWaste);

    fs.readFile('./static/data/src/districts.json', (err, districts) => {
      if (err) console.log(err);

      districts = JSON.parse(districts);

      const normalizedList = jsonWaste.map(item => {
        if (item.Buurtcode) {
          item.Buurtcode = item.Buurtcode.slice(0, -1);
        }

        return item;
      });

      districts.objects.buurten.geometries.forEach(district => {
        district.properties.waste = {
          ma: 0,
          di: 0,
          woe: 0,
          do: 0,
          vr: 0,
          zat: 0,
          zo: 0,
          total: 0
        };

        Object.defineProperty(district, 'getTotal', {
          get: function () {
            const total = Object.values(this.properties.waste).reduce((a, b) => a + b, 0);

            return total;
          }
        });
      });

      districts.objects.buurten.geometries.forEach(district => {
        const foundDistricts = normalizedList.filter(wasteItem => {
          const districtCode = district.properties.Buurtcombinatie_code;

          return wasteItem.Buurtcode === districtCode;
        });

        // TODO: Make smart
        if (foundDistricts) {
          foundDistricts.forEach(foundDistrict => {
            district.properties.waste.ma += foundDistrict.ma;
            district.properties.waste.di += foundDistrict.di;
            district.properties.waste.woe += foundDistrict.woe;
            district.properties.waste.do += foundDistrict.do;
            district.properties.waste.vr += foundDistrict.vr;
            district.properties.waste.zat += foundDistrict.zat;
            district.properties.waste.zo += foundDistrict.zo;
            district.properties.waste.total = district.getTotal;
          });
        }

        const stringifiedJson = JSON.stringify(districts);
        utils.createJson(stringifiedJson, 'wasteByDistrict');
      });
    });
  });
}

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
    }
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

module.exports = dataController;
