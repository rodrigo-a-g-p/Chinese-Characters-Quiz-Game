import { allData, assetsInfoArray } from "./data.js";

import {
  bodyElement,
  gameContainer,
  hanziContainer,
  pinyinContainer,
  levelButtons,
  numberCompletedElement,
  numberTotalElement,
  btnAudio,
  timeEl,
} from "./htmlElements.js";

import {
  createButton,
  shuffleElements,
  renderNewAsset,
  renderTimer,
} from "./helperFunctions.js";

let allPairs = [];
let currentDataPair = [];
let currentButtonPair = [];

let allWordButtons;
let lastButtonToBeClicked;

let lastBackgroundImage;
let lastAudioPlayed;

let countTime;

const resetInterface = () => {
  timeEl.innerHTML = "00:00:00";

  assetsInfoArray.forEach((el) =>
    changeAsset({
      assetType: el["type"],
      assetArray: el["array"],
      htmlElement: bodyElement,
      playAudio: true,
    })
  );

  const textInstruction = document.querySelector(".text--instruction");
  if (textInstruction) {
    textInstruction.parentNode.removeChild(textInstruction);
  }
  btnAudio.innerHTML = "pause audio";
  gameContainer.classList.remove("hide-element");
};

const resetNumbers = (allPairsArray) => {
  numberTotalElement.innerHTML = allPairsArray.length;
  numberCompletedElement.innerHTML = 0;
};

const resetPlayingArrays = () => {
  currentDataPair = [undefined, undefined];
  currentButtonPair = [undefined, undefined];
};

const resetGame = () => {
  if (allWordButtons) {
    allWordButtons.forEach((wordButton) =>
      wordButton.parentNode.removeChild(wordButton)
    );
  }
  allPairs = [];
  resetPlayingArrays();
};

const changeAsset = ({ assetType, assetArray, htmlElement, playAudio }) => {
  const clonedAssetArray = [...assetArray];

  if (assetType === "image") {
    lastBackgroundImage = renderNewAsset({
      assetType,
      assetArray: clonedAssetArray,
      lastUsedAsset: lastBackgroundImage ? lastBackgroundImage : undefined,
      bodyEl: htmlElement,
    });
    return;
  }

  if (assetType === "audio") {
    const dataObject = {
      assetType,
      assetArray: clonedAssetArray,
      playAudio,
    };

    if (lastAudioPlayed) {
      const splitedSrc = lastAudioPlayed.src.split("/");
      dataObject["lastUsedAsset"] = splitedSrc[splitedSrc.length - 1];
      lastAudioPlayed.pause();
    }

    lastAudioPlayed = renderNewAsset(dataObject);

    lastAudioPlayed.onended = () => {
      btnAudio.innerHTML = "play audio";
      const audioObj = assetsInfoArray.find((el) => el["type"] === "audio");
      changeAsset({
        assetType: audioObj["type"],
        assetArray: audioObj["array"],
        playAudio: false,
      });
    };
    return;
  }
};

const startTimer = () => {
  if (countTime) {
    clearInterval(countTime);
  }

  const timer = new Date("1970-01-01T00:00:00");

  countTime = setInterval(() => {
    renderTimer(timer, timeEl);
  }, 1000);
};

btnAudio.addEventListener("click", (event) => {
  event.preventDefault();

  if (lastAudioPlayed) {
    if (lastAudioPlayed.paused) {
      lastAudioPlayed.play();
      btnAudio.innerHTML = "pause audio";
      return;
    }

    if (!lastAudioPlayed.paused) {
      lastAudioPlayed.pause();
      btnAudio.innerHTML = "play audio";
      return;
    }
  }
});

levelButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    resetInterface();
    resetGame();

    allData[event.target.innerHTML].forEach((pair) => {
      createButton(pair[0], ["btn--word", "hanzi-button"], hanziContainer);
      createButton(pair[1], ["btn--word", "pinyin-button"], pinyinContainer);
      allPairs.push(JSON.stringify(pair));
    });

    resetNumbers(allPairs);
    shuffleElements(hanziContainer);
    allWordButtons = document.querySelectorAll(".btn--word");
    startTimer();
  });
});

document.addEventListener("click", (event) => {
  event.preventDefault();

  if (event.target.classList.contains("btn--word")) {
    if (lastButtonToBeClicked) {
      lastButtonToBeClicked.classList.remove("btn--clicked");
    }

    lastButtonToBeClicked = event.target;

    if (event.target.classList.contains("hanzi-button")) {
      currentDataPair[0] = event.target.innerHTML;
      currentButtonPair[0] = event.target;
    }

    if (event.target.classList.contains("pinyin-button")) {
      currentDataPair[1] = event.target.innerHTML;
      currentButtonPair[1] = event.target;
    }

    // Had to use JSON.stringify() because this is the onlye way the .includes() method works if the item of an array is also an array
    const currentPairStringified = JSON.stringify(currentDataPair);

    if (allPairs.includes(currentPairStringified)) {
      allPairs.splice(allPairs.indexOf(currentPairStringified), 1);

      currentButtonPair.forEach((btn) => {
        btn.classList.add("btn--correct");
      });

      numberCompletedElement.innerHTML =
        Number(numberTotalElement.innerHTML) - allPairs.length;

      resetPlayingArrays();

      if (allPairs.length === 0) {
        clearInterval(countTime);
      }
      return;
    }

    // if code has reached here, it's because currentDataPair is not included in allPairs and does not include undefined elements, so currentDataPair is wrong
    if (!currentDataPair.includes(undefined)) {
      currentButtonPair.forEach((btn) => {
        btn.style.backgroundColor = "rgb(201, 119, 128)";
        setTimeout(() => {
          btn.style.backgroundColor = "#fff";
        }, 500);
      });

      resetPlayingArrays();
      return;
    }

    // if code has reached here, it's because the currentDataPair still has undefined elements
    event.target.classList.add("btn--clicked");
  }
});
