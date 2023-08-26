const toolbarHTML = `<div class="toolbar"><div class="nav-large"></div><div class="nav-small"><div class="nav-item" onclick="onDrawer();"><span class="material-symbols-rounded"> menu</span></div><h3 class="app-name">AppName</h3></div><div class="nav-item more-option" onclick="showOptionItems();"><span class="material-symbols-rounded">more_vert</span></div></div>`;

const optionMenuHTML = `<div class="option-menu"></div>`;

const drawerHTML = `<div class="drawer"><div class="drawer-content"><div class="drawer-top"></div></div><div class="drawer-close" onclick="onDrawer();"></div></div>`;
const fabHTML = `<div class="fab"><span class="material-symbols-rounded"> add </span></div>`;

const dialogHTML = `<div id="showDialog" class="dim-layout"><div id="dialogName" class="dialog"><p></p><div class="row"><button id="unaction">Cancel</button><button id="action">Ok</button></div></div></div>`;



const body = document.querySelector('body');
body.insertAdjacentHTML("beforeend", toolbarHTML);
body.insertAdjacentHTML("beforeend", optionMenuHTML);
body.insertAdjacentHTML("beforeend", drawerHTML);
body.insertAdjacentHTML("beforeend", dialogHTML);

/* AppName Setup Start*/
const appName = document.querySelector('.app-name');
function setAppName(s) {
  appName.textContent = s;
}
/* AppName Setup End*/



/* Drawer Setup Start */
const drawer = document.querySelector('.drawer');
var isOpenDrawer = false;
function onDrawer() {
  if (isOpenDrawer) {
    body.style.overflow = "auto";
    drawer.style.width = "0";
    isOpenDrawer = false;
  } else {
    body.style.overflow = "hidden";
    drawer.style.width = "100%";
    isOpenDrawer = true;
  }
}
/* Drawer Setup End */

/* Menu Setup Start */
const navLarge = document.querySelector('.nav-large');
const drawerContent = document.querySelector('.drawer-content');

function createMenuItem(s, l) {
  if (l === undefined) {
    let a = `<div class="nav-item">${s}</div>`;
    let b = `<div class="drawer-item">${s}</div>`;
    navLarge.insertAdjacentHTML("beforeend", a);
    drawerContent.insertAdjacentHTML("beforeend", b);
  } else {
    let a = `<div onclick="viewLink('${l}')" class="nav-item">${s}</div>`;
    let b = `<div onclick="viewLink('${l}')" class="drawer-item">${s}</div>`;
    navLarge.insertAdjacentHTML("beforeend", a);
    drawerContent.insertAdjacentHTML("beforeend", b);
  }
}
/* Menu Setup End */

/* Option Menu Setup start */
const moreOption = document.querySelector('.more-option');
const optionMenu = document.querySelector('.option-menu');
function showOptionItems() {
  optionMenu.style.display = 'block';
}
function createOptionItem(s, l) {
  if (l === undefined) {
    let a = `<div class="item">${s}</div>`;
    optionMenu.insertAdjacentHTML("beforeend", a);
  } else {
    let a = `<div onclick="viewLink('${l}')" class="item">${s}</div>`;
    optionMenu.insertAdjacentHTML("beforeend", a);
  }

}
document.addEventListener("click", (event) => {
  if (!optionMenu.contains(event.target) && !moreOption.contains(event.target)) {
    optionMenu.style.display = 'none';
  }
});
/* Option Menu Setup End */

/* Dialog setup start */
const showDialog = document.getElementById('showDialog');
const sampleDialog = document.getElementById('dialogName');
let message = sampleDialog.querySelector('p');
const unaction = document.getElementById('unaction');
const action = document.getElementById('action');

showDialog.addEventListener('click', function(event) {
  if (event.target === showDialog) {
    showDialog.style.display = 'none';
  }
});
sampleDialog.addEventListener('click', function(event) {
  event.stopPropagation();
});
action.addEventListener('click', function() {
  showDialog.style.display = 'none';
});

unaction.addEventListener('click', function() {
  showDialog.style.display = 'none';
});

function showAlert(s) {
  showDialog.style.display = 'block';
  message.textContent = s;
}
function showToast(s) {
  let toastHTML = `<span class="toast">${s}</span>`;
  body.insertAdjacentHTML("beforeend",
    toastHTML);
  let toast = document.querySelector(".toast");
  setTimeout(function() {
    toast.remove();
  },
    2000);
  toast.offsetWidth;
  toast.style.opacity = 1;
}

/* Dialog setup end */

/* Fab setup star */
function createFab(id) {
  const fabHTML = `<div id="${id}" class="fab"><span class="material-symbols-rounded"> add </span></div>`;
  body.insertAdjacentHTML("beforeend",
    fabHTML);
  let fab = document.getElementById(id);
  fab.onClick = function(callback) {
    fab.addEventListener("click",
      callback);
  };
  return fab;
}

/* Fab setup end*/

function viewLink(s) {
  window.location.href = s;
  optionMenu.style.display = 'none';
  if (isOpenDrawer) {
    onDrawer();
  }
}

/* Main Content Setup Start */

function createTextView(id) {
  var textView = document.createElement("div");
  textView.id = id;

  textView.addIn = function(text) {
    text.appendChild(this);
  };
  textView.setText = function(text) {
    this.textContent = text;
  };
  textView.setSize = function(text) {
    this.style.fontSize = text;
  };
  textView.setWidth = function(text) {
    this.style.width = text;
  };
  textView.setHeight = function(text) {
    this.style.height = text;
  };
  textView.setPadding = function(text) {
    this.style.padding = text;
  };
  textView.setMargin = function(text) {
    this.style.margin = text;
  };
  textView.setColor = function(text) {
    this.style.color = text;
  };
  textView.setBackground = function(text) {
    this.style.background = text;
  };
  textView.setGravity = function(text) {
    this.style.display = 'flex';
    this.style.justifyContent = text;
    this.style.alignItems = text;
  };
  textView.setGravityCenter = function() {
    this.style.display = 'flex';
    this.style.justifyContent = 'center';
    this.style.alignItems = 'center';
  };
  textView.setGravityVertical = function() {
    this.style.display = 'flex';
    this.style.alignItems = 'center';
  };
  textView.setGravityHorizontal = function() {
    this.style.display = 'flex';
    this.style.justifyContent = 'center';
  };
  textView.setBold = function() {
    this.style.fontWeight = "bold";
  };
  textView.setAsTitle = function() {
    this.style.fontSize = "20px";
    this.style.fontWeight = "bold";
  };

  textView.setLayer = function(text) {
    this.style.zIndex = text;
  };
  textView.setClass = function(text) {
    this.setAttribute("class",
      text);
  };
  textView.onClick = function(callback) {
    this.addEventListener("click",
      callback);
  };


  return textView;
}

function createImageView(id) {
  var imageView = document.createElement("img");
  imageView.id = id;

  imageView.addIn = function(text) {
    text.appendChild(this);
  };
  imageView.setImage = function(text) {
    this.src = text;
  };
  imageView.setFit = function(text) {
    this.objectFit = text;
  };
  imageView.setFitCover = function(text) {
    this.objectFit = 'cover';
  };
  imageView.setText = function(text) {
    this.alt = text;
  };
  imageView.setWidth = function(text) {
    this.style.width = text;
  };
  imageView.setHeight = function(text) {
    this.style.height = text;
  };
  imageView.setPadding = function(text) {
    this.style.padding = text;
  };
  imageView.setMargin = function(text) {
    this.style.margin = text;
  };

  imageView.setColor = function(text) {
    this.style.color = text;
  };
  imageView.setBackground = function(text) {
    this.style.background = text;
  };
  imageView.setGravity = function(text) {
    this.style.display = 'flex';
    this.style.justifyContent = text;
    this.style.alignItems = text;
  };
  imageView.setGravityCenter = function() {
    this.style.display = 'flex';
    this.style.justifyContent = 'center';
    this.style.alignItems = 'center';
  };
  imageView.setGravityVertical = function() {
    this.style.display = 'flex';
    this.style.alignItems = 'center';
  };
  imageView.setGravityHorizontal = function() {
    this.style.display = 'flex';
    this.style.justifyContent = 'center';
  };

  imageView.setCircle = function() {
    this.style.borderRadius = "50%";
  };
  imageView.setBorder = function() {
    this.style.border = "1px solid #ccc";
  };

  imageView.setLayer = function(text) {
    this.style.zIndex = text;
  };
  imageView.setClass = function(text) {
    this.setAttribute("class",
      text);
  };
  imageView.onClick = function(callback) {
    this.addEventListener("click",
      callback);
  };


  return imageView;
}

function createView(id) {
  var view = document.createElement("div");
  view.id = id;

  view.addIn = function(text) {
    text.appendChild(this);
  };
  view.setText = function(text) {
    this.textContent = text;
  };
  view.setWidth = function(text) {
    this.style.width = text;
  };
  view.setHeight = function(text) {
    this.style.height = text;
  };
  view.setPadding = function(text) {
    this.style.padding = text;
  };
  view.setMargin = function(text) {
    this.style.margin = text;
  };
  view.setOrientation = function(text) {
    if (text === 'vertical') {
      this.style.display = 'flex';
      this.style.flexDirection = 'column';
    } else {
      this.style.display = 'flex';
      this.style.flexDirection = 'row';
    }
  };
  view.setColor = function(text) {
    this.style.color = text;
  };
  view.setBackground = function(text) {
    this.style.background = text;
  };
  view.setGravity = function(text) {
    this.style.display = 'flex';
    this.style.justifyContent = text;
    this.style.alignItems = text;
  };
  view.setGravityCenter = function() {
    this.style.display = 'flex';
    this.style.justifyContent = 'center';
    this.style.alignItems = 'center';
  };
  view.setGravityVertical = function() {
    this.style.display = 'flex';
    this.style.alignItems = 'center';
  };
  view.setGravityHorizontal = function() {
    this.style.display = 'flex';
    this.style.justifyContent = 'center';
  };


  view.setLayer = function(text) {
    this.style.zIndex = text;
  };
  view.setClass = function(text) {
    this.setAttribute("class",
      text);
  };
  view.onClick = function(callback) {
    this.addEventListener("click",
      callback);
  };


  return view;
}

/* Main Content Setup End */