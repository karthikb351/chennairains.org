var Tabletop = require('tabletop');
var jsonfile = require('jsonfile');
var async = require('async');



var sheets = [
{
  name: "Aid Needed",
  url: 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=1kJjzLBoUwr1esfcAhKYFjgqKLD_LQoMLiVe69F3oWmg&output=html',
  api: 'aid-needed.json',
  sheetName: "Sheet1",
},
{
  name: "Contacts",
  url: 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=16igUy2WV8XIHYXTHl8VB76DdZc27i-yBbBct8gCOtIY&output=html',
  api: 'contacts.json',
  sheetName: "Sheet1",
},
{
  name: "Shelter",
  url: 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=1RGLsPlq9prGjyLPSkE1J-JJxs7UcI535ifPmpgtKDxo&output=html',
  api: 'shelter.json',
  sheetName: "Sheet1",
},
{
  name: "Aid Available",
  url: 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=1eGsS66xxlAO8MCmfyHS6isbpurwKQ1ucv6DaD31v3F8&output=html',
  api: 'aid-available.json',
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








