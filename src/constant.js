export const  GRAPHQL_API = "http://localhost:8000/graphql";
export  const  WORD_QUERY = `
query words{
    words{
        id
        definition   
    }
}
`;
export const ADD_QUERY = `
mutation create($word:String!) {
    create(word:$word) {
        id
    }
  }
`
export const WORD_ALL_FIELD_QUERY = `
query words{
    words{
        id
        definition   
        lexicalCategory
        phrase
        example
        synonym
    }
}
`;
export const GET_WORD_BY_ID = `
query getWord($id:String!){
    getWord(id:$id){
        id
        definition   
        lexicalCategory
        phrase
        example
        synonym
    }
}
`