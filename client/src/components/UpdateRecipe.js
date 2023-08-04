import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_RECIPE } from '../utils/queries';
import TextField from '@mui/material/TextField';
import { Button, TextareaAutosize } from '@mui/material';
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { UPDATE_RECIPE } from '../utils/mutations';

const UpdateRecipe = () => {

    const[updateRecipe] = useMutation(UPDATE_RECIPE)

    const { recipeId } = useParams();

    const { loading, data, error } = useQuery(GET_RECIPE,
        { variables: { recipeId: recipeId } })

    const recipeData = data?.getRecipe || {}
    console.log("RECIPE DATA: ", recipeData);

    const [updateData, setUpdateData] = useState({
        name: recipeData.name,
        description: recipeData.description,
        ingredients: recipeData.ingredients,
        measure: recipeData.measure,
        instructions: recipeData.instructions
    });

    const handleChange = (event, index, type) => {
        const { name, value } = event.target;

        /*
        Ingredients, Measures, and Instructions are all arrays - which means we have to handle those differently
        */

        if (type === 'ingredients') {
            const updateIngredients = [...updateData.ingredients]
            updateIngredients[index] = value;

            setUpdateData({
                ...updateData,
                ingredients: updateIngredients
            })
        } else if (type === 'measure') {
            const updateMeasures = [...updateData.measure]
            updateMeasures[index] = value;

            setUpdateData({
                ...updateData,
                measure: updateMeasures
            })
        } else if (type === 'instructions') {
            const updateInstructions = [...updateData.instructions]
            updateInstructions[index] = value;

            setUpdateData({
                ...updateData,
                instructions: updateInstructions
            })
        } else {
            setUpdateData({
                ...updateData,
                [name]: value,
            });
        }
    };

    const addIngredients = () => {
        setUpdateData({
            ...updateData,
            ingredients: [...updateData.ingredients, ''],
            measure: [...updateData.measure, '']
        })
    }

    const addInstructions = () => {
        setUpdateData({
            ...updateData,
            instructions: [...updateData.instructions, '']
        })
    }

    const removeIngredientsAndMeasure = (index) => {
        // we are getting the current state of the data, getting the index, and then removing whichever index we passed in the parameter
        const updateIngredients = [...updateData.ingredients]
        updateIngredients.splice(index, 1);

        const updateMeasure = [...updateData.measure]
        updateMeasure.splice(index, 1);

        setUpdateData({
            ...updateData,
            ingredients: [updateIngredients],
            measure: [updateMeasure]
        })
    }

    const removeInstruction = (index) => {
        const updateInstructions = [...updateData.instructions]
        updateInstructions.splice(index, 1);
    }

    const saveUpdates = async () => {
        console.log("Updated Data: ", updateData)
        
        try {
            const {data} = await updateRecipe({
                variables: {
                    recipeId: recipeId,
                    name: updateData.name,
                    description: updateData.description,
                    ingredients: updateData.ingredients,
                    measure: updateData.measure,
                    instructions: updateData.instructions
                }
            })

            console.log(data)
            console.log("SUCCESS! Recipe Updated.")
            window.location.assign(`/singleRecipe/${recipeId}`)

        } catch (err) {
            console.log("ERROR. Recipe not updated")
            console.log(err)
        }
    }

    if (loading) {
        return <>Loading...</>
    }

    if (error) {
        console.log("ERROR:", error)
        return <>
            Something went wrong...
            Return <Link to='/'>Home</Link>
        </>
    }

    return (
        <>
            <React.Fragment>
                <form className='updateRecipeModal'>

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
                        <div key={`ingMeaRow${index}`} className='ingAndMeasureRow'>
                            <TextField
                                value={ingredient}
                                fullWidth
                                onChange={(e) => handleChange(e, index, 'ingredients')}
                                sx={{ m: 1 }}
                                key={`ing${index}`}
                            />
                            <TextField
                                value={updateData.measure[index]}
                                fullWidth
                                onChange={(e) => handleChange(e, index, 'measure')}
                                sx={{ m: 1 }}
                                key={`mea${index}`}
                            />

                            <Button onClick={() => removeIngredientsAndMeasure(index)}>Remove</Button>
                        </div>
                    ))}

                    <Button onClick={addIngredients} variant='outlined'>Add Field</Button>

                    <hr />

                    <h2>Instructions:</h2>
                    {updateData.instructions.map((instruction, index) => (
                        <div key={`instRow${index}`} className='instructionRow'>
                            <TextField
                                value={instruction}
                                fullWidth
                                onChange={(e) => handleChange(e, index, 'instructions')}
                                sx={{ m: 1 }}
                                key={`ins${index}`}
                            />
                            <Button onClick={() => removeInstruction(index)}>Remove</Button>
                        </div>
                    ))}
                    <Button onClick={addInstructions} variant='outlined'>Add Field</Button>

                    <hr />

                    <h2>Upload New Image:</h2>
                </form>

                <Button onClick={saveUpdates} variant='contained'>Save!</Button>

            </React.Fragment>

        </>
    )
}

export default UpdateRecipe;