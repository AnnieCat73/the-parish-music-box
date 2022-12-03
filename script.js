//Navigation for mobile and tablet

const closeBtn = document.querySelector(".close-nav");
const openBtn = document.querySelector(".open-nav");
const navMenu = document.querySelector(".menu-inside");

//Attach eventlisteners and toggle navigation-open class
openBtn.addEventListener("click", () => {
  navMenu.classList.toggle("navigation-open");
});

closeBtn.addEventListener("click", () => {
  navMenu.classList.toggle("navigation-open");
});
