var Tabletop = require('tabletop');
var jsonfile = require('jsonfile');
var async = require('async');


var sheets = [
{
  name: "Contacts",
  url: 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=16igUy2WV8XIHYXTHl8VB76DdZc27i-yBbBct8gCOtIY&output=html',
  api: 'contacts.json',
  sheetName: "Sheet1",
},
{
  name: "Donations",
  url: 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=1b_TwedOK0BmgEDlv_MEp8-e9k1wixcSQ-he5rMjQPDQ&output=html',
  api: 'donate.json',
  sheetName: "Donation URLs",
},
{
  name: "Area Updates",
  url: 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=1HQyV2LLXvevbREcE3DJVmyGd6PFxt0g1RNb8ePYTK88&output=html',
  api: 'area-updates.json',
  sheetName: "CurrentStatus",
},
{
  name: "Safety Check",
  url: 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=1rtpdPrcnKMNdtWpeYk2YnPOuUgecxWpCGZWn-vGYV7k&output=html',
  api: 'safety-check.json',
  sheetName: "Sheet1",
}
];

async.forEach(sheets, function (item, callback){

  function writeData(dataSet, tabletop) {
    var obj = {
      columns: tabletop.sheets(item.sheetName)['column_names'],
      rows: tabletop.sheets(item.sheetName).toArray()
    }
    var file = 'src/api/'+item.api;

    jsonfile.writeFileSync(file, obj)
    console.log('Saved: '+item.name);
    callback();
  }
  Tabletop.init( { key: item.url,
    callback: writeData,
    wanted: [item.sheetName],
    simpleSheet: false } )

  }, function(err) {
    console.log('Done');
  });  








