import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_RECIPES } from '../utils/queries';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { Switch } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';

const RecipesList = () => {

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

    const { loading, data } = useQuery(GET_ALL_RECIPES);
    const recipesData = data?.getAllRecipes || {}
    console.log(recipesData)

    if (loading) {
        return <><h1>Loading...</h1></>
    }

    if (recipesData.length === 0) {
        return <><h1>No recipes yet :( </h1></>
    }

    return (
        <>
            <div className='recipeListHeader'>
                <h1>Recipes from our users:</h1>

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
                <div className='testWrapper'>
                    <ImageList
                        variant='masonry'
                        cols={cols}
                        gap={20}
                        sx={{ px: 1, py: 3 }}
                        className='recipeListInner'
                    >
                        {recipesData.map((recipe, index) => (
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
                                            className='homeRecipeImage'
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
                                        className='homeRecipeInfoBar'
                                        title={recipe.name}
                                        subtitle={recipe.description}
                                    />
                                </ImageListItem>
                            </Link>
                        ))}
                    </ImageList>
                </div>

            ) : (
                <>
                    <Grid container className='recipeTextListContainer'>
                        {recipesData.map((recipe, index) => (
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
        </>
    )
}

export default RecipesList;