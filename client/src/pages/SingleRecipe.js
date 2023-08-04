import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_RECIPE } from '../utils/queries';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UpdateRecipe from '../components/UpdateRecipe';
import Modal from '@mui/material/Modal';
import '../styles/SingleRecipe.css'
import { useMutation } from '@apollo/client';
import { DELETE_RECIPE } from '../utils/mutations';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



const SingleRecipe = () => {
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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                <div >

                    {/* Here we can just map through one of the arrays, and then use the index to access the same index in the measure array - since we already pulled that in our variable above */}
                    {ingredients.map((ingredient, index) => (
                        <div className='ingRow' key={`ingRow${index}`}>
                            <p key={`ing${index}`}>{ingredient}</p>
                            <p key={`mea${index}`}>{measure[index]}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='instructionsWrapper'>
                {instructions.map((instruction, index) => (
                    <p key={`inst${index}`}> {instruction} </p>
                ))}
            </div>

            <div className='recipeEditbuttons'>
                <Button variant='outlined' onClick={handleOpen}>Edit</Button>
                <Button variant='contained' color='error' onClick={deleteRecipe}>DELETE</Button>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <UpdateRecipe />

                </Box>
            </Modal>

        </>
    )
}

export default SingleRecipe;