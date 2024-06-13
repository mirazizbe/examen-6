import { checkToken, redirect } from "./addition.js";

const form = document.forms[0];
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

window.addEventListener("DOMContentLoaded", function () {
  const hasToken = checkToken();
  if (hasToken) {
    redirect("/index.html"); 
  }
});

const credentials = {
  email: emailInput ? emailInput.value : '', 
  password: passwordInput ? passwordInput.value : '', 
};

emailInput.oninput = function (event) {
  credentials.email = event.target.value;
  console.log(credentials);
};

passwordInput.oninput = function (event) {
  credentials.password = event.target.value;
  console.log(credentials);
};

form.onsubmit = function (event) {
  event.preventDefault();
  login(credentials); // login va password qiymatinin olish
};

async function login(credentials) {
  const api_url = "https://api.escuelajs.co/api/v1/auth/login";
  try {
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (data.statusCode === 401) { 
      alert("Email and password are incorrect, please try again");
    } else {
      const { access_token, refresh_token } = data; 
      sessionStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      const hasToken = checkToken();
      if (hasToken) {
        redirect("/index.html"); 
      }
    }
  } catch (error) {
    console.error(error);
  }
}
