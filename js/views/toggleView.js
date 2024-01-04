class ToggleView {
  #parentEl = document.querySelector(".button");

  addHandlerToggle(handler) {
    this.#parentEl.addEventListener("click", handler);
  }
}

export default new ToggleView();
