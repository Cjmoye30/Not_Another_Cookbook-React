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
import Carousel from 'react-material-ui-carousel';
import NavIcons from '../components/NavIcons';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: '90%',
    // height: '80vh',
    bgcolor: 'background.paper',
    border: '1px solid #000',
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
    const images = recipeData.image;

    console.log(images)

    const chef = data?.getRecipe.chef._id
    const loggedInUser = Auth.getProfile().data._id

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (loading) {
        return <>Loading...</>
    }

    return (
        <>

            {/* use the grid to scale it down? */}
            <NavIcons />
            <Box>
                <div className='headerWrapper'>
                    <div className='headerTitleDesc'>
                        <h1 className='recipeTitle'>{recipeData.name}</h1>

                        <hr />

                        <h3 className='recipeDesc'>{recipeData.description}</h3>
                    </div>
                    <div className='testWrapper'>
                        <Carousel className='carousel'>
                            {images.map((image) => (
                                <div className='testDiv'>
                                    <img className='singleRecipeHeroImage' src={image} />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>

                <Box className='ingAndMeasureWrapper'>
                    <h2 className='sectionTitle'>Ingredients & Measurements</h2>
                    <Grid container className='outerWrapper'>
                        <Grid className='ingAndMeasureContainer' item xs={12}>
                            <Grid sx={{display: 'flex'}} item xs={12}>
                                <Grid className='ingAndMeasureHeader ingHeader' item xs={6}>
                                    <h2>Ingredient</h2>
                                </Grid>
                                <Grid className='ingAndMeasureHeader measureHeader' item xs={6}>
                                    <h2>Measure</h2>
                                </Grid>
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
                    </Grid>
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

                {loggedInUser === chef ? (
                    <div className='recipeEditbuttons'>
                        <button className='button1' onClick={handleOpen}>Edit</button>
                        <button className='button2' onClick={deleteRecipe}>DELETE</button>
                    </div>
                ) : (
                    <></>
                )}

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        className='modal-body'
                        sx={style}
                    >
                        <UpdateRecipe />

                    </Box>
                </Modal>
            </Box>
        </>
    )
}

export default SingleRecipe;