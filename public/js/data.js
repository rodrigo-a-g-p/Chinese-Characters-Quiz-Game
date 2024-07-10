import { getData } from "./helperFunctions.js";

export const allData = {
  HSK1: await getData("csv-data/HSK1"),
  HSK2: await getData("csv-data/HSK2"),
  HSK3: await getData("csv-data/HSK3"),
  HSK4: await getData("csv-data/HSK4"),
  HSK5: await getData("csv-data/HSK5"),
  ALL: await getData("csv-data/ALL"),
};

export const assetsInfoArray = [
  {
    type: "image",
    array: await getData("/assets/images"),
  },

  {
    type: "audio",
    array: await getData("/assets/audio"),
  },
];
