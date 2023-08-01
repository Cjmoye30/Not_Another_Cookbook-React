import * as React from 'react';
import TextField from '@mui/material/TextField';
import { TextareaAutosize } from '@mui/material';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../utils/mutations';
import Auth from '../utils/auth';
import { useRef } from 'react';
import '../styles/CreateRecipe.css'

import { IKImage, IKContext, IKUpload } from 'imagekitio-react';
const publicKey = 'public_HCJZE+YwKYecvofGGZ+jCfHG1yw=';
const urlEndpoint = 'https://ik.imagekit.io/ofawn8dpgq';
const authenticationEndpoint = 'http://localhost:3001/auth';

// update the folder to whatever is needed
const folderDestination = '/react-cookbook-food-pics';

const CreateRecipe = () => {

    const [addRecipe] = useMutation(ADD_RECIPE)

    const [nameDesc, setNameDesc] = useState(
        {
            name: '',
            description: '',
        }
    )

    const [formInstructions, setFormInstructions] = useState(
        [
            { instruction: '' },
            { instruction: '' },
            { instruction: '' }
        ]
    )

    const handleChange = (event) => {
        const { name, value } = event.target;

        setNameDesc({
            ...nameDesc,
            [name]: value,
        });
    };

    const [inputFields, setInputFields] = useState([
        { ingredient: '', measure: '' },
        { ingredient: '', measure: '' },
        { ingredient: '', measure: '' },
        { ingredient: '', measure: '' },
        { ingredient: '', measure: '' },
    ])

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const handleInstructionChange = (index, event) => {
        let data = [...formInstructions];
        data[index][event.target.name] = event.target.value;
        setFormInstructions(data);
    }

    const addField = () => {
        let newField = { ingredient: '', measure: '' };
        setInputFields([...inputFields, newField])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        // filter out blank values
        const ingredeints = inputFields.map((x) => x.ingredient);
        const measurement = inputFields.map((x) => x.measure);
        
        console.log("Recipe Name: ", nameDesc.name)
        console.log("Recipe Description: ", nameDesc.description)
        console.log("Ingredients Array: ", ingredeints);
        console.log("Measurement Array: ", measurement);
        console.log("Instructions Array: ", formInstructions);

        try {

            const {data} = await addRecipe({
                variables: {
                    chef: Auth.getProfile().data._id,
                    name: nameDesc.name,
                    description: nameDesc.description,
                    ingredeint: ingredeints,
                    measure: measurement,
                    instructions: formInstructions
                }
            })

            console.log(data)

        } catch (err) {
            console.log("ERROR. Recipe not created: ", err)
        }
    }

    return (
        <>
            <h1>Create Recipe Page</h1>

            <React.Fragment>
                <form>

                    <TextField
                        name='name'
                        label="Recipe Name"
                        placeholder='Chicken Parm'
                        fullWidth
                        onChange={handleChange}
                        className='nameField'
                        sx={{mb: 3}}
                    />

                    <TextField
                        name='description'
                        label="Recipe Description"
                        fullWidth
                        onChange={handleChange}
                        className='descriptionField'
                        sx={{mb: 3}}
                    />

                    <h3>Ingredients & Measurements:</h3>
                    <List>

                        {inputFields.map((input, index) => {
                            return (
                                <div className='recipeGroup' key={index}>
                                    <ListItem>
                                        <TextField
                                            name='ingredient'
                                            label='Ingredient'
                                            sx={{ mb: 1 }}
                                            value={input.ingredient}
                                            onChange={event => handleFormChange(index, event)}
                                            className='ingredientField'
                                        />
                                        <TextField
                                            name='measure'
                                            label='Measure'
                                            sx={{ mb: 1 }}
                                            value={input.measure}
                                            onChange={event => handleFormChange(index, event)}
                                            className='measureField'
                                        />
                                    </ListItem>
                                </div>
                            )
                        })}
                    </List>

                    <div className='addFieldsGroup'>
                        <Button variant='outlined' onClick={addField}>Add 1x Field</Button>
                    </div>

                    <h3>Instructions:</h3>

{/* change the height of the textboxes */}
{/* add back in the hover and focus CSS effects for the textboxes - those look super cool */}
                    <List>
                        {formInstructions.map((input, index) => {
                            return (
                                <div>
                                    <ListItem>
                                        <TextareaAutosize
                                            className='instructionField'
                                            name='instruction'
                                            value={input.instruction}
                                            onChange={event => handleInstructionChange(index, event)}
                                        />
                                    </ListItem>
                                </div>
                            )
                        })}
                    </List>

                </form>

                <Button onClick={handleSubmit} variant='outlined'>Submit</Button>

            </React.Fragment>
        </>
    )

}

export default CreateRecipe;