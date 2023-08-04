import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_RECIPES } from '../utils/queries';

const RecipesList = () => {

    const { loading, data } = useQuery(GET_ALL_RECIPES);
    const recipesData = data?.getAllRecipes || {}
    console.log(recipesData)

    if(loading) {
        return <><h1>Loading...</h1></>
    }

    if(recipesData.length === 0) {
        return<><h1>No recipes yet :( </h1></>
    }

    return (
        <>
            <div>
                
            </div>
        </>
    )
}

export default RecipesList;