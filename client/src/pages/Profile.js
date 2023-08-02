import React from 'react';
import Tabs from '../components/Tabs'
import { useQuery } from '@apollo/client';
import { GET_USER, GET_ME } from '../utils/queries';

import { useParams } from 'react-router-dom';

import '../styles/Profile.css'

const Profile = () => {

    // get the ID from params
    const { userId } = useParams();
    console.log("ID from params: ", userId);

    const { loading, data, error } = useQuery(
        userId ? GET_USER : GET_ME,
        { variables: { userId: userId } }
    )

    if(loading) {
        return <div><p>Loading...</p></div>
    }

    if(error) {
        console.log(error)
        return <div><p>Something went wrong...</p></div>
    }

    const user = data?.me || data?.getUser;
    console.log("Data for the user: ", user)

    return (
        <>
            <div className='profileHeader'>
                <img className='profileAvatar' src={user.avatar} /> 

                <div className='profileHeaderText'>
                    <h1> {user.firstName} {user.lastName} </h1>
                    <h2> {user.username} </h2>
                    <h4>Member Since: </h4>
                    <h4>Total Recipes: {user.recipes.length} </h4>
                </div>
            </div>
            <Tabs />
        </>
    )
}

export default Profile;