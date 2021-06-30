import axios from "axios";
import { ADD_QUERY, WORD_QUERY, GRAPHQL_API } from "../constant";


export default {
  listWords() {
    return axios.post(GRAPHQL_API, {
      query: WORD_QUERY,
    });
  },
  addWord(id){
    return axios.post(GRAPHQL_API, {
        query: ADD_QUERY,
        variables: {
          word: id
        },
        
          headers: {
            'Content-Type': 'application/json'
          }
        })
  }
};
