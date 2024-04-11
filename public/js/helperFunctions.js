import { envMetaTag } from "./htmlElements.js";

export const getData = async (urlSegment) => {
  try {
    const res = await axios({
      method: "get",
      url: getBackendUrl(`/api/data/${urlSegment}`),
    });

    return res.data.result;
  } catch (err) {
    console.log(err.message);
  }
};

const getBackendUrl = (url) => {
  // If we are using localhost, the NODE_ENV will be development, and, as such, we will need localhost url segment to access the backend
  // This website will be hosted on a server, which means the website will not be hosted in localhost anymore, and, as such, if we want to make an API Call to the backend, we cannot have the locahost segment
  // This works because when our website is hosted, the frontend and the backend will be hosted in he same domain, so the frontend can simply call the url that it receives in this function to make an API Call to the backend
  if (envMetaTag["content"] === "development") {
    url = `http://127.0.0.1:3000${url}`;
  }
  return url;
};

export const createButton = (buttonInnerHTML, buttonClasses, parentElement) => {
  const newButton = document.createElement("a");
  newButton.innerHTML = buttonInnerHTML;
  newButton.href = "#";
  newButton.classList.add(...buttonClasses);
  parentElement.appendChild(newButton);
};

export const shuffleElements = (parentEl) => {
  for (let i = parentEl.children.length; i >= 0; i--) {
    parentEl.appendChild(parentEl.children[(Math.random() * i) | 0]);
  }
};

export const renderTimer = (timer, timeEl) => {
  timer.setSeconds(timer.getSeconds() + 1);
  timeEl.innerHTML = timer
    .toLocaleTimeString({
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(/AM|PM/, "");
};

export const renderNewAsset = ({
  assetType,
  assetArray,
  lastUsedAsset,
  bodyEl,
  playAudio,
}) => {
  if (lastUsedAsset) {
    assetArray.splice(assetArray.indexOf(lastUsedAsset), 1);
  }

  const selectedEl = assetArray[Math.floor(Math.random() * assetArray.length)];

  if (assetType === "image") {
    return changeBackgroundImage(selectedEl, bodyEl);
  }

  if (assetType === "audio") {
    return changeAudio(selectedEl, playAudio);
  }
};

const changeBackgroundImage = (newImage, bodyEl) => {
  bodyEl.style.backgroundImage = `var(--bg-linear-gradient), url(../images/${newImage})`;
  return newImage;
};

const changeAudio = (newAudio, playAudio) => {
  const audio = new Audio(`../audio/${newAudio}`);
  if (playAudio) {
    audio.play();
  }
  return audio;
};
