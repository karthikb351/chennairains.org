var Tabletop = require('tabletop');
var jsonfile = require('jsonfile');
var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=1kJjzLBoUwr1esfcAhKYFjgqKLD_LQoMLiVe69F3oWmg&output=html';
var tableTop;


function showInfo(dataSet, tabletop) {
  var obj = {
    columns: tableTop.sheets("Sheet1")['column_names'],
    rows: tableTop.sheets("Sheet1").toArray()
  }
  var file = 'src/api/aid-needed.json';

  jsonfile.writeFileSync(file, obj)
  console.log('saved');
}


tableTop = Tabletop.init( { key: public_spreadsheet_url,
  callback: showInfo,
  wanted: ["Sheet1"],
  simpleSheet: false } )

