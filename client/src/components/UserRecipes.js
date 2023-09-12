import * as React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import Auth from '../utils/auth';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { DELETE_RECIPE } from '../utils/mutations';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { Switch } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import '../styles/Home.css'

const UserRecipes = () => {

    const [view, setView] = useState(true)

    const handleView = (event) => {
        setView((previousView) => !previousView)
    }

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    // if there is a match, return 12, if not, return 4
    let cols = 3
    if (matches) {
        cols = 1;
    }

    const [deleteRecipeMutation] = useMutation(DELETE_RECIPE)

    const userId = Auth.getProfile().data._id
    const { loading, data, error } = useQuery(
        GET_USER, { variables: { userId: userId } }
    )

    const deleteRecipe = async (recipeId) => {
        console.log(`Delete ${recipeId}`)

        // eventually create some kind of alert/modal/pop-up to double confirm you want to delete a recipe
        try {
            const { data } = await deleteRecipeMutation({
                variables: { recipeId: recipeId }
            })
        } catch (err) {
            console.log("ERROR. Recipe not deleted: ", err)
        }
    }

    if (loading) {
        return <>Loading</>
    }

    if (error) {
        console.log(error)
        return <>ERROR</>
    }

    const userData = data.getUser;
    // console.log(userData)

    if (userData.recipes.length === 0) {
        return <div style={{ color: 'var(--a3)' }}>
            <h1>No recipes created yet </h1>
            <p>Navigate over to the "Create New Recipe" tab to create your first one!</p>
        </div>
    }

    return (
        <Box sx={{ color: 'var(--a3)' }}>

            <div className='recipeListHeader'>
                <h1>Your Recipes:</h1>

                <FormControlLabel
                    className='listToggle'
                    label="List View:"
                    labelPlacement='start'
                    control={<Switch
                        checked={view}
                        onChange={handleView}
                    />}
                />
            </div>

            {view ? (
                <ImageList
                    variant='masonry'
                    cols={cols}
                    gap={20}
                    sx={{ px: 1, py: 3 }}
                    className='recipeListInner'
                >
                    {userData.recipes.map((recipe, index) => (
                        <Link
                            key={index}
                            to={`/singleRecipe/${recipe._id}`}
                        >
                            <ImageListItem
                                key={index}
                                className='homeImageListItem'
                            >
                                {!recipe.image[0] ? (
                                    <img
                                        src='https://ik.imagekit.io/ofawn8dpgq/react-cookbook-food-pics/foodPlaceholder.png?updatedAt=1694519579069'
                                        loading='lazy'
                                    />
                                ) : (
                                    <img
                                        key={recipe._id}
                                        className='homeRecipeImage'
                                        src={recipe.image[0]}
                                        loading='lazy'
                                    />
                                )}
                                <ImageListItemBar
                                    title={recipe.name}
                                    subtitle={recipe.description}
                                    className='homeRecipeInfoBar'
                                />
                            </ImageListItem>
                        </Link>
                    ))}
                </ImageList>

            ) : (
                <>
                <Grid container className='recipeTextListContainer'>
                {userData.recipes.map((recipe, index) => (
                            <Grid item xs={4}>
                                <Grid item xs={12} sx={{p:1}}>
                                    <Link
                                        key={index}
                                        to={`/singleRecipe/${recipe._id}`}
                                    >
                                        <div className='recipeTextList'>
                                            <h3>{recipe.name}</h3>
                                            <p>{recipe.description}</p>
                                        </div>

                                    </Link>
                                </Grid>
                            </Grid>
                        ))}

                </Grid>
                </>
            )}

        </Box>
    )
}

export default UserRecipes;
