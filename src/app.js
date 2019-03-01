document.getElementById("input-file").addEventListener("change", getFile);

function getFile(event) {
  const input = event.target;
  if ("files" in input && input.files.length > 0) {
    placeFileContent(document.getElementById("content-target"), input.files[0]);
  }
}

function placeFileContent(target, file) {
  readFileContent(file)
    .then((content) => {
      let html = "<table>\n";
      let rows = content.split("\n");

      rows.forEach((row, rowNo) => {
       
        row = row.replace(/(?:\r\n|\r|\n)/g, '');

        html += "  <tr>\n";
        let columns = row.split(",");
        columns.forEach((col, colNo) => {
         
          if (rowNo === 0) {
            html += `    <th>${col}</th>\n`;
          } else {
            html += `    <td>${col}</td>\n`;
          }

        });

        html += "  </tr>\n";
      });

      // target.value = content;
      target.value = html;
    })
    .catch((error) => console.log(error));
}

function readFileContent(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}
