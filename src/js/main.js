"use strict";

const searchText = document.querySelector(".searchtext");
const searchBtn = document.querySelector(".js_searchbtn");
const moviesUl = document.querySelector(".js_movieslist");

let animeCards = [];
const animeCard = {};

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

const handleClickFav = (ev)=>{
  const clicked = ev.currentTarget;
  clicked.classList.toggle('favourite');

}

fetch("https://api.jikan.moe/v4/anime?q=naruto")
  .then((response) => response.json())
  .then((data) => {
    animeCards = data.data;
    renderAllCards();
  });


const renderOneCard = (animeCard) => {
  let html = "";
  if (!animeCard.images) {
    html = `<li class="cardbox js_select_card">
            <h6 class="cardtitle">  ${animeCard.title} </h6><br>
            <img
              src="https://placehold.co/210x300/ffffff/555555?text=TV"
              alt=""
              class="cardphoto"
            />
          </li>`;
  } else {
    html = `<li class="cardbox js_select_card">
            <h6 class="cardtitle">  ${animeCard.title} </h6><br>
            <img
              src=" ${animeCard.images.jpg.image_url}"
              alt=""
              class="cardphoto"
            />
          </li>`;
  }

  return html;
};

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

///  FAVORITOS
