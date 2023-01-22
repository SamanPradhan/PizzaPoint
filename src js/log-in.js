let signup_arr = JSON.parse(localStorage.getItem("signup_details")) || [];
let JSON_flag_signin = JSON.parse(localStorage.getItem("login_flag")) || [];
let login_name = JSON.parse(localStorage.getItem("login_name")) || [];

let location_input = document.getElementById("location_input");
location_input.addEventListener("change", () => {
  window.location.href = "menu.html";
});

console.log(signup_arr);
let flag_signin = false;
let form = document.getElementById("login-form");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let login_successful = document.getElementById("login_successful");
form.addEventListener("submit", (e) => {
  let email = emailInput.value;
  let password = passwordInput.value;
  e.preventDefault();
  //   signup_arr.forEach((element) => {
  //     if (element.email == email && element.password == +password) {
  //       flag1 = true;
  //       console.log("true");
  //     }
  //   });

  for (let i = 0; i < signup_arr.length; i++) {
    console.log(signup_arr[i].firstName);
    if (signup_arr[i].email == email && signup_arr[i].password == +password) {
      flag_signin = true;
      login_name = signup_arr[i].firstName;
      JSON_flag_signin = flag_signin;
      localStorage.setItem("login_flag", JSON.stringify(JSON_flag_signin));
      localStorage.setItem("login_name", JSON.stringify(login_name));
      window.location.href = "menu.html";
      return;
    }
  }
  login_successful.innerText = "Invalid Details";
  login_successful.style.color = "red";
  login_successful.style.fontSize = "20px";
  console.log(flag_signin);
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
