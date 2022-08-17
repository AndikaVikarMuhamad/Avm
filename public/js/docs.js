// Visitor
const Visitor = document.getElementById("visitor");

VisitorCount();

function VisitorCount() {
  fetch("https://api.countapi.xyz/hit/banke/cuk")
    .then((res) => res.json())
    .then((res) => {
      Visitor.innerHTML = res.value;
    });
}

// Dark mode

const body = document.querySelector("body"),
  modeToggle = body.querySelector(".mode-toggle");
sidebar = body.querySelector("nav");
sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
  body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
  sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
});

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
  if (sidebar.classList.contains("close")) {
    localStorage.setItem("status", "close");
  } else {
    localStorage.setItem("status", "open");
  }
});

// // Search Function
// document.querySelector("#search-input").addEventListener("input", filterlist);

// function filterlist() {
//   const Search = document.querySelector("#search-input");
//   const filter = Search.value.toloLowerCase();
//   const list = document.querySelectorAll(".data-list");

//   list.forEach((item) => {
//     const text = item.textContent;
//     if (text.toLowerCase().includes(filter.toLowerCase())) {
//       item.style.display = "";
//     } else {
//       item.style.display = "none";
//     }
//   });
// }
window.onload = VisitorCount();