var list = document.getElementById('list');


function generate_table(id,columnNumber, w2p) {
  var body = document.getElementById(id);
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");


  for (const property in w2p) {
    var row = document.createElement("tr");  // creates a table row
    for (var j = 0; j < columnNumber; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at the end of the table row
      var cell = document.createElement("td");
      var cellText;
      if (j === 0) {
        cellText = document.createTextNode(property);  
      } else {
        cellText = document.createTextNode(w2p[property]);
      }
      
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tblBody.appendChild(row);        // add the row to the end of the table body
  }
  tbl.appendChild(tblBody);          // put the <tbody> in the <table>
  body.appendChild(tbl);             // appends <table> into <body>
}



chrome.storage.sync.get('w2p', function(data) {
  var w2p = (data && data['w2p']) ? data['w2p'] : {}
  generate_table('list',2,w2p)

  chrome.storage.sync.set({'w2p': w2p}, function() {
    
  });
});




