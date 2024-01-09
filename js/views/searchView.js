class SearchView {
  #parentEl = document.querySelector("form");
  //getting the value fro the input
  getQuery() {
    const query = this.#parentEl.querySelector(".search__field").value;
    this.clearInput();
    return query;
  }
  //submiting the value
  addHandlerSearch(handler) {
    this.#parentEl.addEventListener("submit", function (e) {
      if (
        document.querySelector(".search__field").value === "" ||
        document.querySelector(".search__field") === null
      ) {
        document.querySelector(".meaning__container").innerHTML = ``;
        document.querySelector("form").classList.add("search--error");
        document.querySelector(".error__message").innerHTML =
          "Whoops, can´t be empty...";
        document.querySelector(".search__result").innerHTML = ``;
        document.querySelector(".search__result-meaning").innerHTML = ``;
        document.querySelector(".item2").classList.add("hidden");
        document.querySelector(".meaning__container").classList.remove("error");
      } else {
        document.querySelector("form").classList.remove("search--error");
        document.querySelector(".error__message").innerHTML = "";
      }

      e.preventDefault();
      handler();
    });
  }
  // clearing the input after submitting
  clearInput() {
    this.#parentEl.querySelector(".search__field").value = "";
  }
}

export default new SearchView();
