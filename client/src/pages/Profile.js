import React from 'react';
import Tabs from '../components/Tabs'
import { useQuery } from '@apollo/client';
import { GET_USER, GET_ME } from '../utils/queries';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Profile.css'
import { Button, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import UpdateProfile from '../components/UpdateProfile';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};


const Profile = () => {

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    const goForward = () => {
        navigate(1);
    }

    const { userId } = useParams();
    // console.log("ID from params: ", userId);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { loading, data, error } = useQuery(
        userId ? GET_USER : GET_ME,
        { variables: { userId: userId } }
    )

    if (loading) {
        return <div><p>Loading...</p></div>
    }

    if (error) {
        console.log(error)
        return <div><p>Something went wrong...</p></div>
    }

    const user = data?.me || data?.getUser;
    // console.log("Data for the user: ", user);
    // console.log(user.dateCreated);
    const userCreated = moment.unix(user.dateCreated / 1000).format("MMM Do YYYY");
    // console.log(userCreated)

    return (
        <>

            <div className='navIcons'>
                <div onClick={goBack}>
                    <ArrowBackIcon className='navIcon' />
                </div>

                <div onClick={goForward}>
                    <ArrowForwardIcon className='navIcon' />
                </div>
            </div>

            <div className='profileHeader'>
                    <img className='profileAvatar' src={user.avatar} />

                    <div className='profileHeaderText'>

                        <div className='profileEditIcons'>

                            <Button
                                onClick={handleOpen}
                                className='profileEdit'
                            >
                                <EditIcon className='editIcon' />
                            </Button>

                        </div>

                        <h1> {user.firstName} {user.lastName} </h1>

                        <hr />

                        <h3>Username: {user.username} </h3>
                        <h4>Member Since: {userCreated} </h4>
                        <h4>Total Recipes: {user.recipes.length} </h4>
                    </div>

                    <p className='profileUserBio'> {user.userBio} </p>
            </div>

            <Tabs />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='updateRecipeModal'
            >
                <Box
                    className='modal-body'
                    sx={style}
                >
                    <CloseIcon className='modalCloseIcon' onClick={handleClose} />
                    <UpdateProfile />

                </Box>
            </Modal>

        </>
    )
}

export default Profile;