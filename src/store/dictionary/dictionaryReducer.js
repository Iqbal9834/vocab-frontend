import { ADD_ALL_WORDS, FETCH_SINGLE_WORD } from './dictionaryTypes';

let initialState = {
    allWords: null,
    word: null
};

const dictionaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ALL_WORDS:
            return {
                ...state,
                allWords: action.payload,
            };
        case FETCH_SINGLE_WORD:
            return {
                ...state,
                word: action.payload
            }
        default:
            return state;
    }
};

export default dictionaryReducer;
