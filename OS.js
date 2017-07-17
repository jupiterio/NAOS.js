let titleTemp = document.createElement("div");
titleTemp.className = "titlebar";

let icon = document.createElement("img");
icon.className = "icon";
icon.src = "assets/window/untitled.png";

let titleText = document.createElement("div");
titleText.className = "titleText";
titleText.appendChild(document.createTextNode("Untitled"));

let closeButton = document.createElement("input");
closeButton.type = "button";
let maximizeButton = closeButton.cloneNode();
maximizeButton.className = "maximizeButton";
let minimizeButton = closeButton.cloneNode();
minimizeButton.className = "minimizeButton";
closeButton.className = "closeButton";

let controlButtons = document.createElement("div")
controlButtons.className = "controlButtons";
controlButtons.appendChild(minimizeButton);
controlButtons.appendChild(maximizeButton);
controlButtons.appendChild(closeButton);

titleTemp.appendChild(icon);
titleTemp.appendChild(titleText);
titleTemp.appendChild(controlButtons);

let openWindows = [];

let reZWindows = function(){
  openWindows.map((d, i)=>{d.element.style.zIndex = i;});
}

let titleDown = win=>e=>{
  win.dragged = true;
  win.offsetY = e.clientY - win.y;
  win.offsetX = e.clientX - win.x;
}

let titleMove = win=>function(e){
  if (win.dragged) {
    win.y = e.clientY - win.offsetY;
    win.x = e.clientX - win.offsetX;
  }
}

let titleUp = win=>()=>{win.dragged = false;}

window.addEventListener("resize", function(){
  openWindows.map(win=>{
    win.x = win.x;
    win.y = win.y;
  });
});

class Window {
  constructor(x, y, width, height, options) {
    this._x = x;
    this._y = y;
    this.width = width;
    this.height = height;
    this.type = options.type;
    
    this.element = document.createElement("div");
    this.element.className = "window";
    this.element.style.width = this.width.toString() + "px";
    this.element.style.height = this.height.toString() + "px";
    this.element.style.top = this.y.toString() + "px";
    this.element.style.left = this.x.toString() + "px";
    this.element.addEventListener("mousedown", (function(){
      openWindows.splice(openWindows.indexOf(this), 1);
      openWindows.push(this);
      reZWindows();
    }).bind(this));
    
    let titlebar = titleTemp.cloneNode(true);
    
    if (options.title)
      titlebar.getElementsByClassName("titleText")[0].innerText = options.title;
    
    if (options.icon)
      titlebar.getElementsByClassName("icon")[0].src = options.icon;
    
    titlebar.getElementsByClassName("closeButton")[0].addEventListener("click", this.close.bind(this))
    titlebar.getElementsByClassName("icon")[0].addEventListener("dragstart", function(e) { e.preventDefault(); return false; });
    
    titlebar.addEventListener("mousedown", titleDown(this));
    document.addEventListener("mousemove", titleMove(this))
    document.addEventListener("mouseup", titleUp(this));
    
    this.element.appendChild(titlebar);
    
    let container = document.createElement("div")
    container.className = "container";
    container.appendChild(options.content);
    this.element.appendChild(container);
    
    this.open();
  }
  
  close() {
    this.element.parentElement.removeChild(this.element);
    openWindows.splice(openWindows.indexOf(this), 1);
  }
  
  open() {
    document.body.appendChild(this.element);
    openWindows.push(this);
    reZWindows();
  }
  
  set y(v) {
    this._y = v;
    this._y = this._y < window.innerHeight - 40 - 32 ? this._y : window.innerHeight - 40 - 32;
    this.element.style.top = this._y.toString() + "px";
  }
  
  get y(){
    return this._y
  }
  
  set x(v) {
    this._x = v;
    this.element.style.left = this.x.toString() + "px";
  }
  
  get x(){
    return this._x
  }
}