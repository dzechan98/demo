const bars = document.querySelector(".bars");
const listItemNavbar = document.querySelector(".list__item-navbar");
const itemNavbar = document.querySelectorAll(".item__navbar");
const closeBtn = document.querySelector(".close");
const btnOption = document.querySelectorAll(".section-2-option button");
const listItem = document.querySelectorAll(".list__item");
const animationElement = document.querySelectorAll(".show-on-scroll");
let thisPage = 1;
let limit = 5;
bars.onclick = function () {
  listItemNavbar.style.top = 0;
  listItemNavbar.style.opacity = "1";
};
closeBtn.onclick = function () {
  listItemNavbar.style.top = "-200%";
  listItemNavbar.style.opacity = "0";
};
itemNavbar.forEach((item) => {
  item.onclick = () => {
    const currentActive = document.querySelector(".item__navbar .active");
    listItemNavbar.style.top = "-200%";
    listItemNavbar.style.opacity = "1";
    if (!(item.dataset.type == "close")) {
      currentActive.classList.remove("active");
      item.querySelector("a").classList.add("active");
    } else {
      currentActive.classList.remove("active");
      document.querySelector(".home").classList.add("active");
    }
  };
});
let array = listItem;
btnOption.forEach((option) => {
  option.addEventListener("click", () => {
    const btnPrimary = document.querySelector(".section-2-option .btn-primary");
    btnPrimary.classList.remove("btn-primary");
    option.classList.add("btn-primary");
    array = [];
    listItem.forEach((item) => {
      if (
        item.dataset.type == option.dataset.type ||
        option.dataset.type == ""
      ) {
        item.style.display = "block";
        array.push(item);
      } else {
        item.style.display = "none";
      }
    });
    loadItem(array);
  });
});

function loadItem(array) {
  let beginGet = limit * (thisPage - 1);
  let endGet = limit * thisPage - 1;
  array.forEach((item, index) => {
    if (beginGet <= index && index <= endGet) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  listPage(array);
}
loadItem(listItem);
function listPage(array) {
  let count = Math.ceil(array.length / limit);
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";
  for (let i = 1; i <= count; i++) {
    let newPage = document.createElement("span");
    newPage.innerHTML = i;
    if (i == thisPage) {
      newPage.classList.add("active");
    }
    array = [...array];
    newPage.setAttribute("onclick", "changePage(" + i + ")");
    pagination.appendChild(newPage);
  }
}
function changePage(index) {
  thisPage = index;
  loadItem(array);
}

function tonggleAnimationElementWindow(element) {
  let rect = element.getClientRects()[0];
  let heightScreen = window.innerHeight;
  if (!(rect?.bottom < 0 || rect?.top > heightScreen)) {
    element.classList.add("start");
  } else {
    element.classList.remove("start");
  }
}

function checkAnimation() {
  [...animationElement].forEach((el) => {
    tonggleAnimationElementWindow(el);
  });
}

checkAnimation();
window.onscroll = checkAnimation;
