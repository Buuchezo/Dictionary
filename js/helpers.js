export const closeDropdown = function (data, font) {
  document.querySelector(".select").innerHTML = `${data}`;
  document.querySelector(".select").style.fontFamily = `${font}`;
  document.querySelector(".select").style.fontSize = "1.4rem";
  document.querySelector("ul").classList.add("hidden");
  document.querySelector("body").style.fontFamily = `${font}`;
};
