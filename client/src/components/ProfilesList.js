import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../utils/queries';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const ProfilesList = () => {
    const { loading, data } = useQuery(GET_ALL_USERS);
    const users = data?.getAllUsers || [];
    console.log("GET ALL USERS Data: ", users)

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid
                    sx={{ p: 1 }}
                    container>

                    {users.length === 0 ?
                        (
                            <p>No users in the database yet</p>
                        )
                        :
                        (
                            users.map((user) => (
                                <Grid
                                    item xs={4}
                                >

                                    <Grid
                                        sx={{ m: 1, border: 1 }}
                                        className='homeUserProfile'
                                    >
                                        <img
                                            className='profileListAvatar'
                                            src={user.avatar}
                                        />
                                        <div>
                                            <h1>{user.username}</h1>
                                            <h3>{user.firstName} {user.lastName}</h3>
                                            <p>{user.email}</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            ))
                        )}
                </Grid>
            </Box>
        </>
    )
}

export default ProfilesList;