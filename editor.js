class Editor {
    constructor(menuId, deckId, portraitContainerId){
        this.menu = document.getElementById(menuId);
        this.deck = document.getElementById(deckId);
        this.portraitContainer = document.getElementById(portraitContainerId);
        this.svgSettings = null;
        this.svg = null;
        this.layers = [];
    }

    ApplyPack(pack){        
        this.svgSettings = pack.svgSettings;
        this.svg = this.CreateSVG(pack.svgSettings);
        this.svg.setAttribute("id","portrait");
        this.SetPortraitSvg(this.svg);
        this.SetLayers(pack.layers);
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
        }
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

    AddSvgGroup(layer) {
        //создаемГруппу
        var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("id", layer.name);
        g.setAttribute("fill", GetRandomFrom(layer.fills));
        this.svg.appendChild(g);
    }

    SwitchLayer(layer) {
        this.deck.innerHTML = '';
        for (var id in layer.items) {
            var item = layer.items[id];
            this.AppendCardToDeck(item,layer.name,GetRandomFrom(layer.fills));
        }
        console.log("switched to layer: " + layer.name);
    }

    AppendCardToDeck(img, layerName, fill) {
        //создаем контейнер карточки
        var card = document.createElement("div");
        card.className = "card";
        //создаем svg-картинку для карточки
        var svg = this.CreateSVG(this.svgSettings);
        svg.setAttribute("class", "card-img");
        //создаем группу для задания заливки
        var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", "preview");
        g.innerHTML = img;
        svg.appendChild(g);
        //добавлям svg в карточку
        card.appendChild(svg);
        //вешаем onclick - добавление html в слой
        card.onclick = () => {
            var g = document.getElementById(layerName);
            g.innerHTML = img;
        }
        this.deck.appendChild(card);
    }
}