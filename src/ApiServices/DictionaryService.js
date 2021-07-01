import axios from "axios";
import { ADD_QUERY, WORD_QUERY, WORD_ALL_FIELD_QUERY,GET_WORD_BY_ID, GRAPHQL_API } from "../constant";


export default {
  listWords() {
    return axios.post(GRAPHQL_API, {
      query: WORD_QUERY,
    });
  },
  fetchWordFields() {
    return axios.post(GRAPHQL_API, {
      query: WORD_ALL_FIELD_QUERY
    })
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
  },
  getWordById(id){
    return axios.post(GRAPHQL_API, {
      query: GET_WORD_BY_ID,
      variables: {
        id: id
      },
      
        headers: {
          'Content-Type': 'application/json'
        }
      })
  }
};
