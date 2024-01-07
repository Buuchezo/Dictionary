class WordView {
  #parentEl = document.querySelector(".meaning__container");
  #data;
  #markup = "";
  #errorMsg = `errrrrrrror`;
  // responsible for bring the data in the view,js
  render(data) {
    this.#data = data;
    this.clearGeneratedMarkup();
    const markup = this.#generateMarkup();

    //rendering the detailed data
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
    this.#generatedSelectedmarkup(this.#data.noun, "noun");
    this.#generatedSelectedmarkup(this.#data.verb, "verb");
    this.#generatedSelectedmarkup(this.#data.adjective, "adjective");
    this.#generatedSelectedmarkup(this.#data.adverb, "adverb");
    this.#generatedSelectedmarkup(this.#data.interjection, "interjection");

    document.querySelector(".search__result").innerHTML = `${data.word}`;
    document.querySelector(
      ".search__result-meaning"
    ).innerHTML = `${data.phonetic}`;
  }

  #generateMarkup() {
    //rendering the structure
    if (Object.hasOwn(this.#data, "noun"))
      this.#markup += `<div class="meaning__container">
                              <p class="sideline sideline-noun">noun</p>
                               </div>
                              <div class="definition">
                              <p>Meaning</p>
                              <ul class="noun-list">
                              </ul>
                              <div class="synonyms-container">
                                <p class="synonym">${
                                  this.#data.synonyms.length > 1
                                    ? "Synonyms"
                                    : "Synonym"
                                }</p>
                                <p class="synonym synonym-example">
                                  <span><strong>${
                                    this.#data.synonyms.length === 0
                                      ? ""
                                      : this.#data.synonyms.slice(0, 2)
                                  }</strong></span>
                                </p>  
                              </div>
                              <p id="example">
                                "${this.#data.nounExample || ""}"
                               </p>
                            </div>`;
    if (Object.hasOwn(this.#data, "verb"))
      this.#markup += `  <div class="meaning__container">
                              <p class="sideline sideline-verb">verb</p>
                            </div>
                            <div class="definition">
                              <p>Meaning</p>
                              <ul class="verb-list">
                              </ul>
                              <p id="example">
                                "${this.#data.verbExample || ""}"
                               </p>
                            </div>`;

    if (Object.hasOwn(this.#data, "adjective"))
      this.#markup += `<div class="meaning__container">
                              <p class="sideline sideline-adjective">adjective</p>
                            </div>
                            <div class="definition">
                              <p>Meaning</p>
                              <ul class="adjective-list">
                              </ul>
                            </div>
                            <p id="example">
                                "${this.#data.adjectiveExample || ""}"
                               </p>
                            <div class="line"></div>
                            `;

    if (Object.hasOwn(this.#data, "adverb"))
      this.#markup += `<div class="meaning__container">
                              <p class="sideline sideline-adverb">adverb</p>
                            </div>
                            <div class="definition">
                              <p>Meaning</p>
                              <ul class="adverb-list">
                              </ul>
                            </div>
                            <p id="example">
                                "${this.#data.adverbExample || ""}"
                               </p>
                            <div class="line"></div>
                          `;
    if (Object.hasOwn(this.#data, "interjection"))
      this.#markup += `<div class="meaning__container">
                              <p class="sideline sideline-interjection">interjection</p>
                            </div>
                            <div class="definition">
                              <p>Meaning</p>
                              <ul class="interjection-list">
                              </ul>
                            </div>
                            <p id="example">
                                "${this.#data.interjectionExample || ""}"
                               </p>
                            <div class="line"></div>
                          `;

    this.#markup += `<div class="footer">
  <p class="sideline-footer"></p>
  <p id="footer-text">
    Source
    <a href="https://en.wiktionary.org/wiki/keyboard" target="_blank"
      >${this.#data.sourceUrl.slice(0, 1)}</a
    >
  </p>
</div>`;
    return this.#markup;
  }
  //generating the detailed markup
  #generatedSelectedmarkup(data, position) {
    data?.forEach((element) => {
      const html = `<li>${element.definition}</li>`;
      document
        .querySelector(`.${position}-list`)
        .insertAdjacentHTML("beforeend", html);
    });
  }
  addHandlerRender(handler) {
    handler();
  }
  //clearing the markup before render
  clearGeneratedMarkup() {
    this.#markup = "";
  }

  renderError(message = this.#errorMsg) {
    this.#markup = `<div class="meaning__container">
                              <p class="sideline ">ERROR</p>
                            </div>
                            <div class="definition">
                              <p>${message}</p>
                              <ul class="interjection-list">
                              </ul>
                            </div>
                            <p id="example">
                        
                               </p>
                            <div class="line"></div>
                          `;
    return this.#markup;
  }
}

export default new WordView();
