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

        //создаем крестик
        var icon = document.createElement("i");
        icon.setAttribute("class","fa fa-times");
        icon.setAttribute("style","color:white; cursor: pointer;")
        icon.onclick = () => {ColorPicker.Close()};
        div.appendChild(icon);

        document.body.appendChild(div);
    }
    static Close(){
        var div = document.getElementById("color-picker");
        if (div != undefined && div != null){
            div.remove();
        }
    }
}