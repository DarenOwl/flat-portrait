function GetRandomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function DownloadSvg(ContainerId, filename, filetype) {
  var data = document.getElementById(ContainerId).innerHTML;
  var file = new Blob([data], { type: filetype });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}
