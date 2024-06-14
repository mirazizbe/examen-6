import { checkToken, redirect, logout } from "./addition.js";

const logout_btn = document.getElementById("logout-btn");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const container = document.getElementById("container");
const addProductBtn = document.getElementById ("submit;")


logout_btn.onclick = logout;

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
  localStorage.setItem('products', JSON.stringify(products));
  addProductToDOM(newProduct);
  
}
function addProductToDOM(product) {
  const productPage = document.createElement('div');
  productPage.classList.add("product-page");
  productPage.innerHTML = `
  <p>ID: ${product.id}</p>
  <p>Title; ${product.title}</p>
  <p>Price: ${product.price}$</p>
  <p>Description: ${product.description}</p>
  
  `;
  container.append(productPage);
}
