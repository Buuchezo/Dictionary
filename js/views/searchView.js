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
      handler();
    });
  }
  // clearing the input after submitting
  clearInput() {
    this.#parentEl.querySelector(".search__field").value = "";
  }
}

export default new SearchView();
