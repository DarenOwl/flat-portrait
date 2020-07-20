window.onload = function () {
    initColorPicker();
    AddBodyParts();
};

function initColorPicker(){
    var skin = [];
    skin = document.getElementsByClassName("skin");
    for (let element of skin){
        element.style.fill = "#ffe599";
    }
    var colorPicker = document.getElementById("colorPicker");
    colorPicker.value = "#ffe599";
    colorPicker.addEventListener('change', (e) => {
        for (let element of skin){
            element.style.fill = e.target.value;
        }
    });
}

function AddBodyParts() {
    var face = document.getElementById("face");
    face.innerHTML ="<path d=\"M 60 160 Q 100 160 100 190 Q 100 220 60 220 Z\" transform=\"rotate(90,80,190)\"/>";
}