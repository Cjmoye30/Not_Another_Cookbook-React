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
import { Divider } from '@mui/material';
import Chip from '@mui/material/Chip';
import moment from 'moment'

const ProfilesList = () => {
    const { loading, data } = useQuery(GET_ALL_USERS);
    const users = data?.getAllUsers || [];
    console.log("GET ALL USERS Data: ", users)

    if (loading) {
        return <p>Loading...</p>
    }

    // date a profile was created
    const userCreated = moment.unix(users.dateCreated / 1000).format("MMM Do YYYY")

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid
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
                                <Grid
                                    item
                                    sm={4}
                                    xs={12}
                                >
                                    <Card
                                        className='profileCard'
                                        sx={{ backgroundColor: 'var(--a1)', color: 'var(--a3)', borderRadius: '10px' }}
                                    >
                                        <CardMedia
                                            component='img'
                                            aspectRatio='16/9'
                                            image={user.avatar}
                                            title={user.username}
                                            className='cardMedia'
                                        />
                                        <CardContent>

                                            <Typography className="profileCardSection" gutterBottom variant="h4" component="div">
                                                {user.username}
                                            </Typography>
                                            <em>{user.firstName} {user.lastName}</em>

                                            <Divider
                                                textAlign='left'
                                                sx={{
                                                    "&::before, &::after": {
                                                        borderColor: "var(--a3)",
                                                    },
                                                }}>
                                                <Chip label='Bio' sx={{ backgroundColor: 'var(--a3)' }}></Chip>
                                            </Divider>

                                            {user.userBio === null ? (
                                                <Typography className="profileCardSection" gutterBottom component='div'>
                                                    <div className='homeUserBio'><small><em>No bio yet</em></small></div>
                                                </Typography>
                                            ) : (

                                                <Typography className="profileCardSection" gutterBottom component='div'>
                                                    <div className='homeUserBio'>
                                                        {user.userBio}
                                                    </div>
                                                </Typography>

                                            )}

                                            <Divider
                                                textAlign='right'
                                                sx={{
                                                    "&::before, &::after": {
                                                        borderColor: "var(--a3)",
                                                    },
                                                }}>
                                                <Chip label='Metrics' sx={{ backgroundColor: 'var(--a3)' }}></Chip>
                                            </Divider>

                                            <Typography className="profileCardSection" gutterBottom component='div'>
                                                <div className='bioMetrics'>
                                                    <p>Member Since: {moment.unix(user.dateCreated / 1000).format("MMM Do, YYYY")}</p>
                                                    <p>Recipes: {user.recipes.length}</p>
                                                    <p>Signature Recipe: </p>
                                                    <p>Favorite cuisine: </p>
                                                </div>
                                            </Typography>

                                            <Divider
                                                textAlign='left'
                                                sx={{
                                                    "&::before, &::after": {
                                                        borderColor: "var(--a3)",
                                                    },
                                                }}>
                                                <Chip label='Socials' sx={{ backgroundColor: 'var(--a3)' }}></Chip>
                                            </Divider>

                                        </CardContent>
                                        <CardActions>

                                            <Button

                                                size="small"
                                                sx={{ color: 'white' }}
                                            >View Profile
                                            </Button>

                                            <Button

                                                size="small"
                                                sx={{ color: 'white' }}
                                            >Media Option 1
                                            </Button>
                                            <Button

                                                size="small"
                                                sx={{ color: 'white' }}
                                            >Media Option 2
                                            </Button>

                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))
                        )}
                </Grid>
            </Box>
        </>
    )
}

export default ProfilesList;