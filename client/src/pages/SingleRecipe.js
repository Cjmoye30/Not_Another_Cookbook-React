import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_RECIPE } from '../utils/queries';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import UpdateRecipe from '../components/UpdateRecipe';
import Modal from '@mui/material/Modal';
import '../styles/SingleRecipe.css'
import { useMutation } from '@apollo/client';
import { DELETE_RECIPE } from '../utils/mutations';
import Auth from '../utils/auth';
import Grid from '@mui/material/Grid';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: '80vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const SingleRecipe = () => {

    if (!Auth.loggedIn()) {
        window.location.assign('/login')
    }

    const { recipeId } = useParams();

    const [deleteRecipeMutation] = useMutation(DELETE_RECIPE);

    const deleteRecipe = async () => {
        console.log(`Delete ${recipeId}`)
        try {
            const { data } = await deleteRecipeMutation({
                variables: { recipeId: recipeId }
            })
            window.location.assign('/me')

        } catch (err) {
            console.log("ERROR. Recipe not deleted: ", err)
        }
    }

    const { loading, data, error } = useQuery(GET_RECIPE,
        { variables: { recipeId: recipeId } })

    const recipeData = data?.getRecipe || {}
    const ingredients = recipeData.ingredients
    const measure = recipeData.measure
    const instructions = recipeData.instructions

    const chef = data?.getRecipe.chef._id
    const loggedInUser = Auth.getProfile().data._id

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (loading) {
        return <>Loading...</>
    }

    return (
        <Box>
            <div className='headerWrapper'>
                <h1 className='recipeTitle'>{recipeData.name}</h1>
                <div className='singleRecipeImg'>
                    <img
                        src={recipeData.image}
                        className='headerImg'
                    />
                </div>
            </div>

            <Box className='ingAndMeasureWrapper'>
                <h2 className='sectionTitle'>Ingredients & Measurements</h2>
                <div className='outerWrapper'>
                    <Grid className='ingAndMeasureContainer' container >
                        <Grid className='ingAndMeasureHeader ingHeader' item xs={6}>
                            <h2>Ingredient</h2>
                        </Grid>
                        <Grid className='ingAndMeasureHeader measureHeader' item xs={6}>
                            <h2>Measure</h2>
                        </Grid>

                        {ingredients.map((ingredient, index) => (
                            <Grid container key={index}>
                                <Grid className='ingAndMeasureItem gridIng gridItem' item xs={6}>
                                    <p>{ingredient}</p>
                                </Grid>
                                <Grid className='ingAndMeasureItem gridMeas gridItem' item xs={6}>
                                    <p>{measure[index]}</p>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Box>

            <Box className='instructionsWrapper'>
                <h2 className='sectionTitle instructionTitle'>Instructions</h2>
                <div className='outerWrapper'>
                    <Grid className='instructionsContainer' container>
                        {instructions.map((instruction, index) => (
                            <Grid container key={index}>
                                <Grid className='gridItem' item xs={3}>
                                    <p>{`Step ${index + 1}:`}</p>
                                </Grid>
                                <Grid className='gridItem gridInstruction' item xs={9}>
                                    <p>{instruction}</p>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Box>

            <Box
                sx={{ textAlign: 'center' }}
            >
                <h3>Coming soon:</h3>
                <p>Notes Section</p>
                <p>Recipe inspiration links</p>
                <p>Upload more than 1 image at a time - imagekit.io only allows for 1 image and I have to use multer to upload multiform data</p>

            </Box>

            {loggedInUser === chef ? (
                <div className='recipeEditbuttons'>
                    <Button variant='outlined' onClick={handleOpen}>Edit</Button>
                    <Button variant='contained' color='error' onClick={deleteRecipe}>DELETE</Button>
                </div>
            ) : (
                <></>
            )}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='updateRecipeModal'
            >
                <Box
                    className='modal-body'
                    sx={style}
                >
                    <UpdateRecipe />

                </Box>
            </Modal>

        </Box>
    )
}

export default SingleRecipe;