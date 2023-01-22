let JSON_flag_signin = JSON.parse(localStorage.getItem("login_flag")) || [];
let login_name = JSON.parse(localStorage.getItem("login_name")) || [];

let checkoutdone = document.getElementById("confirm-button");

let CartArr = JSON.parse(localStorage.getItem("cart")) || [];
let CartArrbig = JSON.parse(localStorage.getItem("cartbig")) || [];
CartArrbig.push(CartArr);

let form = document.querySelector("form");
let checkout_successful = document.getElementById("checkout_successful");
let adressInput = document.getElementById("adress");
let cardnumberInput = document.getElementById("card_number");
let NameInput = document.getElementById("Name");
let Expiry_DateInput = document.getElementById("Expiry_Date");
let CVVInput = document.getElementById("CVV");
let flag1 = true;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let adress = adressInput.value;
  let cardnumber = cardnumberInput.value;
  let Name = NameInput.value;
  let ExpiryDate = Expiry_DateInput.value;
  let CVV = CVVInput.value;

  let obj = {
    adress: adress,
    cardnumber: cardnumber,
    Name: Name,
    ExpiryDate: ExpiryDate,
    CVV: CVV,
  };

  for (let key in obj) {
    if (obj[key] == "") {
      checkout_successful.innerText = "Please fill " + key;
      checkout_successful.style.color = "red";
      flag1 = false;
      locationreload();
      break;
    }
  }
  if (flag1 == true) {
    CartArr.push(obj);
    window.location.href = "finalpage.html";

    localStorage.setItem("cartbig", JSON.stringify(CartArrbig));
  }
});

let location_input = document.getElementById("location_input");
location_input.addEventListener("change", () => {
  window.location.href = "menu.html";
});

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
