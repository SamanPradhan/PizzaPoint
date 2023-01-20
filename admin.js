let CartArrbig = JSON.parse(localStorage.getItem("cartbig")) || [];

console.log(CartArrbig);
let tbody = document.querySelector("tbody");

let total = document.getElementById("cart-total");
for (let i = 0; i < CartArrbig.length; i++) {
  Display(CartArrbig[i]);
}

function Display(CartArrbig) {
  tbody.innerHTML = null;
  CartArrbig.forEach((element) => {
    let tr = document.createElement("tr");
    let trmain = document.createElement("tr");
    let name = document.createElement("td");
    let image = document.createElement("img");
    let price = document.createElement("td");
    let qnt = document.createElement("td");
    let Remove = document.createElement("td");
    let Increment = document.createElement("td");
    let Decrement = document.createElement("td");
    let totalprice = document.createElement("td");

    name.innerText = element.name;
    image.setAttribute("src", element.image);
    image.setAttribute("id", "cart_image");
    price.innerText = ` ₹ ${element.price}`;
    qnt.innerText = element.quantity;

    Remove.textContent = "Remove";
    Increment.textContent = "+";
    Decrement.textContent = "-";

    // Remove.addEventListener("click", () => {
    //   CartArrbig = CartArrbig.filter((ele) => {
    //     console.log(element);
    //     return ele.id !== element.id;
    //   });
    //   localStorage.setItem("cartbig", JSON.stringify(CartArrbig));
    //   Display(CartArr);
    //   alert("Product Removed from Cart");
    // });
    let sum = 0;
    for (let i = 0; i < CartArrbig.length; i++) {
      sum += CartArrbig[i].price * CartArrbig[i].quantity;
    }
    total.textContent = sum;

    totalprice.textContent = sum;

    tr.append(name, image, price, qnt, totalprice, Remove);
    trmain.append(tr);
    tbody.append(trmain);
  });
}

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
  localStorage.setItem("login_flag", JSON.stringify(JSON_flag_signin));
  localStorage.setItem("login_name", JSON.stringify(login_name));
  window.location.href = "index.html";
});
