function slideshowFun(images) {
  let index = 0;
  let slideshow = document.getElementById("slideshow");
  let img = document.createElement("img");

  slideshow.append(img);

  setInterval(() => {
    img.setAttribute("src", images[index]);
    index++;

    if (index == images.length) {
      index = 0;
    }
  }, 2000);
  img.setAttribute("src", images[index]);
}

// Use the following data for slideshow
var movieImages = [
  "images/Web-Banner-1.png",
  "images/Web-Banner-2.png",
  "images/Web-Banner-3.png",
];

window.addEventListener("load", function () {
  // add event-listeners;
  slideshowFun(movieImages);
});

let JSON_flag_signin = JSON.parse(localStorage.getItem("login_flag")) || [];
let login_name = JSON.parse(localStorage.getItem("login_name")) || [];

console.log(JSON_flag_signin, login_name);
let sign_in_icon = document.getElementById("sign-in");
if (JSON_flag_signin == true) {
  console.log(login_name);
  sign_in_icon.innerText = "Hi,  " + login_name;
}

let signin = document.getElementById("sign-in");
let signout = document.getElementById("signout");
if (JSON_flag_signin == true) {
  signout.innerText = "Sign Out";
  signin.style.fontSize = "14px";
  signout.addEventListener("click", () => {
    JSON_flag_signin = false;
    login_name = "";
  });
}

if (JSON_flag_signin != true) {
  console.log(signout.innerText);
  signout.style.backgroundColor = "rgb(0, 100, 145)";
}
signout.addEventListener("click", () => {
  JSON_flag_signin = false;
  login_name = "";
  CartArr = [];
  localStorage.setItem("cart", JSON.stringify(CartArr));

  localStorage.setItem("login_flag", JSON.stringify(JSON_flag_signin));
  localStorage.setItem("login_name", JSON.stringify(login_name));
  window.location.href = "index.html";
});

// let fetchdata = {};
// let fetchBevragedata = {};
// let fetchSidesdata = {};
// let fetchdessertsdata = {};

let location_input = document.getElementById("location_input");
let location_btn = document.getElementById("location_btn");

let search_value = JSON.parse(localStorage.getItem("search"));

location_btn.addEventListener("click", () => {
  search_value = location_input.value;
  window.location.href = "menu.html";

  localStorage.setItem("search", JSON.stringify(search_value));
});
