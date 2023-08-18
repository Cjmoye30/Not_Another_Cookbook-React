import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../utils/queries';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
                    container
                    className='gridContainer'
                >

                    {users.length === 0 ?
                        (
                            <p>No users in the database yet</p>
                        )
                        :
                        (
                            users.map((user) => (
                                <div
                                    className='gridWrapper'
                                >
                                    <Card
                                    sx={{ minWidth: 345 }}
                                    className='profileCard'
                                    >
                                        <CardMedia
                                            sx={{ height: 400 }}
                                            image={user.avatar}
                                            title={user.username}
                                            className='cardMedia'
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {user.username}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                User bio - coming soon
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button disabled size="small">View Profile</Button>
                                            {/* <Button disabled size="small">Add Friend</Button> */}
                                        </CardActions>
                                    </Card>
                                </div>
                            ))
                        )}
                </Grid>
            </Box>
        </>
    )
}

export default ProfilesList;

/* <Grid
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
</Grid> */