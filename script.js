var editor;

window.onload = function () {
  var pack = DataProvider.GetBulbPack();
  console.log(pack);
  editor = new Editor("categories-menu", "editor-deck", "portrait-container");
  editor.ApplyPack(pack);
  //document.getElementById("download").onclick = () => canvg("canvas", document.getElementById("portrait-container").innerHTML)
  document.getElementById("download").onclick = () =>
    DownloadSvg("portrait-container", "flat-portrait.svg", "svg");
};
