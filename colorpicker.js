class ColorPicker {
    static Open(x,y,colors,consumer){
        //закрываем предыдущий
        ColorPicker.Close();
        //создаем контейнер
        var div = document.createElement("div");
        div.setAttribute("id","color-picker");
        div.setAttribute("style","left: " + x + "px; top: "+y+"px;");

        //создаем цвета
        for (var id in colors){
            let color = colors[id];
            //создаем круг с цветом;
            var colordiv = document.createElement("div");
            colordiv.setAttribute("class","color");
            colordiv.setAttribute("style","background: " + color + ";")
            //вешаем на круг изменение цвета слоя
            colordiv.onclick = () => {
                consumer(color);
            }
            div.appendChild(colordiv);
        }

        //создаем иконку палитры
        var wheel = document.createElement("img");
        wheel.src = "img/colorwheel.svg";
        wheel.setAttribute("class","color");
        wheel.onclick = () => {ColorPicker.OpenJaames(x,y,consumer)}
        div.appendChild(wheel);

        //создаем крестик        
        div.appendChild(this.GetCloseBtn());

        document.body.appendChild(div);
    }

    static Close(){
        var div = document.getElementById("color-picker");
        if (div != undefined && div != null){
            div.remove();
        }
    }

    static OpenJaames(x,y,consumer){
        this.Close();

        var div = document.createElement("div");
        div.setAttribute("id","color-picker");
        div.setAttribute("style","top: " + (y - 100) + "px; right: 4%;");
        document.body.appendChild(div);

        var colorWheel = new iro.ColorPicker("#color-picker", {
            width: "200",
            layout: [
                { 
                    component: iro.ui.Wheel,
                    options: {
                        wheelLightness: true,
                        wheelAngle: 0,
                        wheelDirection: "anticlockwise"
                } 
                },
                {
                    component: iro.ui.Slider,
                    options: { sliderType: "value" }
                }
            ]
          
        });
        colorWheel.on('color:change', function(color) {
            if (color.index === 0) {
              consumer(color.hexString);
            }
          });      
        div.appendChild(this.GetCloseBtn());    
    }
    
    static GetCloseBtn(){
        var icon = document.createElement("i");
        icon.setAttribute("class","fa fa-times");
        icon.setAttribute("style","color:white; cursor: pointer;")
        icon.onclick = () => {ColorPicker.Close()};
        return icon;
    }
}