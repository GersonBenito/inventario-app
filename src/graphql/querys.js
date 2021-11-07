import { gql }from '@apollo/client';

export const GET_CATEGORIAS = gql`
    {
        categorias {
        _id
        nombre
        color
        }
    }
`

export const ADD_CATEGORIA = gql`
    mutation ($post: PostCategoria!) {
        addCategoria(post: $post) {
        status
        message
        }
    }
`

export const DELETE_CATEGORIA = gql`
    mutation($id: ID!){
        deleteCategoria(_id: $id) {
        status
        message
        }
    }
`

export const UPDATE_CATEGORIA = gql`
    mutation($id: ID!, $data: PostCategoria!){
        updateCategoria(_id: $id, data: $data) {
            status
            message
        }
    }
`