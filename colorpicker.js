class ColorPicker {
  constructor() {
    this.brush = null;
    this.palette = [];
    //document.getElementById(paletteContainer).appendChild(this.CreatePalette);
  }
  Open(x, y, colors, consumer, color) {
    //закрываем предыдущий
    this.Close();
    //создаем контейнер
    var div = document.createElement("div");
    div.setAttribute("id", "color-picker");
    div.setAttribute("style", "left: " + x + "px; top: " + y + "px;");

    //создаем цвета
    for (var id in colors) {
      let color = colors[id];
      //создаем круг с цветом;
      var colordiv = document.createElement("div");
      colordiv.setAttribute("class", "color");
      colordiv.setAttribute("style", "background: " + color + ";");
      //вешаем на круг изменение цвета слоя
      colordiv.onclick = () => {
        consumer(color);
      };
      div.appendChild(colordiv);
    }

    //создаем иконку палитры
    var wheel = document.createElement("img");
    wheel.src = "img/colorwheel.svg";
    wheel.setAttribute("class", "color");
    wheel.onclick = () => {
      this.OpenJaames(x, y, consumer, color);
    };
    div.appendChild(wheel);

    //создаем крестик
    div.appendChild(this.GetCloseBtn());

    document.body.appendChild(div);
  }

  CreatePalette(size) {
    //создаем контейнер для палитры
    var div = document.createElement("div");
    div.setAttribute("id", "color-palette");
    for (let i = 0; i < count; i++) {
      //создаем круг с цветом;
      let colordiv = document.createElement("div");
      colordiv.setAttribute("class", "color");
      //вешаем на круг изменение цвета кисточки
      colordiv.onclick = () => {
        this.brush = colordiv.style.background.color;
      };
      div.appendChild(colordiv);
    }
    return div;
  }

  Close() {
    var div = document.getElementById("color-picker");
    if (div != undefined && div != null) {
      div.remove();
    }
  }

  OpenJaames(x, y, consumer, color) {
    this.Close();

    var div = document.createElement("div");
    div.setAttribute("id", "color-picker");
    div.setAttribute("style", "top: " + (y - 100) + "px; right: 4%;");
    document.body.appendChild(div);

    var colorWheel = new iro.ColorPicker("#color-picker", {
      width: "200",
      color: color,
      layout: [
        {
          component: iro.ui.Wheel,
          options: {
            wheelLightness: true,
            wheelAngle: 0,
            wheelDirection: "anticlockwise",
          },
        },
        {
          component: iro.ui.Slider,
          options: { sliderType: "value" },
        },
      ],
    });
    colorWheel.on("color:change", function (color) {
      if (color.index === 0) {
        consumer(color.hexString);
      }
    });
    div.appendChild(this.GetCloseBtn());
  }

  GetCloseBtn() {
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-times");
    icon.setAttribute("style", "color:white; cursor: pointer;");
    icon.onclick = () => {
      this.Close();
    };
    return icon;
  }
}
