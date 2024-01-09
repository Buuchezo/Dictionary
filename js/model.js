export const state = {
  word: [],
};
export const getData = async function (query) {
  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
    );

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    //creating the object to be exported to the controller
    state.word = {
      word: data[0].word,

      noun: data[0].meanings.filter((el) => el.partOfSpeech === "noun")[0]
        ?.definitions,

      verb: data[0].meanings.filter((el) => el.partOfSpeech === "verb")[0]
        ?.definitions,

      adverb: data[0].meanings.filter((el) => el.partOfSpeech === "adverb")[0]
        ?.definitions,

      adjective: data[0].meanings.filter(
        (el) => el.partOfSpeech === "adjective"
      )[0]?.definitions,

      interjection: data[0].meanings.filter(
        (el) => el.partOfSpeech === "adjective"
      )[0]?.definitions,

      audio: data[0].phonetics
        .filter((el) => Object.hasOwn(el, "audio"))
        .filter((el) => el.audio !== "")[0]?.audio,

      synonyms: data[0].meanings.filter((el) => el.synonyms !== "")[0]
        ?.synonyms,

      sourceUrl: data[0]?.sourceUrls,

      phonetic: data[0]?.phonetics.filter((el) => Object.hasOwn(el, "text"))[0]
        ?.text,

      nounExample: data[0].meanings
        .filter((el) => el.partOfSpeech === "noun")[0]
        ?.definitions.filter((el) => el?.example)[0]?.example,

      verbExample: data[0].meanings
        .filter((el) => el.partOfSpeech === "verb")[0]
        ?.definitions.filter((el) => el?.example)[0]?.example,

      adjectiveExample: data[0].meanings
        .filter((el) => el.partOfSpeech === "adjective")[0]
        ?.definitions.filter((el) => el?.example)[0]?.example,

      adverbExample: data[0].meanings
        .filter((el) => el.partOfSpeech === "adverb")[0]
        ?.definitions.filter((el) => el?.example)[0]?.example,

      interjectionExample: data[0].meanings
        .filter((el) => el.partOfSpeech === "interjection")[0]
        ?.definitions.filter((el) => el?.example)[0]?.example,
    };
  } catch (err) {
    throw err;
  }
};
