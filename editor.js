class Editor {
    constructor(menuId, deckId, portraitContainerId){
        this.menu = document.getElementById(menuId);
        this.deck = document.getElementById(deckId);
        this.portraitContainer = document.getElementById(portraitContainerId);
        this.pack = null;
        this.svg = null;
    }

    ApplyPack(pack){      
        this.pack = pack;  
        this.pack.svgSettings = pack.svgSettings;
        this.svg = this.CreateSVG(pack.svgSettings);
        this.svg.setAttribute("id","portrait");
        this.SetPortraitSvg(this.svg);
        this.SetLayers(pack.layers);
        this.AddRandomButton();
    }

    CreateSVG(settings){
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", settings.width);
        svg.setAttribute("height", settings.width);
        svg.setAttribute("viewBox", settings.viewBox);
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        return svg;        
    }

    SetPortraitSvg(svg){
        this.portraitContainer.innerHTML = '';
        this.portraitContainer.appendChild(svg);
    }

    SetLayers(layersData) {
        var baseAdded = false;
        for (var id in layersData) {
            var layer = layersData[id];
            //добавляем кнопку в меню
            this.AddMenuButton(layer);
            //добавляем группу в svg для слоя
            this.AddSvgGroup(layer);
        }
    }

    AddMenuButton(layer){
        var button = document.createElement("button");
        button.className = "card-menu";
        //onclick переключаем слой в эдиторе
        button.onclick = () => {
            this.SwitchLayer(layer);
        };
        //добавляем иконку кнопки
        var icon = document.createElement("img");
        icon.class = "card-menu-img";
        icon.src = layer.icon;
        icon.alt = layer.name;
        button.appendChild(icon);
        //добавляем кнопку в меню
        this.menu.appendChild(button);
        console.log("menu button added: " + layer.name);
    }

    AddRandomButton(){
        var button = document.createElement("button");
        button.className = "card-menu";
        //onclick запукаем рандом
        button.onclick = () => { this.Random();};
        //добавляем иконку кнопки
        var icon = document.createElement("img");
        icon.class = "card-menu-img";
        icon.src = "img/random.png";
        icon.alt = "R";
        button.appendChild(icon);
        //добавляем кнопку в меню
        this.menu.appendChild(button);
        console.log("menu button added: " + layer.name);
    }

    AddSvgGroup(layer) {
        //создаемГруппу
        var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("id", layer.name);
        g.setAttribute("class", "portrait-group");
        g.setAttribute("fill", GetRandomFrom(layer.fills));
        g.onclick = (e) => {
            console.log("clicked on part: " + layer.name);
            ColorPicker.Open(e.x, e.y, layer.fills, (color) => g.setAttribute("fill", color), g.getAttribute("fill"));
            this.SwitchLayer(layer);
        };
        this.svg.appendChild(g);
    }

    SwitchLayer(layer) {
        this.deck.innerHTML = '';
        for (var id in layer.items) {
            var item = layer.items[id];
            this.AppendCardToDeck(item,layer);
        }
        console.log("switched to layer: " + layer.name);
    }

    AppendCardToDeck(img, layer) {
        //создаем контейнер карточки
        var card = document.createElement("div");
        card.className = "card";
        //создаем svg-картинку для карточки
        var svg = this.CreateSVG(this.pack.svgSettings);
        svg.setAttribute("class", "card-img");
        //создаем группу для задания заливки элемента
        var el = document.createElementNS("http://www.w3.org/2000/svg", "g");
        el.setAttribute("class", "preview");
        el.innerHTML = img;
        //создаем группу для задания заливки базы
        var base = document.createElementNS("http://www.w3.org/2000/svg", "g");
        if (layer.position == 0) {
            base.setAttribute("class", "preview");
        } else {
            base.setAttribute("class", "base");
        }        
        base.innerHTML = this.pack.base.svg;
        //в зависимости от пложения слоя добавляем группу
        if (layer.position < 0){
            svg.appendChild(el);
            svg.appendChild(base);
        } else {
            svg.appendChild(base);
            svg.appendChild(el);
        }
        //вставляем превью элемента в карточку
        card.appendChild(svg);
        //вешаем onclick - добавление html в слой
        card.onclick = () => {
            var g = document.getElementById(layer.name);
            if (layer.position == 0){
                g.innerHTML = this.pack.base.svg + img;
            } else {
                g.innerHTML = img;
            }
        }
        this.deck.appendChild(card);
    }

    Random(){
        if (this.pack == null){
            return;
        }
        for(var id in this.pack.layers) {
            let layer = this.pack.layers[id];
            let g = document.getElementById(layer.name);
            if (layer.position == 0) {
                g.innerHTML = this.pack.base.svg + GetRandomFrom(layer.items);
            } else {
                g.innerHTML = GetRandomFrom(layer.items);
            }
            g.setAttribute("fill", GetRandomFrom(layer.fills));
            
        }
    }
}