export const  GRAPHQL_API = "http://localhost:8000/graphql";
export  const  WORD_QUERY = `
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
export const ADD_QUERY = `
mutation create($word:String!) {
    create(word:$word) {
        id
    }
  }
`