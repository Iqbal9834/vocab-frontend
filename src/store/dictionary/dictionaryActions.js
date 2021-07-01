import DictionaryService from "../../ApiServices/DictionaryService";
import {
  ADD_ALL_WORDS,
  ADD_WORD_TO_DICTIONARY,
  FETCH_WORD_ERROR,
  FETCH_SINGLE_WORD,
} from "./dictionaryTypes";

const setAllWords = (payload) => ({
  type: ADD_ALL_WORDS,
  payload,
});
//action called when single user is added
const addSingleWord = (word) => {
  return {
    type: ADD_WORD_TO_DICTIONARY,
    payload: word,
  };
};
//action called when there is an error response
const fetchWordError = (err) => {
  return {
    type: FETCH_WORD_ERROR,
    payload: err,
  };
};
const fetchSingleWordError = (err) => {
  return {
    type: FETCH_WORD_ERROR,
    payload: err,
  };
};

const setSingleWord = (payload) => ({
    type: FETCH_SINGLE_WORD,
    payload
})

export const fetchAllWords = () => {
  return function (dispatch) {
    DictionaryService.listWords()
      .then((response) => {
        if (response && response.status === 200) {
          dispatch(setAllWords(response.data.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
//async function to post word
export const addWord = (word) => {
  return function (dispatch) {
    DictionaryService.addWord(word)
      .then((response) => {
        const { data } = response;
        //dispatch add response
        dispatch(addSingleWord(data));
      })
      .catch((err) => {
        //dispatch error response
        dispatch(fetchWordError(err.message));
      });
  };
};
export const getWord = (word) => {
  return function (dispatch) {
    DictionaryService.getWordById(word)
      .then((response) => {
        const { data } = response;
        //dispatch add response
        dispatch(setSingleWord(data.data.getWord));
      })
      .catch((err) => {
        //dispatch error response
        dispatch(fetchSingleWordError(err.message));
      });
  };
};
