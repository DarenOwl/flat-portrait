class Editor {
  constructor(menuId, deckId, portraitContainerId) {
    this.menu = document.getElementById(menuId);
    this.deck = document.getElementById(deckId);
    this.portraitContainer = document.getElementById(portraitContainerId);
    this.colorPicker = new ColorPicker();
    this.pack = null;
    this.layerFills = null;
  }

  ApplyPack(pack) {
    this.pack = pack;
    this.layerFills = {};
    for (var key in this.pack.groups) {
      var group = this.pack.groups[key];
      this.layerFills[group.name] = group.fills;
    }
    var svg = this.CreateSVG(pack.svgSettings, "portrait");
    this.SetPortraitSvg(svg);
    //this.SetGroups(svg, pack.groups);
    this.SetLayers(svg, pack.layers);
    this.AddRandomButton();
    //устанавливаем случайный набор
    this.Random();
  }

  CreateSVG(settings, id = null, className = null) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", settings.width);
    svg.setAttribute("height", settings.width);
    svg.setAttribute("viewBox", settings.viewBox);
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("id", id);
    svg.setAttribute("class", className);
    return svg;
  }

  SetPortraitSvg(svg) {
    this.portraitContainer.innerHTML = "";
    this.portraitContainer.appendChild(svg);
  }

  SetGroups(svg, groupsData) {
    for (var key in groupsData) {
      var group = groupsData[key];
      //добавляем группу в svg для группы слоев
      svg.appendChild(this.CreateSvgGroup(group));
      console.log("svg group added for layers group: " + group.name);
    }
  }

  SetLayers(svg, layersData) {
    for (var id in layersData) {
      var layer = layersData[id];
      //добавляем кнопку в меню
      this.AddMenuButton(layer);
      //добавляем слой в svg
      svg.appendChild(this.CreateSvgLayer(layer));
      console.log("svg group added for layer: " + layer.name);
    }
  }

  AddMenuButton(layer) {
    var button = document.createElement("button");
    button.className = "card-menu";
    //onclick переключаем слой в эдиторе
    button.onclick = () => {
      this.SwitchLayer(layer);
    };
    //добавляем иконку кнопки
    var icon = document.createElement("i");
    icon.setAttribute("class", layer.icon);
    button.appendChild(icon);
    //добавляем кнопку в меню
    this.menu.appendChild(button);
    console.log("menu button added: " + layer.name);
  }

  AddRandomButton() {
    var button = document.createElement("button");
    button.className = "card-menu";
    button.setAttribute("id", "random");
    //onclick запукаем рандом
    button.onclick = () => this.Random();
    //добавляем иконку кнопки
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-dice");
    button.appendChild(icon);
    //добавляем кнопку в меню
    this.menu.appendChild(button);
    console.log("random button added");
  }

  CreateSvgLayer(layer) {
    //создаем группу с id = имя слоя
    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("id", layer.name);
    //при нажатии на слой переключаем панель выбора элементов на этот слой
    g.onclick = (e) => {
      console.log("clicked on part: " + layer.name);
      this.colorPicker.Open(
        e.x,
        e.y,
        this.layerFills[layer.group],
        (color) => {
          g.setAttribute("fill", color);
          if (!layer.independent) {
            for (var key in this.pack.layers) {
              var dependentLayer = this.pack.layers[key];
              if (dependentLayer.group != layer.group) {
                continue;
              }
              let dependentG = document.getElementById(dependentLayer.name);
              dependentG.setAttribute("fill", color);
            }
          }
        },
        g.getAttribute("fill")
      );
      this.SwitchLayer(layer);
    };
    return g;
  }

  SwitchLayer(layer) {
    this.deck.innerHTML = "";
    for (var id in layer.items) {
      var item = layer.items[id];
      this.AppendCardToDeck(item, layer);
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
    if (layer.position < 0) {
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
      g.innerHTML = img;
    };
    this.deck.appendChild(card);
  }

  Random() {
    if (this.pack == null) {
      return;
    }
    //выбираем случайные заливки для групп элементов
    var randomFills = {};
    for (var key in this.pack.groups) {
      var group = this.pack.groups[key];
      randomFills[group.name] = GetRandomFrom(group.fills);
    }
    //выбираем случайные элементы для каждого слоя
    for (var key in this.pack.layers) {
      let layer = this.pack.layers[key];
      let g = document.getElementById(layer.name);
      g.innerHTML = GetRandomFrom(layer.items);
      //ставим случайную заливку
      g.setAttribute("fill", randomFills[layer.group]);
    }
  }
}
