import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_RECIPE } from '../utils/queries';
import Box from '@mui/material/Box';
import UpdateRecipe from '../components/UpdateRecipe';
import Modal from '@mui/material/Modal';
import '../styles/SingleRecipe.css'
import Auth from '../utils/auth';
import Grid from '@mui/material/Grid';
import NavIcons from '../components/NavIcons';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { Button, Divider } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    height: '90%'
};

const SingleRecipe = () => {

    if (!Auth.loggedIn()) {
        window.location.assign('/login')
    }

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    // if there is a match, return 12, if not, return 4
    let cols = 3
    if (matches) {
        cols = 1;
    }

    const { recipeId } = useParams();



    const { loading, data, error } = useQuery(GET_RECIPE,
        { variables: { recipeId: recipeId } })

        console.log("Data:", data?.getRecipe.image[0])

    const chefName = data?.getRecipe.chef
    const recipeData = data?.getRecipe || {}
    const ingredients = recipeData.ingredients
    const measure = recipeData.measure
    const instructions = recipeData.instructions
    const images = recipeData.image;

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
                <Box className='headerWrapper'>
                    <div className='headerTitleDesc'>
                        <h1 className='recipeTitle'>{recipeData.name}</h1>
                        <h3 className='recipeDesc'>{recipeData.description}</h3>
                        <p> <em>Created by: {chefName.firstName} {chefName.lastName}</em> </p>

                        <EditIcon className='editIcon' onClick={handleOpen}/>
                    </div>

                    <Grid container className='sectionContainer'>
                        <h2>Ingredients & Measurements</h2>
                        <Grid className='ingAndMeasureContainer' item xs={12}>
                            <Grid sx={{ display: 'flex' }} item xs={12}>
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

                    <Grid container className='sectionContainer'>
                        <h2>Instructions</h2>
                        {instructions.map((instruction, index) => (
                            <Grid container key={index} className='ingAndMeasureContainer'>
                                <Grid className='gridItem' item xs={3}>
                                    <p>{`Step ${index + 1}:`}</p>
                                </Grid>
                                <Grid className='gridItem gridInstruction' item xs={9}>
                                    <p>{instruction}</p>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>

                    <Grid container className='sectionContainer'>
                        <h2>Images</h2>

                        {data?.getRecipe.image[0] === '' ? (
                                <p sx={{width: '100%'}}>No images yet - upload <span className='noRecipeEdit' onClick={handleOpen}>here</span>.</p>
                        ) : (

                        <Grid container className='ingAndMeasureContainer'>
                            {images.map((image, index) => (
                                <Grid key={index} item sm={4} xs={12}>
                                    <div className='imageDiv'>
                                        <img className='recipeImage' src={image} />
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                        )}
                    </Grid>

                </Box>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className='modal-container'
                >
                    <Box
                        className='modal-body'
                        sx={style}
                    >

                        <CloseIcon className='modalCloseIcon' onClick={handleClose} />
                        <UpdateRecipe />

                    </Box>
                </Modal>
            </Box >
        </>
    )
}

export default SingleRecipe;