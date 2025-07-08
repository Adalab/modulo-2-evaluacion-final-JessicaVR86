"use strict";

const title = document.querySelector(".js_title");
const searchText = document.querySelector(".searchtext");
const searchBtn = document.querySelector(".js_searchbtn");
const moviesUl = document.querySelector(".js_movieslist");
const favouriteList = document.querySelector(".js_favouritelist");

let animeCards = [];
let favCards = [];

title.addEventListener("mouseover", () => {
  title.classList.add("title");
});
title.addEventListener("mouseout", () => {
  title.classList.remove("title");
});

const renderOneCard = (animeCard) => {
  let html = "";
  if (!animeCard.images) {
    html = `<li class="cardbox js_select_card " data-identity= "${animeCard.mal_id}" >
            <h6 class="cardtitle">  ${animeCard.title} </h6><br>
            <p>${animeCard.episodes} </p>
            <img
              src="https://placehold.co/210x300/ffffff/555555?text=TV"
              alt=""
              class="cardphoto"
            />
          </li>`;
  } else {
    html = `<li class="cardbox js_select_card" data-identity= "${animeCard.mal_id}">
            <h6 class="cardtitle">  ${animeCard.title} </h6><br>
            <p>${animeCard.episodes} </p>
            <img
              src=" ${animeCard.images.jpg.image_url}"
              alt=""
              class="cardphoto"
            />
          </li>`;
  }

  return html;
};

const logBtn = document.querySelector('.js_logbtn');
const handleClickLogBtn =(ev)=>{
  ev.preventDefault();
  console.log()
  animeCards(animeCards.title)
   console.log()
}

logBtn.addEventListener('click',  handleClickLogBtn);

const handleClickBtn = (ev) => {
  ev.preventDefault();

  const search = searchText.value;
  fetch(`https://api.jikan.moe/v4/anime?q=${search}`)
    .then((response) => response.json())
    .then((data) => {
      animeCards = data.data;
      renderAllCards();
    });
};
searchBtn.addEventListener("click", handleClickBtn);

const renderAllCards = () => {
  let html = "";
  for (const animeCard of animeCards) {
    html += renderOneCard(animeCard);
  }
  moviesUl.innerHTML = html;

  const selectCards = document.querySelectorAll(".js_select_card");
  for (const selectCard of selectCards) {
    selectCard.addEventListener("click", handleClickFav);
  }
};

function renderAllFavCards() {
  let html = "";
  for (const animeCard of favCards) {
    html += renderOneCard(animeCard);
  }
  favouriteList.innerHTML = html;
}

const handleClickFav = (ev) => {
  const clicked = ev.currentTarget;
  clicked.classList.toggle("favourite");
  const identityMovie = parseInt(clicked.dataset.identity);

  const movieFavClick = favCards.findIndex(
    (animeCard) => animeCard.mal_id === identityMovie
  );
  if (movieFavClick === -1) {
    const movieFavObj = animeCards.find(
      (animeCard) => animeCard.mal_id === identityMovie
    );
    favCards.push(movieFavObj);
    localStorage.setItem("favouriteCards", JSON.stringify(favCards));
    const htmlPrint = renderOneCard(movieFavObj);
    favouriteList.innerHTML += htmlPrint;
  } else {
    favCards.splice(movieFavClick, 1);
    renderAllFavCards();
  }
};

fetch("https://api.jikan.moe/v4/anime?q=naruto")
  .then((response) => response.json())
  .then((data) => {
    animeCards = data.data;
    renderAllCards();
  });
