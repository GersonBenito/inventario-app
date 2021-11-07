import { useState } from 'react';

export const useForm = ({ initialState = {} }) =>{
    console.log('datos inicales', initialState);

    const [ initial, setInitial ] = useState(initialState);

    const handleInputChange = ({ target }) => {

        const { name, value } = target;

        setInitial({
            ...initial,
            [name]: value
        })

    }


    return [ initial, handleInputChange ];
}
