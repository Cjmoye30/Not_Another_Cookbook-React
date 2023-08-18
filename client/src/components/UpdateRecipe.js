import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_RECIPE } from '../utils/queries';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { UPDATE_RECIPE } from '../utils/mutations';
import { useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import { IKContext, IKImage, IKUpload } from 'imagekitio-react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
                        borderBottom: '1px solid var(--a4)',
                    },
                    '&:hover:not(.Mui-disabled, .Mui-error):before': {
                        borderBottom: '1px solid var(--a4)',
                    },
                    '&.Mui-focused:after': {
                        borderBottom: '1px solid var(--a4)',
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

const UpdateRecipe = () => {

    const [updateRecipe] = useMutation(UPDATE_RECIPE)

    const { recipeId } = useParams();

    const { loading, data, error } = useQuery(GET_RECIPE,
        { variables: { recipeId: recipeId } })

    const recipeData = data?.getRecipe || {}
    console.log("RECIPE DATA: ", recipeData);

    const recipeImages = recipeData.image

    const [updateData, setUpdateData] = useState({
        name: recipeData.name,
        description: recipeData.description,
        ingredients: recipeData.ingredients,
        measure: recipeData.measure,
        instructions: recipeData.instructions,
        image: recipeData.image,
        uploadImagePreview: ''
    });

    const onSuccess = res => {
        console.log("New image URL to add to the array of images: ", res.url);
        const updatedImages = [...updateData.image, res.url]

        setUpdateData({
            ...updateData,
            image: updatedImages,
            uploadImagePreview: res.url
        });

        console.log(updateData)
    }

    const handleChange = (event, index, type) => {
        event.preventDefault();
        const { name, value } = event.target;

        /*
        Ingredients, Measures, Images and Instructions are all arrays - which means we have to handle those differently
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
            ingredients: updateIngredients,
            measure: updateMeasure
        })
    }

    const removeInstruction = (index) => {
        const updateInstructions = [...updateData.instructions]
        updateInstructions.splice(index, 1);

        setUpdateData({
            ...updateData,
            instructions: updateInstructions
        })
    }

    const [clickedImage, setClickedImage] = useState({})


    // onClick - give the image clicked an opactiy or something to indicate it is going to be removed
    const removeImage = (index) => {
        const updateImages = [...updateData.image]
        updateImages.splice(index, 1);

        setUpdateData({
            ...updateData,
            image: updateImages
        })

        setClickedImage({ ...clickedImage, [index]: true })
    }

    const saveUpdates = async (e) => {
        e.preventDefault();
        console.log("Updated Data: ", updateData)

        try {
            const { data } = await updateRecipe({
                variables: {
                    recipeId: recipeId,
                    name: updateData.name,
                    description: updateData.description,
                    ingredients: updateData.ingredients,
                    measure: updateData.measure,
                    instructions: updateData.instructions,
                    image: updateData.image
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

    const inputRefTest = useRef(null);
    const ikUploadRefTest = useRef(null);

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

                <form className='updateRecipeModal' onSubmit={saveUpdates}>
                    <ThemeProvider theme={theme}>

                        <h1 className='modalTitle'>Edit Recipe:</h1>

                        <hr />

                        <div className='modalSection'>
                            <h2 className='modalSectionTitle'>Name and Description:</h2>
                            <TextField
                                name='name'
                                value={updateData.name}
                                fullWidth
                                onChange={handleChange}
                                sx={{ mb: 1 }}
                                size='small'
                                variant='filled'
                            />
                            <TextField
                                name='description'
                                value={updateData.description}
                                fullWidth
                                onChange={handleChange}
                                sx={{ mb: 1 }}
                                size='small'
                                variant='filled'
                            />
                        </div>

                        <div className='modalSection'>
                            <h2 className='modalSectionTitle'>Ingredients and Measurements:</h2>
                            {/* map out ingredients and measures */}
                            {updateData.ingredients.map((ingredient, index) => (
                                <div key={`ingMeaRow${index}`} className='ingAndMeasureRow'>
                                    <Grid container>

                                        <Grid item sm={7} xs={12}>
                                            <TextField
                                                value={ingredient}
                                                onChange={(e) => handleChange(e, index, 'ingredients')}
                                                sx={{ mb: 1 }}
                                                fullWidth
                                                key={`ing${index}`}
                                                size='small'
                                                variant='filled'
                                            />
                                        </Grid>

                                        <Grid item sm={4} xs={12}>
                                            <TextField
                                                value={updateData.measure[index]}
                                                onChange={(e) => handleChange(e, index, 'measure')}
                                                sx={{ mb: 1 }}
                                                fullWidth
                                                key={`mea${index}`}
                                                size='small'
                                                variant='filled'
                                            />
                                        </Grid>

                                        <Grid item sm={1} xs={12} className='removeButtonWrapper'>
                                            <button className='button4' onClick={() => removeIngredientsAndMeasure(index)}>Remove</button>
                                        </Grid>
                                    </Grid>
                                </div>
                            ))}

                            <button onClick={addIngredients} className='button3'>Add Field</button>
                        </div>

                        <div className='modalSection'>
                            <h2 className='modalSectionTitle'>Instructions:</h2>
                            {updateData.instructions.map((instruction, index) => (
                                <div key={`instRow${index}`} className='instructionRow'>
                                    <TextField
                                        value={instruction}
                                        fullWidth
                                        onChange={(e) => handleChange(e, index, 'instructions')}
                                        sx={{ m: 1 }}
                                        key={`ins${index}`}
                                        multiline={true}
                                        rows={3}
                                        variant='filled'
                                    />
                                    <button
                                        onClick={() => removeInstruction(index)}
                                        className='button4'
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button onClick={addInstructions} className='button3'>Add Field</button>
                        </div>

                        <div className='modalSection'>
                            <h2 className='modalSectionTitle'>Upload Images:</h2>

                            <IKContext
                                publicKey={publicKey}
                                urlEndpoint={urlEndpoint}
                                authenticationEndpoint={authenticationEndpoint}
                            >
                                <IKUpload
                                    className='uploadImage'
                                    fileName="test-upload.png"
                                    useUniqueFileName={true}
                                    folder={folderDestination}
                                    inputRef={inputRefTest}
                                    ref={ikUploadRefTest}
                                    onSuccess={onSuccess}
                                // style={{ display: 'none' }}
                                />

                                {/* {inputRefTest && <button className='customUploadButton button1' onClick={() => inputRefTest.current.click()}>Upload</button>} */}

                            </IKContext>

                            {updateData.uploadImagePreview !== '' ? (
                                <div>
                                    <p>Preview:</p>
                                    <div>
                                        <img src={updateData.uploadImagePreview} className='imagePreview' />
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}


                        </div>

                        <div className='modalSection'>

                            <h2 className='modalSectionTitle'>Delete Images:</h2>

                            <div className='editImagesWrapper'>
                                {recipeImages.map((image, index) => (

                                    // here we are calling our stateful variable 'clickedImage', and updating the state whenever the deleteIcon/removeImage function is clicked. Within the removeImage function we are updating the state of clickedImage, which gives it a className of 'hidden' that is styled in CSS
                                    <div className={`editImagesWrapper ${clickedImage[index] ? 'hidden' : ''}`}>
                                        <img
                                            className='editImages'
                                            src={image}
                                        />
                                        <DeleteIcon
                                            onClick={() => removeImage(index)}
                                            className='deleteIcon'
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ThemeProvider>
                </form>
                <div className='buttonWrapper'>
                    <button className='button1 modalSubmitButton' onClick={saveUpdates} >Save!</button>
                </div>
            </React.Fragment>
        </>
    )
}

export default UpdateRecipe;