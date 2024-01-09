class SearchView {
  #parentEl = document.querySelector(".search__container");
  //getting the value fro the input
  getQuery() {
    const query = this.#parentEl.querySelector(".search__field").value;
    this.clearInput();
    return query;
  }
  //submiting the value
  addHandlerSearch(handler) {
    this.#parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      if (
        document.querySelector(".search__field").value === "" ||
        document.querySelector(".search__field") === null
      ) {
        document.querySelector(".search__container").style.background =
          "rgba(255, 0, 0,0.2)";
        document.querySelector(".search__field").setAttribute("required", "");
      } else {
        console.log("full");
        document.querySelector(".search__container").style.border = "none";
        document.querySelector(".search__container").style.backgroundColor =
          "#f4f4f4";
      }
      handler();
    });
  }
  // clearing the input after submitting
  clearInput() {
    this.#parentEl.querySelector(".search__field").value = "";
  }
}

export default new SearchView();
