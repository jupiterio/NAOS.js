window.addEventListener("load", function(){
  var taskbar = document.createElement("div");
  taskbar.id = "taskbar";
  taskbar.innerHTML = `<input type="button" onclick="new Window(Math.floor(Math.random()*(100-40))+40, Math.floor(Math.random()*(100-40))+40, Math.floor(Math.random()*(400-180))+180, Math.floor(Math.random()*(400-180))+180, {content: document.createTextNode('Hello, World!')})">`;
  document.body.appendChild(taskbar);
  
  var mainScript = document.createElement("script");
  mainScript.src = "OS.js";
  document.body.appendChild(mainScript);
});