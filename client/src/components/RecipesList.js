import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_RECIPES } from '../utils/queries';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const RecipesList = () => {

    // const smallScreen = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    // const cols = smallScreen ? 12 : 3;

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
            <div>
                <ImageList
                    variant='masonry'
                    cols={3}
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
                                <img
                                    key={recipe._id}
                                    className='homeRecipeImage'
                                    src={recipe.image}
                                    loading='lazy'
                                />
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
        </>
    )
}

export default RecipesList;