;
(function(window,undefined){
    var EventUtil={
        //跨浏览器绑定事件
        addHandler: function(element, type, handler){  
            if(element.addEventListener){
                element.addEventListener(type, handler, false);
            }else if(element.attachEvent){
                element.attachEvent("on"+type,handler);
            }else{
                element["on"+type]=handler;
            }
        },
        //获取元素的样式
        getStyle: function(element, styleName){
            var realStyle=null;
            if(window.getComputedStyle){
                realStyle=window.getComputedStyle(element, null)[styleName];
            }else{
                realStyle=element.currentStyle[styleName];
            }
            return realStyle;
        },
        //设置元素的样式
        setStyle: function(element, css){
            for (var key in css){
                element.style[key]= css[key];
            }
        }
    };

    //拖拽元素类
    function DragElement(element){
        this.element=element;
        this.x=0;
        this.y=0;
    }

    DragElement.prototype={
        constructor: DragElement,
        setXY: function(x, y) {
            this.x = parseInt(x) || 0;
            this.y = parseInt(y) || 0;
            return this;
        },
        setEleCss: function(css) {
            EventUtil.setStyle(this.element, css);
            return this;
        }
    }

    //鼠标元素
    function Mouse(){
        this.x=0;
        this.y=0;
    }
    Mouse.prototype.setXY = function(x, y) {
        this.x = parseInt(x);
        this.y = parseInt(y);
    }

    //拖拽配置
    var draggableConfig = {
        zIndex: 1,
        draggingObj: null,
        mouse: new Mouse()
    };

    function Drag(element){
        this.element=element;
        element.onselectstart = function() {
            //防止拖拽对象内的文字被选中
            return false;
        }
        EventUtil.addHandler(element, "mousedown", mouseDown);

    }

    function mouseDown(event){
        var element = event.target || event.srcElement;

        draggableConfig.mouse.setXY(event.clientX, event.clientY);

        draggableConfig.draggingObj = new DragElement(element);
        draggableConfig.draggingObj
        .setXY(EventUtil.getStyle(element,"left"), EventUtil.getStyle(element,"top"))
        .setEleCss({
            "zIndex": draggableConfig.zIndex++,
            "position": "relative"
        });
    }

    EventUtil.addHandler(document, "mousemove", function(event) {
        if (draggableConfig.draggingObj) {
            var mouse = draggableConfig.mouse,
                draggingObj = draggableConfig.draggingObj;
            draggingObj.setEleCss({
                "left": parseInt(event.clientX - mouse.x + draggingObj.x) + "px",
                "top": parseInt(event.clientY - mouse.y + draggingObj.y) + "px"
            });
        }
    })

    EventUtil.addHandler(document, "mouseup", function(event) {
        draggableConfig.draggingObj = null;
    })

    window.Drag=Drag;

})(window, undefined);