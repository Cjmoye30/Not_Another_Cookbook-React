import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Auth from '../utils/auth'

// get the current user just to get all of their images
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';

const Images = () => {

    const userId = Auth.getProfile().data._id;
    console.log("show images for this user: ", userId);

    const { loading, data, error } = useQuery(GET_USER, { variables: { userId } });
    const userData = data?.getUser;
    console.log(userData);

    if (loading) {
        return <div><p>Loading...</p></div>
    }

    if (error) {
        console.log(error)
        return <div><p>Something went wrong...</p></div>
    }

    return (
        <>
            <h1>Your uploaded images:</h1>
            <div>
                <ImageList variant='woven' cols={3} gap={8}>
                    {userData.images.map((image) => (
                        <ImageListItem key={image}>
                            <img 
                            className='userImage' 
                            src={image}
                            loading='lazy' 
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </>
    )
}

export default Images;