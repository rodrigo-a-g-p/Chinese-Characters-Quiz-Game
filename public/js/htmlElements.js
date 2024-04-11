export const bodyElement = document.getElementById("body");
export const gameContainer = document.querySelector(".container--game");
export const hanziContainer = document.querySelector(".container--hanzi");
export const pinyinContainer = document.querySelector(".container--pinyin");
export const levelButtons = document.querySelectorAll(".btn--level");
export const numberCompletedElement = document.querySelector(
  ".nav--number--completed"
);
export const numberTotalElement = document.querySelector(".nav--number--total");
export const btnAudio = document.querySelector(".btn--audio");
export const timeEl = document.querySelector(".nav--time");

export const envMetaTag = [...document.getElementsByTagName("meta")].find(
  (el) => el.name === "environment"
);
