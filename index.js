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
  }, 4000);
  img.setAttribute("src", images[index]);
}

// Use the following data for slideshow
var movieImages = ["images/Web-Banner-1.png", "images/Web-Banner-2.png"];

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

let signout = document.getElementById("signout");
if (JSON_flag_signin == true) {
  signout.innerText = "Sign Out";
}
