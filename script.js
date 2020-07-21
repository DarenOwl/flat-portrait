

window.onload = function () {
    initColorPicker();
    AddBodyParts();
    console.log(portraitPack);
    var c = new Controller("portrait", null, "categories-menu");
    c.ApplyPortraitPack(portraitPack);
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
    face.innerHTML ="<path d=\"M 60 160 Q 100 160 100 190 Q 100 220 60 220 Z\" transform=\"rotate(90,80,190)\"/><ellipse cx=\"80\" cy=\"100\" rx=\"80\" ry=\"100\"/>";
}

/**Формирует портрет и меню */
class Controller {
    constructor(portraitSvgId, deckId, menuId){
        this.portrait = new Portrait(portraitSvgId);
        this.editor = new Editor(deckId, menuId);
    }

    ApplyPortraitPack(pack){
        //применяем viewBox чтобы картинки правильно отображались
        this.portrait.ApplyViewBox(pack.viewBox);

        for (var id in pack.layers) {
            var layer = pack.layers[id];
            console.log("layer found: " + layer.name);
            //добавляем слой в портрет
            this.portrait.AppendLayer(layer.name);
            //добавляем слой в редактор
            this.editor.AppendLayer(layer);
        }
    }
}

class Editor {
    constructor(deckId, menuId){
        this.menu = document.getElementById(menuId);
        this.deck = document.getElementById(deckId);
        this.layers = [];
    }

    AppendLayer(layer){
        this.layers.push(Layer);

        var card = document.createElement("div");
        card.className = "card-menu";

        var icon = document.createElement("img");
        icon.class = "card-menu-img";
        icon.src = layer.icon;
        icon.alt = layer.name;
        card.appendChild(icon);

        this.menu.appendChild(card);
        console.log("menu button added: " + layer.name);
    }
}

class Layer {
    constructor(name){
        this.name = name;
        this.items = [];
    }
}

/**Управление элементом <svg> в документе */
class Portrait {
    constructor(svgId){
        this.layers = []
        this.svg = document.getElementById(svgId);
        this.svg.innerHTML=null;
    }

    ApplyViewBox(viewBox){
        this.svg.setAttribute("viewBox",viewBox)
    }
    
    AppendLayer(name){
        var g = document.createElement("g");
        g.id = name;
        this.layers[name] = g; 
        this.svg.appendChild(g);
        console.log("svg group added: " + name);
    }

    SetLayerContent(name, content){
        this.layers[name].innerHTML = content;
    }
}


//данные--------------------------------------------------------------------------------
var portraitPack = {
    viewBox: 'viewBox="-0.5 -0.5 412 585"',
    layers: [
        {
            name: "bg",
            icon: null,
            items: [ '<rect x="0" y="0" width="410" height="583" rx="61.5" ry="61.5"/>'],
            fills: ['none','white']
        },
        {
            name: "hair",
            icon: null,
            items: [
                '<ellipse cx="205" cy="228" rx="90" ry="100"/><ellipse cx="278.5" cy="148" rx="37.5" ry="30" transform="rotate(50,278.5,148)"/><ellipse cx="128" cy="150.5" rx="37.5" ry="30" transform="translate(128,0)scale(-1,1)translate(-128,0)rotate(-130,128,150.5)"/><path d="M 108 197 L 108 187 L 138 197 Z" transform="rotate(-240,123,192)"/><path d="M 274.17 186.71 L 274.17 176.71 L 294.17 186.71 Z" transform="rotate(15,284.17,181.71)"/>',
                '<ellipse cx="205" cy="227" rx="90" ry="100"/><path d="M 300.13 369.98 C 281.88 386.49 281.88 411.47 300.13 427.98 C 318.38 411.47 318.38 386.49 300.13 369.98 Z"/><circle cx="274" cy="317"/><circle cx="265" cy="285"/><circle cx="285.5" cy="342"/><circle cx="294.5" cy="362.5"/>'
            ],
            fills: ['#4F220A','#9E4314','#FCE390','#876C36','#1F0D04','#8C8669']
        },
        {
            name: "face",
            icon: null,
            items: [
                '<rect x="180" y="330" width="50" height="60""/><path d="M 184.28 308 L 240 308 Q 211.44 333 240 358 L 184.28 358 Q 155.72 333 184.28 308 Z" fill-opacity="0.2" fill="#000000" transform="rotate(270,205,333)"/><ellipse cx="205" cy="425" rx="85" ry="55"/><ellipse cx="205" cy="255" rx="80" ry="95"/>',
                '<rect x="180" y="330" width="50" height="60""/><path d="M 184.28 308 L 240 308 Q 211.44 333 240 358 L 184.28 358 Q 155.72 333 184.28 308 Z" fill-opacity="0.2" fill="#000000" transform="rotate(270,205,333)"/><ellipse cx="205" cy="425" rx="85" ry="55"/><ellipse cx="205" cy="255" rx="80" ry="95"/><path d="M 190.24 255 L 254 255 Q 181.52 310 254 365 L 190.24 365 Q 117.76 310 190.24 255 Z" transform="rotate(270,204,310)"/>'
            ],
            fills: ['#ffdbac','#f1c27d','#e0ac69','#c68642','#8d5524']
        }
    ]
}