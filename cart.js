let CartArr = JSON.parse(localStorage.getItem("cart")) || [];
console.log(CartArr);
document.getElementById("cart-icon").src = "images/shopping-cart.png";
if (CartArr !== Array[0]) {
  console.log("yes");
  document.getElementById("cart-icon").src = "images/shopping-cart-full.png";
}
let container = document.getElementById("cart-container");
let total = document.getElementById("cart-total");
Display(CartArr);

function Display(CartArr) {
  container.innerHTML = null;
  CartArr.forEach((element) => {
    let div = document.createElement("div");
    let name = document.createElement("h2");
    let image = document.createElement("img");
    let price = document.createElement("h2");

    let div1 = document.createElement("div");
    let Remove = document.createElement("button");
    let Increment = document.createElement("button");
    let Decrement = document.createElement("button");

    name.innerText = element.name;
    image.setAttribute("src", element.image);
    price.innerText = `Price: ₹ ${element.price}`;

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
      alert("Product Added To Cart");
    });

    Decrement.addEventListener("click", () => {
      if (element.quantity > 1) {
        element.quantity--;
        total.innerText = +total.innerText - +element.price;
        alert("Product Removed from Cart");
        localStorage.setItem("cart", JSON.stringify(CartArr));
      } else {
        alert("This is the last Product");
        localStorage.setItem("cart", JSON.stringify(CartArr));
        Display(data);
      }
    });
    div1.append(Decrement, Remove, Increment);
    div.append(image, name, price, div1);
    container.append(div);
  });

  let sum = 0;
  for (let i = 0; i < CartArr.length; i++) {
    sum += CartArr[i].price * CartArr[i].quantity;
  }
  total.textContent = sum;
}

let JSON_flag_signin = JSON.parse(localStorage.getItem("login_flag")) || [];
let login_name = JSON.parse(localStorage.getItem("login_name")) || [];

console.log(JSON_flag_signin, login_name);
let sign_in_icon = document.getElementById("sign-in");
if (JSON_flag_signin == true) {
  console.log(login_name);
  sign_in_icon.innerText = "Hi,  " + login_name;
}
