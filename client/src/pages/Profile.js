import React from 'react';
import Tabs from '../components/Tabs'

import { useQuery } from '@apollo/client';
import { GET_USER, GET_ME } from '../utils/queries';

import Auth from '../utils/auth'
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
            <h1>Welcome, {user.firstName}! </h1>
            <p>This is your profile page where you can view differnt components in the tabs below</p>
            <Tabs />
        </>
    )
}

export default Profile;