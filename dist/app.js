"use strict";

document.getElementById("input-file").addEventListener("change", getFile);

function getFile(event) {
  var input = event.target;

  if ("files" in input && input.files.length > 0) {
    placeFileContent(document.getElementById("content-target"), input.files[0]);
  }
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

function placeFileContent(target, file) {
  readFileContent(file).then(function (content) {
    var html = "<table align=\"center\" border=\"1\" cellpadding=\"6\" cellspacing=\"0\">\n";
    var rows = content.split("\n");
    rows.forEach(function (row, rowNo) {
      if (row === "") {
        return;
      }

      row = row.replace(/(?:\r\n|\r|\n)/g, "");

      if (rowNo === 0) {
        html += "  <tr height=\"24\" style=\"height: 24px; text-align: center; color:#006400;\">\n";
      } else {
        html += "  <tr height=\"24\" style=\"height: 24px;\">\n";
      }

      var columns = row.split(",");
      columns.forEach(function (col, colNo) {
        col = col.replace(/(?:\r\n|\r|\n)/g, "");
        col = col.replace(/(?:")/g, "");

        if (rowNo === 0) {
          html += "    <th><strong>".concat(col, "<strong></th>\n");
        } else {
          html += "    <td>".concat(col, "</td>\n");
        }
      });
      html += "  </tr>\n";
    });
    html += "</table>\n"; // target.value = content;

    target.value = html;
  }).catch(function (error) {
    return console.log(error);
  });
}