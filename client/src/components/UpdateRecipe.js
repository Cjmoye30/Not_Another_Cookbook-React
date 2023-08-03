import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_RECIPE } from '../utils/queries';
import TextField from '@mui/material/TextField';
import { TextareaAutosize } from '@mui/material';


const UpdateRecipe = () => {
    const { recipeId } = useParams();
    console.log("RecipeId from params: ", recipeId);

    const { loading, data, error } = useQuery(GET_RECIPE,
        { variables: { recipeId: recipeId } })

    const recipeData = data?.getRecipe || {}
    console.log(recipeData);

    const [updateData, setUpdateData] = useState({
        name: recipeData.name,
        description: recipeData.description,
        ingredients: recipeData.ingredients,
        measure: recipeData.measure,
        instructions: recipeData.instructions
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUpdateData({
            ...updateData,
            [name]: value,
        });
    };

    return (
        <>
            <React.Fragment>
                <form>

                    <h1>Edit Recipe:</h1>

                    <hr />

                    <h2>Name and Description:</h2>
                    <TextField
                        name='name'
                        value={updateData.name}
                        fullWidth
                        onChange={handleChange}
                        sx={{ m: 1 }}
                    />
                    <TextField
                        name='description'
                        value={updateData.description}
                        fullWidth
                        onChange={handleChange}
                        sx={{ m: 1 }}
                    />

                    <hr />

                    <h2>Ingredients and Measurements:</h2>
                    {/* map out ingredients and measures */}
                    {updateData.ingredients.map((ingredient, index) => (
                        <div className='ingAndMeasure'>
                            <TextField
                                value={ingredient}
                                fullWidth
                                onChange={handleChange}
                                sx={{ m: 1 }}
                            />
                            <TextField
                                value={updateData.measure[index]}
                                fullWidth
                                onChange={handleChange}
                                sx={{ m: 1 }}
                            />
                        </div>
                    ))}

                    <hr />

                    <h2>Instructions:</h2>
                    {updateData.instructions.map((instruction) => (
                        <TextField
                            value={instruction}
                            fullWidth
                            onChange={handleChange}
                            sx={{ m: 1 }}
                        />
                    ))}

                    <hr />

                    <h2>Upload New Image:</h2>
                </form>
            </React.Fragment>

        </>
    )
}

export default UpdateRecipe;