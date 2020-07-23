var editor;

window.onload = function () {
    var pack = DataProvider.GetData();
    console.log(pack);
    editor = new Editor("categories-menu","editor-deck","portrait-container");
    editor.ApplyPack(pack);
};