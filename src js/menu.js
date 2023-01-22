let api = "https://63c77a71e52516043f3eaecd.mockapi.io/Dominos";
let api2 = "https://63c77a71e52516043f3eaecd.mockapi.io/beverage";
let apiSides = "https://63c82c4b075b3f3a91dbcb90.mockapi.io/desserts";
let apidesserts = "https://63c82c4b075b3f3a91dbcb90.mockapi.io/Sides";

let fetchdata = {};
let fetchBevragedata = {};
let fetchSidesdata = {};
let fetchdessertsdata = {};

let CartArr = JSON.parse(localStorage.getItem("cart")) || [];

let JSON_flag_signin = JSON.parse(localStorage.getItem("login_flag"));

let container = document.getElementById("product-container");
let Bevragecontainer = document.getElementById("beverage-container");
let dessertscontainer = document.getElementById("desserts-container");
let Sidescontainer = document.getElementById("Sides-container");
let option = document.getElementById("filter");
let option_max = document.getElementById("max-price-input");
let option_min = document.getElementById("min-price-input");

option_max.addEventListener("change", () => {
  filterData(fetchdata);
});
option_min.addEventListener("change", () => {
  filterData(fetchdata);
});
function filterData(data) {
  let filterValueMax = option_max.value;
  let filterValueMin = option_min.value;
  console.log(filterValueMax, filterValueMin);
  if (filterValueMin == "" && filterValueMax == "") {
    Display(data);
  } else {
    if (filterValueMax == "") {
      filterValueMax == 0;
    } else if (filterValueMin == "") {
      filterValueMin == 0;
    }
    data = data.filter((el) => {
      return el.price >= +filterValueMin && el.price <= +filterValueMax;
    });
    Display(data);
  }
}

option.addEventListener("change", () => {
  let filterValue = option.value;
  console.log(filterValue);
  if (filterValue == "Low to High") {
    fetchdata = asc_sort(fetchdata);

    Display(fetchdata);
  } else if (filterValue == "High to Low") {
    fetchdata = dec_sort(fetchdata);
    Display(fetchdata);
  }
});

asyncfetch();
async function asyncfetch() {
  try {
    let request = await fetch(api);
    let data = await request.json();
    fetchdata = data;
    // fetchdatastore = fetchdata;
    // console.log(fetchdata);
    // localStorage.setItem("fetchdatastore", JSON.stringify(fetchdatastore));

    //if (search_value == "") {
    Display(fetchdata);
    //}
  } catch (error) {
    console.log(error);
  }
}

function asc_sort(fetchdata) {
  for (let i = 0; i < fetchdata.length - 1; i++) {
    for (let j = 0; j < fetchdata.length - 1 - i; j++) {
      if (fetchdata[j].price > fetchdata[j + 1].price) {
        let temp = fetchdata[j];
        fetchdata[j] = fetchdata[j + 1];
        fetchdata[j + 1] = temp;

        console.log(temp);
      }
    }
  }
  return fetchdata;
}

function dec_sort(fetchdata) {
  for (let i = 0; i < fetchdata.length - 1; i++) {
    console.log(fetchdata[i]);
    for (let j = fetchdata.length - 1; j >= i + 1; j--) {
      if (fetchdata[j].price == undefined) {
      }
      if (fetchdata[j].price > fetchdata[j - 1].price) {
        let temp = fetchdata[j];
        fetchdata[j] = fetchdata[j + 1];
        fetchdata[j + 1] = temp;
        //console.log(temp);
      }
    }
  }
  //console.log(fetchdata);
  return fetchdata;
}

function Display(data) {
  container.innerHTML = null;
  data.forEach((element) => {
    let div = document.createElement("div");
    let name = document.createElement("h2");
    let image = document.createElement("img");
    let price = document.createElement("h2");
    let cartadding = document.createElement("h2");

    let addToCart = document.createElement("button");
    name.innerText = element.name;
    image.setAttribute("src", element.image);
    price.innerText = `Price:  ₹${element.price}`;

    addToCart.innerText = "ORDER NOW";
    addToCart.addEventListener("click", () => {
      if (JSON_flag_signin == false) {
        cartadding.innerText = "Please Log in First";
      } else {
        if (duplicate(element) == false) {
          CartArr.push({ ...element, quantity: 1 });

          //console.log(CartArr);
          localStorage.setItem("cart", JSON.stringify(CartArr));
          cartadding.innerText = "Product Added To Cart";
          console.log("login", JSON_flag_signin);
        } else if (duplicate(element) == true) {
          cartadding.innerText = "Product Already in Cart";
        }
      }
    });
    div.append(image, name, cartadding, price, addToCart);
    container.append(div);
  });
}

function duplicate(product) {
  for (let i = 0; i < CartArr.length; i++) {
    if (CartArr[i].name == product.name) {
      return true;
    }
  }
  return false;
}

//fetch and Display Beverage

asyncfetchbevrage();
async function asyncfetchbevrage() {
  try {
    let request = await fetch(api2);
    let data = await request.json();
    fetchBevragedata = data;
    // fetchdatabevragestore = fetchBevragedata;
    // //console.log(fetchdata)
    // localStorage.setItem(
    //   "fetchdatabevragestore",
    //   JSON.stringify(fetchdatabevragestore)
    // );
    DisplayBeverage(fetchBevragedata);
  } catch (error) {
    console.log(error);
  }
}

function DisplayBeverage(data) {
  Bevragecontainer.innerHTML = null;
  data.forEach((element) => {
    let div = document.createElement("div");
    let name = document.createElement("h2");
    let image = document.createElement("img");
    let price = document.createElement("h2");
    let cartadding = document.createElement("h2");
    let addToCart = document.createElement("button");
    name.innerText = element.name;
    image.setAttribute("src", element.image);
    price.innerText = `Price:  ₹${element.price}`;

    addToCart.innerText = "Add to Cart";
    addToCart.addEventListener("click", () => {
      if (JSON_flag_signin == false) {
        cartadding.innerText = "Please Log in First";
      } else {
        if (duplicate(element) == false) {
          CartArr.push({ ...element, quantity: 1 });

          //console.log(CartArr);
          localStorage.setItem("cart", JSON.stringify(CartArr));
          cartadding.innerText = "Product Added To Cart";
          console.log("login", JSON_flag_signin);
        } else if (duplicate(element) == true) {
          cartadding.innerText = "Product Already in Cart";
        }
      }
    });
    div.append(image, name, cartadding, price, addToCart);
    Bevragecontainer.append(div);
  });
}

////fetch and Display desserts

asyncfetchdesserts();
async function asyncfetchdesserts() {
  try {
    let request = await fetch(apidesserts);
    let data = await request.json();
    fetchdessertsdata = data;
    //fetchdatadessertsstore = fetchdessertsdata;
    //console.log(fetchdata)
    // localStorage.setItem(
    //   "fetchdatadessertsstore",
    //   JSON.stringify(fetchdatadessertsstore)
    // );
    Displaydesserts(fetchdessertsdata);
  } catch (error) {
    console.log(error);
  }
}

function Displaydesserts(data) {
  dessertscontainer.innerHTML = null;
  data.forEach((element) => {
    let div = document.createElement("div");
    let name = document.createElement("h2");
    let image = document.createElement("img");
    let price = document.createElement("h2");
    let cartadding = document.createElement("h2");
    let addToCart = document.createElement("button");
    name.innerText = element.name;
    image.setAttribute("src", element.image);
    price.innerText = `Price:  ₹${element.price}`;

    addToCart.innerText = "ORDER NOW";
    addToCart.addEventListener("click", () => {
      if (JSON_flag_signin == false) {
        cartadding.innerText = "Please Log in First";
      } else {
        if (duplicate(element) == false) {
          CartArr.push({ ...element, quantity: 1 });

          //console.log(CartArr);
          localStorage.setItem("cart", JSON.stringify(CartArr));
          cartadding.innerText = "Product Added To Cart";
          console.log("login", JSON_flag_signin);
        } else if (duplicate(element) == true) {
          cartadding.innerText = "Product Already in Cart";
        }
      }
    });
    div.append(image, name, cartadding, price, addToCart);
    dessertscontainer.append(div);
  });
}

////fetch and Display desserts

asyncfetchSides();
async function asyncfetchSides() {
  try {
    let request = await fetch(apiSides);
    let data = await request.json();
    fetchSidesdata = data;
    fetchdatasidesstore = fetchSidesdata;
    //console.log(fetchdata)
    // localStorage.setItem(
    //   "fetchdatasidesstore",
    //   JSON.stringify(fetchdatasidesstore)
    // );
    DisplaySides(fetchSidesdata);
  } catch (error) {
    console.log(error);
  }
}

function DisplaySides(data) {
  Sidescontainer.innerHTML = null;
  data.forEach((element) => {
    let div = document.createElement("div");
    let name = document.createElement("h2");
    let image = document.createElement("img");
    let price = document.createElement("h2");
    let cartadding = document.createElement("h2");
    let addToCart = document.createElement("button");
    name.innerText = element.name;
    image.setAttribute("src", element.image);
    price.innerText = `Price:  ₹${element.price}`;

    addToCart.innerText = "Add to Cart";
    addToCart.addEventListener("click", () => {
      console.log("here I am", JSON_flag_signin);
      if (JSON_flag_signin == false) {
        cartadding.innerText = "Please Log in First";
      } else {
        if (duplicate(element) == false) {
          CartArr.push({ ...element, quantity: 1 });

          //console.log(CartArr);
          localStorage.setItem("cart", JSON.stringify(CartArr));
          cartadding.innerText = "Product Added To Cart";
          console.log("login", JSON_flag_signin);
        } else if (duplicate(element) == true) {
          cartadding.innerText = "Product Already in Cart";
        }
      }
    });
    div.append(image, name, cartadding, price, addToCart);
    Sidescontainer.append(div);
  });
}

let login_name = JSON.parse(localStorage.getItem("login_name")) || [];

//console.log(JSON_flag_signin, login_name);
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
  //console.log(signout.innerText);
  signout.style.backgroundColor = "rgb(0, 100, 145)";
}
signout.addEventListener("click", () => {
  JSON_flag_signin = false;
  login_name = "";
  CartArr = [];
  localStorage.setItem("cart", JSON.stringify(CartArr));
  localStorage.setItem("login_flag", JSON.stringify(JSON_flag_signin));
  localStorage.setItem("login_name", JSON.stringify(login_name));
  localStorage.setItem("cart", JSON.stringify(CartArr));
  window.location.href = "index.html";
});

let location_input = document.getElementById("location_input");
let location_btn = document.getElementById("location_btn");

location_btn.addEventListener("click", () => {
  console.log(location_input.value);
  search(location_input.value);
  console.log(fetchdata);
});

function search(searchvalues) {
  fetchDatafull1 = fetchdata.filter(function (el) {
    if (el.name.toUpperCase().includes(searchvalues.toUpperCase())) {
      return true;
    } else {
      return false;
    }
  });
  console.log(fetchDatafull1);
  Display(fetchDatafull1);

  fetchDatafullBeverage1 = fetchBevragedata.filter(function (el) {
    if (el.name.toUpperCase().includes(searchvalues.toUpperCase())) {
      return true;
    } else {
      return false;
    }
  });
  console.log(fetchDatafullBeverage1);
  DisplayBeverage(fetchDatafullBeverage1);

  fetchDatafulldesserts1 = fetchdessertsdata.filter(function (el) {
    if (el.name.toUpperCase().includes(searchvalues.toUpperCase())) {
      return true;
    } else {
      return false;
    }
  });
  console.log(fetchDatafulldesserts1);
  Displaydesserts(fetchDatafulldesserts1);

  fetchDatafullSides1 = fetchSidesdata.filter(function (el) {
    if (el.name.toUpperCase().includes(searchvalues.toUpperCase())) {
      return true;
    } else {
      return false;
    }
  });
  console.log(fetchDatafullSides1);
  DisplaySides(fetchDatafullSides1);
}

// let fetchdatastore = JSON.parse(localStorage.getItem("fetchdatastore")) || [];
// let fetchdatabevragestore =
//   JSON.parse(localStorage.getItem("fetchdatabevragestore")) || [];
// let fetchdatasidesstore =
//   JSON.parse(localStorage.getItem("fetchdatasidesstore")) || [];
// let fetchdatadessertsstore =
//   JSON.parse(localStorage.getItem("fetchdatadessertsstore")) || [];

// let search_value = JSON.parse(localStorage.getItem("search"));
// if (search_value != "") {
//   console.log(search_value);
//   console.log(fetchdatastore);

//   // search(
//   //   search_value,
//   //   fetchdatastore,
//   //   fetchdatabevragestore,
//   //   fetchdatasidesstore,
//   //   fetchdatadessertsstore
//   // );

//   localStorage.setItem("search", JSON.stringify(search_value));
// }

// if (document.location.reload == true) {
//   search_value = "";
//   Display(fetchdata);
//   console.log("reload true");
// }
// setTimeout(() => {
//   console.log(search_value);
//   window.onload = myfunction();
// }, 5000);

// function myfunction() {
//   search_value.value = "";
//   console.log("reload true");
//   console.log(search_value);
//   localStorage.setItem("search", JSON.stringify(search_value));
// }
