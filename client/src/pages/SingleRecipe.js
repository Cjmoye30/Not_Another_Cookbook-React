import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_RECIPE } from '../utils/queries';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import '../styles/SingleRecipe.css'

const SingleRecipe = () => {

    const { recipeId } = useParams();
    console.log("RecipeId from params: ", recipeId);

    const { loading, data, error } = useQuery(GET_RECIPE,
        { variables: { recipeId: recipeId } })

    const recipeData = data?.getRecipe || {}
    console.log(recipeData);

    const ingredients = recipeData.ingredients
    const measure = recipeData.measure
    const instructions = recipeData.instructions


    if (loading) {
        return <>Loading...</>
    }

    return (
        <>
            <div className='headerWrapper'>
                <h1>{recipeData.name}</h1>
                <img
                    src={recipeData.image}
                    className='headerImg'
                />
            </div>

            <div className='ingAndMeasureWrapper'>
                <div className='ingRow'>

                    {/* Here we can just map through one of the arrays, and then use the index to access the same index in the measure array - since we already pulled that in our variable above */}
                    {ingredients.map((ingredient, index) => (
                        <p> {ingredient} - {measure[index]} </p>
                    ))}
                </div>
            </div>

            <div className='instructionsWrapper'>
                {instructions.map((instruction) => (
                    <p> {instruction} </p>
                ))}
            </div>

        </>
    )
}

export default SingleRecipe;