import * as React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import Auth from '../utils/auth';
import TextField from '@mui/material/TextField';
import { useMutation } from '@apollo/client';
import { useRef } from 'react';
import { UPDATE_PROFILE } from '../utils/mutations';
import { IKContext, IKUpload } from 'imagekitio-react';
const publicKey = 'public_HCJZE+YwKYecvofGGZ+jCfHG1yw=';
const urlEndpoint = 'https://ik.imagekit.io/ofawn8dpgq';
const isProduction = process.env.NODE_ENV === 'production';
const authenticationEndpoint = isProduction
    ? 'https://sleepy-beach-12267-a5c989dbbda6.herokuapp.com/auth'
    : 'http://localhost:3000/auth';
const folderDestination = '/react-cookbook-avatars';


const UpdateProfile = () => {

    const userId = Auth.getProfile().data._id
    const { loading, data, error } = useQuery(
        GET_USER, { variables: { userId: userId } }
    )

    const userData = data.getUser;

    const [updateProfile] = useMutation(UPDATE_PROFILE);

    const [formData, setFormData] = useState({
        username: userData.username,
        email: userData.email,
        avatar: userData.avatar
    })

    // console.log("initial state: ", formData);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const onSuccess = res => {
        console.log("new avatar URL: ", res.url);
        const updatedFormData = {
            ...formData,
            avatar: res.url
        };

        console.log("new avatar URL", updatedFormData)
        setFormData(updatedFormData);
        console.log(updatedFormData.avatar)
        // console.log("new data with updated avatarURL", updatedFormData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Is the avatar updated?: ", formData);

        // run the update profile mutation will all of the new data
        try {
            const { data } = await updateProfile({
                variables: {
                    userId: userId,
                    username: formData.username,
                    email: formData.email,
                    avatar: formData.avatar
                }
            })

            console.log(data);
            console.log("SUCCESS! Profile Updated.");
            window.location.assign('/me');

        } catch (err) {
            console.log("Frontend error updating profile: ", err)
        }

    }

    const inputRefTest = useRef(null);
    const ikUploadRefTest = useRef(null);

    if (loading) {
        return <>Loading</>
    }

    if (error) {
        console.log(error)
        return <>ERROR</>
    }

    return (
        <>
            <h1>Update Profile</h1>

            <hr />

            <React.Fragment>
                <form className='updateProfileModal' onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        variant='filled'
                        label='First Name'
                        value={userData.firstName}
                        sx={{ mb: 2 }}
                        disabled
                    />
                    <TextField
                        fullWidth
                        variant='filled'
                        label='Last Name'
                        value={userData.lastName}
                        sx={{ mb: 2 }}
                        disabled
                    />
                    <TextField
                        label='Username'
                        name='username'
                        fullWidth
                        variant='filled'
                        value={formData.username}
                        sx={{ mb: 2 }}
                        onChange={handleChange}
                    />
                    <TextField
                        label='Email'
                        name='email'
                        fullWidth
                        variant='filled'
                        value={formData.email}
                        sx={{ mb: 2 }}
                        onChange={handleChange}
                    />

                    <div className='modalSection'>

                        <h2>Upload New Avatar:</h2>

                        <IKContext
                            publicKey={publicKey}
                            urlEndpoint={urlEndpoint}
                            authenticationEndpoint={authenticationEndpoint}
                        >
                            <IKUpload
                                className='uploadImage'
                                fileName="test-upload.png"
                                useUniqueFileName={true}
                                folder={folderDestination}
                                inputRef={inputRefTest}
                                ref={ikUploadRefTest}
                                onSuccess={onSuccess}
                            // style={{ display: 'none' }}
                            />

                            {/* {inputRefTest && <button className='customUploadButton button1' onClick={() => inputRefTest.current.click()}>Upload</button>} */}
                        </IKContext>
                    </div>

                    <hr />


                </form>

                <button className='button1' onClick={handleSubmit}>Update!</button>
                <button className='button2'>Delete Profile</button>
            </React.Fragment>
        </>
    )
}

export default UpdateProfile;