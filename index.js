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
