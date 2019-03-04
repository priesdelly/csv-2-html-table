"use strict";

document.getElementById("input-file").addEventListener("change", getFile);

function getFile(event) {
  var input = event.target;

  if ("files" in input && input.files.length > 0) {
    placeFileContent(document.getElementById("content-target"), input.files[0]);
  }
}

function placeFileContent(target, file) {
  readFileContent(file).then(function (content) {
    var html = "<table  align=\"center\" border=\"1\" cellpadding=\"6\" cellspacing=\"0\">\n";
    var rows = content.split("\n");
    rows.forEach(function (row, rowNo) {
      row = row.replace(/(?:\r\n|\r|\n)/g, "");
      var columns = row.split(",");
      columns.forEach(function (col, colNo) {
        if (rowNo === 0) {
          html += "  <tr height=\"24\" style=\"height: 24px; text-align: center; color:#006400;font-weight: bold;\">\n";
          html += "    <th>".concat(col, "</th>\n");
        } else {
          html += "  <tr height=\"24\" style=\"height:24px;\">\n";
          html += "    <td>".concat(col, "</td>\n");
        }
      });
      html += "  </tr>\n";
    }); // target.value = content;

    target.value = html;
  }).catch(function (error) {
    return console.log(error);
  });
}

function readFileContent(file) {
  var reader = new FileReader();
  return new Promise(function (resolve, reject) {
    reader.onload = function (event) {
      return resolve(event.target.result);
    };

    reader.onerror = function (error) {
      return reject(error);
    };

    reader.readAsText(file);
  });
}