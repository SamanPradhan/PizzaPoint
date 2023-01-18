let api = "https://63c77a71e52516043f3eaecd.mockapi.io/Dominos";
let fetchdata = {};
let CartArr = JSON.parse(localStorage.getItem("cart")) || [];

let container = document.getElementById("product-container");
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
    //console.log(fetchdata)
    Display(fetchdata);
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

    let addToCart = document.createElement("button");
    name.innerText = element.name;
    image.setAttribute("src", element.image);
    price.innerText = `Price:  ₹${element.price}`;

    addToCart.innerText = "Add to Cart";
    addToCart.addEventListener("click", () => {
      if (duplicate(element) == false) {
        CartArr.push({ ...element, quantity: 1 });

        console.log(CartArr);
        localStorage.setItem("cart", JSON.stringify(CartArr));
        alert("Product Added To Cart");
      } else if (duplicate(element) == true) {
        alert("Product Already in Cart");
      }
    });
    div.append(image, name, price, addToCart);
    container.append(div);
  });
}

function duplicate(product) {
  for (let i = 0; i < CartArr.length; i++) {
    if (CartArr[i].id == product.id) {
      return true;
    }
  }
  return false;
}
