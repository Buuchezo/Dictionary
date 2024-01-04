class selectFontView {
  #parentEl = document.querySelector(".dropdown");

  addHandlerSelectfont(handler) {
    this.#parentEl.addEventListener("click", handler);
  }
}

export default new selectFontView();
