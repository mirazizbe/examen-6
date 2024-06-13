import { checkToken, redirect, logout } from "./addition.js";

const logout_btn = document.getElementById("logout-btn");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const container = document.getElementById("container");

logout_btn.onclick = logout;

// fetch_btn.onclick =  async function (e) {
//   const api_url = "https://api.escuelajs.co/api/v1/auth/profile";
//   const access_token = sessionStorage.getItem("access_token");

//   const response = await fetch(api_url, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//     },
//   });

//   const user = await response.json();
//   console.log(user);
// };



window.addEventListener("DOMContentLoaded", function () {
  const hasToken = checkToken();

  if (!hasToken) {
    redirect("/login.html"); 
  }
});

const form = document.forms[0];
const products = [];

form.onsubmit = function(event) {
  event.preventDefault();

  const newProduct = {
    id: Date.now(),
    title: title.value,
    price: price.value,
    description: description.value,
  }

  title.value = '';
  price.value = '';
  description.value = '';
  

  products.push(newProduct);
  // console.log(products);
  newProduct.push(container);
  console.log(container);
}
