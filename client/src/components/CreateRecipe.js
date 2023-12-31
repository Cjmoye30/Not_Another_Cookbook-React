import * as React from 'react';
import TextField from '@mui/material/TextField';
import { TextareaAutosize } from '@mui/material';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../utils/mutations';
import { useRef } from 'react';
import '../styles/CreateRecipe.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IKContext, IKUpload } from 'imagekitio-react';
import Grid from '@mui/material/Grid';

const publicKey = 'public_HCJZE+YwKYecvofGGZ+jCfHG1yw=';
const urlEndpoint = 'https://ik.imagekit.io/ofawn8dpgq';
const isProduction = process.env.NODE_ENV === 'production';
const authenticationEndpoint = isProduction
    ? 'https://sleepy-beach-12267-a5c989dbbda6.herokuapp.com/auth'
    : 'http://localhost:3000/auth';

// update the folder to whatever is needed
const folderDestination = '/react-cookbook-food-pics';

const theme = createTheme({
    components: {
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    '&:before': {
                        borderBottom: '3px solid var(--a4)',
                    },
                    '&:hover:not(.Mui-disabled, .Mui-error):before': {
                        borderBottom: '3px solid var(--a4)',
                    },
                    '&.Mui-focused:after': {
                        borderBottom: '3px solid var(--a4)',
                    },
                },
            }
        },

        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: 'var(--a1)'
                },
            }
        },

        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        "color": "var(--a1)"
                    }
                }
            }
        },


    }
})

const CreateRecipe = () => {

    const [addRecipe] = useMutation(ADD_RECIPE)

    // hook for name and description
    const [nameDesc, setNameDesc] = useState(
        {
            name: '',
            description: '',
            imageURL: '',
            imagePreview: ''
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
            ...nameDesc,
            imageURL: res.url,
            imagePreview: res.url
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

    const addInstructionField = (e) => {
        e.preventDefault();
        setFormInstructions((prevFormInstructions) => {
            let newField = { instruction: '' };
            return [...prevFormInstructions, newField]
        })
    }

    const addField = (e) => {
        e.preventDefault();

        /*
        setInputFields = function we defined above with useState
        prevInputFields = parameter for the setInputFields function which will represent the previous state of the inputFields. It will hold all of the previous values of inputFields.
        we then define a newField with the ingredient and measure we're needing
        we are then returning an array with all of the previous fields we had (using the spread operator keeps all of the previously stored values) and then adding in the new fields we created
        */
        setInputFields((prevInputFields) => {
            let newField = { ingredient: '', measure: '' };
            return [...prevInputFields, newField];
        });
    };


    // executing the addField function 5x
    const add5Field = (e) => {

        for (let i = 0; i < 5; i++) {
            addField(e);
        }
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

            // console.log(data)

            // on success - redirect back to the profile page where you can see your recipe uploaded
            window.location.assign('/me');

        } catch (err) {
            console.log("ERROR. Recipe not created: ", err)
        }
    }

    return (
        <>
            <React.Fragment>
                <form className='createRecipeForm'>
                    <ThemeProvider theme={theme}>
                        <div className='titleAndDescription formSection'>
                            <h3>Title & Description</h3>
                            <TextField
                                name='name'
                                label="Recipe Name"
                                placeholder='Chicken Parm'
                                onChange={handleChange}
                                className='nameField'
                                sx={{ mb: 3 }}
                                fullWidth
                                variant='filled'
                            />

                            <TextField
                                name='description'
                                label="Recipe Description"
                                onChange={handleChange}
                                className='descriptionField'
                                sx={{ mb: 3 }}
                                fullWidth
                                variant='filled'
                            />
                        </div>

                        <hr />

                        <div className='ingredientsAndMeasure formSection'>
                            <h3>Ingredients & Measurements:</h3>
                            <List className='recipeGroup'>
                                {inputFields.map((input, index) => {
                                    return (
                                        <Grid container className='ingAndMeasureRow' key={index}>
                                            <Grid item sm={7} xs={12}>
                                                <TextField
                                                    name='ingredient'
                                                    label='Ingredient'
                                                    sx={{ m: 1, width: '90%' }}
                                                    value={input.ingredient}
                                                    onChange={event => handleFormChange(index, event)}
                                                    className='ingredientField'
                                                    variant='filled'
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item sm={5} xs={12}>
                                                <TextField
                                                    name='measure'
                                                    label='Measure'
                                                    sx={{ m: 1, width: '90%' }}
                                                    value={input.measure}
                                                    onChange={event => handleFormChange(index, event)}
                                                    className='measureField'
                                                    variant='filled'
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    )
                                })}
                            </List>

                            <div className='addFieldsGroup'>
                                <button className='button3' onClick={addField}>Add 1x Field</button>
                                <button className='button3' onClick={add5Field}>Add 5x Field</button>
                            </div>

                        </div>

                        <hr />

                        <div className='instructionsWrapper formSection'>
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
                                                    minRows={3}
                                                    value={input.instruction}
                                                    onChange={event => handleInstructionChange(index, event)}

                                                />
                                            </ListItem>
                                        </div>
                                    )
                                })}
                            </List>
                            <button className='button3' onClick={addInstructionField}>Add 1x Field</button>
                        </div>

                        <div className='formSection'>
                            <h3>Image Upload</h3>
                            <IKContext
                                publicKey={publicKey}
                                urlEndpoint={urlEndpoint}
                                authenticationEndpoint={authenticationEndpoint}
                            >
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
                            </IKContext>

                            {nameDesc.imagePreview !== '' ? (
                                <div>
                                    <p>Preview:</p>
                                    <div>
                                        <img src={nameDesc.imagePreview} className='imagePreview' />
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}

                        </div>

                        <button onClick={handleSubmit} className='button1 createRecipeSubmit'>Submit</button>
                    </ThemeProvider>
                </form>
            </React.Fragment>
        </>
    )
}

export default CreateRecipe;