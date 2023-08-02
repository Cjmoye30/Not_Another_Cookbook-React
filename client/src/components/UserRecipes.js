import * as React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import Auth from '../utils/auth';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from "react-router-dom"
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

const UserRecipes = () => {

    const userId = Auth.getProfile().data._id
    const { loading, data, error } = useQuery(
        GET_USER, { variables: { userId: userId } }
    )

    if (loading) {
        return <>Loading</>
    }

    if (error) {
        console.log(error)
        return <>ERROR</>
    }

    const userData = data.getUser;
    console.log(userData.recipes)

    return (
        <>
            <div>
                <ImageList
                    variant='masonry'
                    cols={3}
                    gap={8}
                >
                    {userData.recipes.map((recipe) => (
                        // pull in the recipeID and then use that as your route
                        <Link to={`/singleRecipe/${recipe._id}`}>
                            <ImageListItem>
                                {recipe.image.map((image) => (
                                    <img
                                        className='recipeImg'
                                        src={image}
                                        loading='lazy'
                                    />
                                ))}
                                <ImageListItemBar
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

export default UserRecipes;

/*
TODO:
Put all images in materialUI image list component
Turn all images into links
Create single recipe page which will be redirected onClick
*/