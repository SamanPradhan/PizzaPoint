let form = document.getElementById("signup_form");
let firstNameInput = document.getElementById("first_name");
let lastNameInput = document.getElementById("last_name");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let signup_successful = document.getElementById("signup_successful");

let flag1 = true;
let signup_arr = JSON.parse(localStorage.getItem("signup_details")) || [];
console.log(signup_arr);
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let firstName = firstNameInput.value;
  let lastName = lastNameInput.value;
  let email = emailInput.value;
  let password = passwordInput.value;

  let obj = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };

  for (let key in obj) {
    if (obj[key] == "") {
      signup_successful.innerText = "Please fill " + key;
      signup_successful.style.color = "red";
      flag1 = false;
      locationreload();
      break;
    }
  }
  if (flag1 == true) {
    signup_arr.push(obj);
    signup_successful.innerText = "Signup Successful, Please Log In Now";
    signup_successful.style.color = "green";

    localStorage.setItem("signup_details", JSON.stringify(signup_arr));
  }
});
function locationreload() {
  window.location.reload();
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
  CartArr = [];
  localStorage.setItem("cart", JSON.stringify(CartArr));
  localStorage.setItem("login_flag", JSON.stringify(JSON_flag_signin));
  localStorage.setItem("login_name", JSON.stringify(login_name));
  window.location.href = "index.html";
});
