import * as model from "./model.js";
import wordView from "./views/view.js";
import searchView from "./views/searchView.js";
import toggleView from "./views/toggleView.js";
import selectFontView from "./views/selectFontView.js";
import { closeDropdown } from "./helpers.js";

const body = document.querySelector("body");
const play = document.getElementById("play-button");
const sansSerif = document.querySelector(".sans-serif");
const serif = document.querySelector(".serif");
const mono = document.querySelector(".mono");

/////////////////////////////////////////////////////////////

//close the down drop
const controlFont = function (e) {
  document.querySelector("ul").classList.remove("hidden");
  if (e.target === sansSerif) {
    sansSerif.classList.add("active");
    serif.classList.remove("active");
    mono.classList.remove("active");
    closeDropdown("Sans Serif", "sans-serif");
  }
  if (e.target === serif) {
    sansSerif.classList.remove("active");
    serif.classList.add("active");
    mono.classList.remove("active");
    closeDropdown("Serif", "serif");
  }
  if (e.target === mono) {
    sansSerif.classList.remove("active");
    serif.classList.remove("active");
    mono.classList.add("active");
    closeDropdown("Mono", "monospace");
  }
};
// toggling button
const controlToggle = function () {
  body.classList.contains("dark") === true
    ? body.classList.remove("dark")
    : body.classList.add("dark");
};

// responsible for the data flow
const controlData = async function () {
  try {
    //1.) getting the query
    const query = searchView.getQuery();
    if (!query) return;
    //2). loading the word meaning
    setTimeout(
      () => document.querySelector(".item2").classList.remove("hidden"),
      400
    );
    await model.getData(query);
    let data = model.state.word;
    for (let key in data) {
      if (data[key] === undefined) {
        delete data[key];
      }
    }
    console.log(model.state);
    // 2). rendering the word meaning
    wordView.render(data);

    //3) play audio
    play.addEventListener("click", function (e) {
      let audio = new Audio(`${model.state.word.audio}`);
      audio.play();
    });
  } catch (err) {
    console.error(err);
  }
};

//this is how i initiate the publisher subscriber pattern
const init = function () {
  wordView.addHandlerRender(controlData);
  searchView.addHandlerSearch(controlData);
  toggleView.addHandlerToggle(controlToggle);
  selectFontView.addHandlerSelectfont(controlFont);
};
init();
