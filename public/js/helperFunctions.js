export const getData = async (urlSegment) => {
  try {
    const res = await axios({
      method: "get",
      url: `http://127.0.0.1:3000/api/data/${urlSegment}`,
    });

    return res.data.result;
  } catch (err) {
    console.log(err.message);
  }
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
