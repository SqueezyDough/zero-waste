'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const csvToJson = require('convert-csv-to-json');

const utils = require('./utils.js')

const app = express();
const port = process.env.PORT || 3000;

app
  .use('/lib', express.static(path.join(__dirname, 'lib')))
  .listen(port, () => console.log(`App listening on port ${port}!`));

const jsonSbi = csvToJson.getJsonFromCsv('./data/src/sbi-2019.csv');
const jsonWaste = csvToJson.formatValueByType().getJsonFromCsv('./data/src/waste.csv');

let cleanedSbiList = cleanSbi(jsonSbi);

assignSbiLabels(jsonWaste, cleanedSbiList)

function cleanSbi(data) {
  let results = data.map( obj => {
    let sbi = {};

    // remove dots and spaces
    let identifier = obj.SBI.replace(/\./g,'').trim();

    // parse to a number if a number
    if (utils.isNumber(identifier)) {
      identifier = parseInt(identifier)
    }

    // define object
    sbi.id = identifier;
    sbi.label = obj['StandaardBedrijfsindeling2008-versie2018update2019']

    return sbi;
  });

  return results;
}

function assignSbiLabels(data, sbiList) {
  data.forEach( obj => {
  
    if (obj.SBI) {
      let matchedSbi = findSbiId(obj.SBI, sbiList);

      if (matchedSbi) {
        obj.sbiLabel = matchedSbi;
      } else {
        if (utils.isNumber(obj.SBI)) {
          //console.log(obj)
          
          forceMatch(obj.SBI, sbiList);  
        }      
      }  
    }  
  });
}

// RECURSIVE: finds an sbi object with decreased specificity 
function forceMatch(id, sbiList) {
  let matchedSbi = findSbiId(id, sbiList);
  
  if (matchedSbi) {
    return matchedSbi;
  } else {
    let substring = id.toString();

    substring = substring.slice(0, -1);
    substring = parseInt(substring);

    forceMatch(substring, sbiList)
  } 
}

function findSbiId(id, sbiList) {
  return sbiList.find(x => x.id === id);
}
