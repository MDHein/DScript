// insert style
var showPostCssLink = document.createElement("link");
showPostCssLink.href = "https://cdn.jsdelivr.net/gh/MDHein/DScript@main/cdn/showpost_style.css";
showPostCssLink.rel = "stylesheet";
showPostCssLink.type = "text/css";
document.head.appendChild(showPostCssLink);

// Offline Usages
// Step 1.
function showPostIn(c) {
  let listViewHTML = `<section class="wi-showpost"><ul class="wi-listview"></ul></section>`;
  c.insertAdjacentHTML("beforeend", listViewHTML);
}
// Step 2.
function showPostLabelIn(c, tag) {
  let l = `<div class="wi-showpost-label" onclick="viewInSearch('${tag}');"><span>${tag}</span><span class="material-symbols-rounded">chevron_right</span></div>`;
  c.insertAdjacentHTML("afterbegin", l);
}
// Step 3
function showPostItemIn(c, title, description, image, video, tag) {
  let listItemHTML = `<li class="wi-listitem" onclick="showActivity('${title}', '${description}', '${image}', '${video}', '${tag}');"><img src="${image}" alt="Post Image"><div class="content"><div class="details"><div class="state">${tag}</div><div class="title">${title}</div><div class="desc">${description}</div></div></div></li>`;
  c.insertAdjacentHTML("beforeend", listItemHTML);
}
// Step 4 (No need to call this function yourself, This is automatically setup!)
function showActivity(title, description, image, video, tag) {
  document.body.style.overflow = "hidden";
  const activityLayout = document.getElementById("activityLayout");
  activityLayout.style.display = "flex";
  let activityMain = document.getElementById("activityMain");
  activityMain.scrollTop = 0;
  let activityClose = document.getElementById("activityClose");
  let activityTitle = document.getElementById("activityTitle");
  let activityDescription = document.getElementById("activityDescription");
  let activityCover = document.getElementById("activityCover");
  let activityContent = document.getElementById("activityContent");
  let activityRelated = document.getElementById("activityRelated");
  activityClose.addEventListener("click", () => {
    document.body.style.overflow = "auto";
    activityLayout.style.display = "none";
  });
  activityTitle.innerHTML = title;
  activityDescription.innerHTML = description;
  if (video.startsWith("http")) {
    let v = `<iframe src="${video}" width="100%" height="100%" allow="autoplay" allowfullscreen=""></iframe>`;
    activityCover.innerHTML = v;
  } else if (image.startsWith("http")) {
    let v = `<img src="${image}" alt="Cover Image"/>`;
    activityCover.innerHTML = v;
  }

  activityRelated.innerHTML = "";
  showPostItemIn(activityRelated, "title", "description", "https://i.pinimg.com/originals/dc/84/36/dc8436d03012b7204637ed7207a05808.gif", "Video", "Tag");
  showPostItemIn(activityRelated, "title", "description", "https://i.pinimg.com/originals/dc/84/36/dc8436d03012b7204637ed7207a05808.gif", "Video", "Tag");
}

// Online Usages;
/* GLOBAL VARIABLE */
let wiAllPost;
// Step 1.
async function loadPostsIn(c, url) {
  showPostIn(c);
  //showPostLabelIn(c, "Posts");
  let child = c.querySelector(".wi-listview");
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const posts = await response.json();
    for (let i = 0; i < posts.length; i++) {
      let post = posts[i];
      loadPostIn(child, post);
    }
    wiAllPost = posts;
    installKit();
  } catch (error) {
    console.error(error);
  }
}

// Step 2 (No need to call this function yourself, This is automatically setup!)
function loadPostIn(c, post) {
  let item = document.createElement("li");
  item.setAttribute("class", "wi-listitem");
  c.appendChild(item);

  let image = document.createElement("img");
  image.src = post.image;
  item.appendChild(image);

  let content = document.createElement("div");
  content.setAttribute("class", "content");
  item.appendChild(content);

  let details = document.createElement("div");
  details.setAttribute("class", "details");
  content.appendChild(details);

  let state = document.createElement("div");
  state.setAttribute("class", "state");
  state.innerHTML = post.tag;
  details.appendChild(state);

  let title = document.createElement("div");
  title.setAttribute("class", "title");
  title.innerHTML = post.title;
  details.appendChild(title);

  let description = document.createElement("div");
  description.setAttribute("class", "desc");
  description.innerHTML = post.description;
  details.appendChild(description);

  item.addEventListener("click", () => {
    viewActivity(post);
  });
}

// Step 3 (No need to call this function yourself, This is automatically setup!)
function installKit() {

  let activityHTML = `<section id="activityLayout"><div class="toolbar"><span id="activityClose" class="material-symbols-rounded">close</span><h3 id="activityTitle"></h3></div><div id="activityMain"><div id="activityContent"><div id="activityCover"></div><p id="activityDescription"></p><p>More like this</p><ul id="activityRelated" class="wi-listview"></ul></div></div></section>`;
  let searchHTML = `<section id="searchLayout"><div class="toolbar"><span id="searchClose" class="material-symbols-rounded">arrow_back</span><input type="search" placeholder="Search" id="searchInput" required/></div><div id="searchMain"><div id="searchContent"><ul id="searchRelated" class="wi-listview"></ul></div></div></section>`;

  document.body.insertAdjacentHTML("beforeend", activityHTML);
  document.body.insertAdjacentHTML("beforeend", searchHTML);

}

// Step 4 (No need to call this function yourself, This is automatically setup!)
function viewActivity(post) {
  //let post = JSON.stringify(po);
  document.body.style.overflow = "hidden";
  const activityLayout = document.getElementById("activityLayout");
  activityLayout.style.display = "flex";
  let activityMain = document.getElementById("activityMain");
  activityMain.scrollTop = 0;
  let activityClose = document.getElementById("activityClose");
  let activityTitle = document.getElementById("activityTitle");
  let activityDescription = document.getElementById("activityDescription");
  let activityCover = document.getElementById("activityCover");
  let activityContent = document.getElementById("activityContent");
  let activityRelated = document.getElementById("activityRelated");
  activityClose.addEventListener("click", () => {
    document.body.style.overflow = "auto";
    activityLayout.style.display = "none";
  });
  activityTitle.innerHTML = post.title;
  activityDescription.innerHTML = post.description;
  if (post.video.startsWith("http")) {
    let v = `<iframe src="${post.video}" width="100%" height="100%" allow="autoplay" allowfullscreen=""></iframe>`;
    activityCover.innerHTML = v;
  } else if (post.image.startsWith("http")) {
    let v = `<img src="${post.image}" alt="Cover Image"/>`;
    activityCover.innerHTML = v;
  }

  startSearching(activityRelated, post.title);
}

// Step 5 (No need to call this function yourself, This is automatically setup!)
function viewInSearch(s) {
  //window.location.href = "#searchLayout";
  document.body.style.overflow = "hidden";
  const searchLayout = document.getElementById("searchLayout");
  searchLayout.style.display = "flex";
  let searchMain = document.getElementById("searchMain");
  searchMain.scrollTop = 0;
  let searchClose = document.getElementById("searchClose");
  let searchInput = document.getElementById("searchInput");
  let searchRelated = document.getElementById("searchRelated");
  searchClose.addEventListener("click", () => {
    searchInput.blur();
    document.body.style.overflow = "auto";
    searchLayout.style.display = "none";
  });

  searchInput.value = s;
  searchInput.focus();
  startSearching(searchRelated, s);

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      //console.log('keydown');
      let q = searchInput.value;
      setTimeout(function() {
        //console.log("keydown times");
        startSearching(searchRelated, q);
      }, 600);
    }
  });
}

// Step 6 (No need to call this function yourself, This is automatically setup!)
function startSearching(c, s) {
  c.innerHTML = "";
  if (wiAllPost !== undefined && wiAllPost.length > 0) {
    for (let i = 0; i < wiAllPost.length; i++) {
      if (wiAllPost[i].title.toLowerCase().includes(s.toLowerCase())) {
        loadPostIn(c, wiAllPost[i]);
      } else if (wiAllPost[i].description.toLowerCase().includes(s.toLowerCase())) {
        loadPostIn(c, wiAllPost[i]);
      } else if (wiAllPost[i].tag.toLowerCase().includes(s.toLowerCase())) {
        loadPostIn(c, wiAllPost[i]);
      }
    }
  }
}
function setPostLabelIn(c, n) {
  showPostLabelIn(c, n);
}