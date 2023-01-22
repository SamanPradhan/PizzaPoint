let CartArr = JSON.parse(localStorage.getItem("cart")) || [];
console.log(CartArr);
let tbody = document.querySelector("tbody");

let total = document.getElementById("cart-total");

let location_input = document.getElementById("location_input");
location_input.addEventListener("change", () => {
  window.location.href = "menu.html";
});

function Display(CartArr) {
  tbody.innerHTML = null;
  CartArr.forEach((element) => {
    let tr = document.createElement("tr");
    let name = document.createElement("td");
    let image = document.createElement("img");
    let price = document.createElement("td");
    let qnt = document.createElement("td");
    let Remove = document.createElement("td");
    let Increment = document.createElement("td");
    let Decrement = document.createElement("td");

    name.innerText = element.name;
    image.setAttribute("src", element.image);
    image.setAttribute("id", "cart_image");
    price.innerText = ` ₹ ${element.price}`;
    qnt.innerText = element.quantity;
    Remove.textContent = "Remove";
    Increment.textContent = "+";
    Decrement.textContent = "-";

    Remove.addEventListener("click", () => {
      CartArr = CartArr.filter((ele) => {
        console.log(element);
        return ele.id !== element.id;
      });
      localStorage.setItem("cart", JSON.stringify(CartArr));
      Display(CartArr);
      alert("Product Removed from Cart");
    });

    Increment.addEventListener("click", () => {
      element.quantity++;
      total.innerText = +total.innerText + +element.price;
      localStorage.setItem("cart", JSON.stringify(CartArr));
      //alert("Product Added To Cart");
      qnt.innerText = element.quantity;
    });

    Decrement.addEventListener("click", () => {
      if (element.quantity > 1) {
        element.quantity--;
        total.innerText = +total.innerText - +element.price;
        //alert("Product Removed from Cart");
        qnt.innerText = element.quantity;
        localStorage.setItem("cart", JSON.stringify(CartArr));
      } else {
        alert("This is the last Product");
        localStorage.setItem("cart", JSON.stringify(CartArr));
        Display(data);
      }
    });

    tr.append(name, image, price, qnt, Decrement, Remove, Increment);
    tbody.append(tr);
  });

  let sum = 0;
  for (let i = 0; i < CartArr.length; i++) {
    sum += CartArr[i].price * CartArr[i].quantity;
  }
  total.textContent = sum;
}

let JSON_flag_signin = JSON.parse(localStorage.getItem("login_flag")) || [];
let login_name = JSON.parse(localStorage.getItem("login_name")) || [];

if (JSON_flag_signin == true) {
  Display(CartArr);
}

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
