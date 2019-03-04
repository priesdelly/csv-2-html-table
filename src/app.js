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
      let html = `<table  align="center" border="1" cellpadding="6" cellspacing="0">\n`;
      let rows = content.split("\n");

      rows.forEach((row, rowNo) => {
        row = row.replace(/(?:\r\n|\r|\n)/g, "");

        let columns = row.split(",");
        columns.forEach((col, colNo) => {
          if (rowNo === 0) {
            html += `  <tr height="24" style="height: 24px; text-align: center; color:#006400;font-weight: bold;">\n`;
            html += `    <th>${col}</th>\n`;
          } else {
            html += `  <tr height="24" style="height: 24px;">\n`;
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
