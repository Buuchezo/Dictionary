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
const list = document.querySelector("ul");
const img = document.createElement("img");

/////////////////////////////////////////////////////////////

//close the down drop
const controlFont = function (e) {
  list.classList.remove("hidden");
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

    await model.getData(query);
    let data = model.state.word;

    for (let key in data) {
      if (data[key] === undefined) {
        delete data[key];
        if (Object.hasOwn(data, "audio") === false) {
          document.querySelector(".item2").classList.add("hidden");
        } else {
          document.querySelector(".item2").classList.remove("hidden");
        }
      }
    }

    document.querySelector(".meaning__container").innerHTML = "";

    // 2). rendering the word meaning
    wordView.render(data);

    document.querySelector(".meaning__container").classList.remove("error");
    //3) play audio
    play.addEventListener("click", function (e) {
      let audio = new Audio(`${model.state.word.audio}`);
      audio.play();
    });
  } catch (err) {
    document.querySelector(".meaning__container").classList.add("error");
    document.querySelector(".item2").classList.add("hidden"),
      (document.querySelector(
        ".meaning__container"
      ).innerHTML = `<div class="error">
    <p id="emoji">🙁</p>
    <span class="error__heading">No Definition Found</span>
    <p id="error__text">
      Sorry pal, we couldn't find definitions for the word you were looking
      for. Please check the spelling and try again
    </p>
  </div>`);

    document.querySelector(".error").appendChild(img);
    document.querySelector(".search__result").innerHTML = ``;
    document.querySelector(".search__result-meaning").innerHTML = ``;
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
