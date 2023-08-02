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

    // hook for name and description
    const [nameDesc, setNameDesc] = useState(
        {
            name: '',
            description: '',
            imageURL: ''
        }
    )

    // hook for instructions
    const [formInstructions, setFormInstructions] = useState(
        [
            { instruction: '' },
            { instruction: '' },
            { instruction: '' }
        ]
    )

    // hook for ingredient and measure
    const [inputFields, setInputFields] = useState([
        { ingredient: '', measure: '' },
        { ingredient: '', measure: '' },
        { ingredient: '', measure: '' },
        { ingredient: '', measure: '' },
        { ingredient: '', measure: '' },
    ])

    const onError = err => {
        console.log("Error", err);
    };

    const onSuccess = res => {
        console.log("Success", res);
        console.log("URL to store in DB: ", res.url);

        /*
        Updating the state of the component
        We are using a spread operator (...nameDesc) to create a "shallow" copy and to preserve the existing values of name and desc.
        We are then specifying and setting the imageURL to the res.url
        */
        
        setNameDesc({
            ...nameDesc, imageURL: res.url
        })

    };

    const onUploadProgress = progress => {
        console.log("Progress", progress);
    };

    const onUploadStart = evt => {
        console.log("Start", evt);
    };

    const inputRefTest = useRef(null);
    const ikUploadRefTest = useRef(null);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setNameDesc({
            ...nameDesc,
            [name]: value,
        });
    };

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

        const ingredients = inputFields.map((x) => x.ingredient);
        const measurement = inputFields.map((x) => x.measure);
        const instructions = formInstructions.map((x) => x.instruction);

        /* 

        Filtering out blank values:
        Firstly - have to make sure we are filtering an of string and NOT an array of objects
        Calling the filter method which is going to create a new array of elements which pass the test that we pass in.
        We then create a callback function to be used in the filter method
        It takes each individual element of the ingredients array, and returns true or fales based on if the condition is satisfied.
        trim - removes any leading or trailing whitespace from the element - which basically eliminates any blank values from every being populated into our array
        If the element is not blank, then it will return true and it will be pushed into our final array.
        
        */

        const filterIngredients = ingredients.filter((ingredient) => ingredient.trim() !== '');
        const filterMeasurement = measurement.filter((measure) => measure.trim() !== '');
        const filterInstructions = instructions.filter((instruction) => instruction.trim() !== '')

        console.log("Recipe Name: ", nameDesc.name)
        console.log("Recipe Description: ", nameDesc.description)
        console.log("Ingredients Array: ", filterIngredients);
        console.log("Measurement Array: ", filterMeasurement);
        console.log("Instructions Array: ", filterInstructions);
        console.log("Image URL: ", nameDesc.imageURL)

        try {

            const { data } = await addRecipe({
                variables: {
                    name: nameDesc.name,
                    description: nameDesc.description,
                    ingredients: filterIngredients,
                    measure: filterMeasurement,
                    instructions: filterInstructions,
                    image: nameDesc.imageURL
                }
            })

            console.log(data)

            // on success - redirect back to the profile page where you can see your recipe uploaded

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
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        name='description'
                        label="Recipe Description"
                        fullWidth
                        onChange={handleChange}
                        className='descriptionField'
                        sx={{ mb: 3 }}
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

                    <h3>Image Upload</h3>
                    <IKContext
                        publicKey={publicKey}
                        urlEndpoint={urlEndpoint}
                        authenticationEndpoint={authenticationEndpoint}
                    >
                        <p>Upload an image</p>
                        <IKUpload
                            fileName="test-upload.png"
                            name='imageURL'
                            onChange={handleChange}
                            onError={onError}
                            onSuccess={onSuccess}
                            useUniqueFileName={true}
                            folder={folderDestination}
                            onUploadStart={onUploadStart}
                            onUploadProgress={onUploadProgress}
                            inputRef={inputRefTest}
                            ref={ikUploadRefTest}
                            // style={{ display: 'none' }}
                        />

                        {/* <p>Custom Upload Button</p> */}
                        {/* {inputRefTest && <button onClick={() => inputRefTest.current.click()}>Upload</button>} */}

                    </IKContext>



                </form>

                <Button onClick={handleSubmit} variant='outlined'>Submit</Button>

            </React.Fragment>
        </>
    )

}

export default CreateRecipe;