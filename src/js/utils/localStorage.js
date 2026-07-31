// import { removeDubles } from "../main";
// import { showErrorNotification, showNotification } from "./notificationCalling";

import { removeDubles } from "../utils";

let storedInLS = {};

export function getFromLS(key) {
  // return localStorage.getItem(key);
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    throw error;
  }
}
export function removeFromLS(newValue, key) {
  try {
    const currentStorage = getFromLS(key);

    let resArr = !!currentStorage
      ? currentStorage.filter((item) => item !== newValue)
      : currentStorage;
    // can here be a bug, if !!currentStorage is falsy value?
    // console.log(resArr);

    const sterializedValue = JSON.stringify(resArr);
    localStorage.setItem(key, sterializedValue);
  } catch (error) {
    throw error;
  }
}

export function saveToLS(value, key) {
  try {
    let currentStorageArray = getFromLS(key);
    const newValue = Number(value);
    let sterializedValue;
    if (!currentStorageArray) {
      // if key is missing in LS or value null
      sterializedValue = JSON.stringify([newValue]);
      localStorage.setItem(key, sterializedValue);
      return;
    }

    currentStorageArray.push(newValue);
    sterializedValue = JSON.stringify(removeDubles(currentStorageArray));
    //sterialized and filtered from doubles*
    localStorage.setItem(key, sterializedValue);
  } catch (error) {
    throw error;
  }
}

export function toggleValueFromLSKey(value, key) {
  let currentStorageArray = getFromLS(key);
  const newValue = Number(value);
  let sterializedValue;

  if (!currentStorageArray) {
    sterializedValue = JSON.stringify([newValue]);
  } else {
    currentStorageArray.push(newValue);
    sterializedValue = JSON.stringify(removeDubles(currentStorageArray));
  }

  // decide if remove or add to/from LS
  if (isRecordStoredInLS(newValue, key)) {
    removeFromLS(newValue, key);
    console.log(newValue, " removed from LS");
    // showErrorNotification("Ви видалили фільм " + "..." + "готуйте попку");
  }
  if (!storedInLS[key]) {
    localStorage.setItem(key, sterializedValue);
    console.log(newValue, " added to LS");

    // showNotification("Ви додали фільм " + "..." + "до бібліотеки");
  }
}

export function isRecordStoredInLS(value, key) {
  try {
    const array = JSON.parse(localStorage.getItem(key));

    if (!!array) {
      storedInLS[key] = array.includes(Number(value));
      return storedInLS[key];
    } else {
      storedInLS[key] = false;
      return storedInLS[key];
    }
  } catch (error) {
    throw error;
  }
}

export function rewriteKeyCompletelyInLS(key, newValue) {
  try {
    const sterializedValue = JSON.stringify(newValue);
    localStorage.setItem(key, sterializedValue);
  } catch (error) {
    throw error;
  }
}

// load ids from LS
// count pages, make arrays with pages lists
// export function setSavedToStorageFromLS(filterValue, libraryStorage) {
//   let total_results;
//   let total_pages;
//   const resArr = [];

//   try {
//     const array = getFromLS(filterValue);
//     const perPage = libraryStorage[filterValue].perPage;
//     const parsedArray = JSON.parse(array);
//     if (!parsedArray) return;
//     total_results = parsedArray.length;
//     total_pages = Math.ceil(total_results / perPage);

//     for (let i = 1; i <= total_pages; i += 1) {
//       resArr.push(parsedArray.slice((i - 1) * perPage, i * perPage));
//     }

//     libraryStorage[filterValue].pages_ids_array = resArr;
//     libraryStorage[filterValue].total_pages = total_pages;
//     libraryStorage[filterValue].total_results = total_results;
//   } catch (e) {
//     throw e;
//   }
// }
