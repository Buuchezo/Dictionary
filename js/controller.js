import * as model from "./model.js";
import wordView from "./views/view.js";
import searchView from "./views/searchView.js";
import toggleView from "./views/toggleView.js";

const ToggleBtn = document.querySelector(".button");
const body = document.querySelector("body");
const dropdownBtn = document.querySelector(".dropdown");
const play = document.getElementById("play-button");

/////////////////////////////////////////////////////////////
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

    // 2). rendering the word meaning
    wordView.render(data);
  } catch (err) {
    console.error(err);
  }
};

//this is how i initiate the publisher subscriber pattern
const init = function () {
  wordView.addHandlerRender(controlData);
  searchView.addHandlerSearch(controlData);
  toggleView.addHandlerToggle(controlToggle);
};
init();
