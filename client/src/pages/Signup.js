import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { useRef } from 'react';
import { Link } from "react-router-dom"
import '../styles/Signup.css'
import NavIcons from '../components/NavIcons';

import { IKContext, IKUpload } from 'imagekitio-react';
const publicKey = 'public_HCJZE+YwKYecvofGGZ+jCfHG1yw=';
const urlEndpoint = 'https://ik.imagekit.io/ofawn8dpgq';
const isProduction = process.env.NODE_ENV === 'production';
const authenticationEndpoint = isProduction
    ? 'https://sleepy-beach-12267-a5c989dbbda6.herokuapp.com/auth'
    : 'http://localhost:3000/auth';

// update the folder to whatever is needed
const folderDestination = '/react-cookbook-avatars';

const Signup = () => {

    const avatar1 = 'https://ik.imagekit.io/ofawn8dpgq/Project3_Avatars/defaultAvatar1.png?updatedAt=1688305286552';
    const avatar2 = 'https://ik.imagekit.io/ofawn8dpgq/Project3_Avatars/defaultAvatar4.png?updatedAt=1688305286455';
    const avatar3 = 'https://ik.imagekit.io/ofawn8dpgq/Project3_Avatars/defaultAvatar5.png?updatedAt=1688305286440';

    const [signupUser, { error, data }] = useMutation(SIGNUP_USER);

    // all of this needs to be consolidated
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [avatarURL, setAvatarURL] = useState(avatar1);

    const handleAvatarClick = (avatar, e) => {

        // problem is here - some reason it is not taking and saying it is not a string? Will figure out soon
        setAvatarURL({ avatarURL: avatar })
        const selectedAvatar = e.target.classList[1];
        console.log(avatar)
        document.querySelector(".selectedAvatar").innerHTML = `Selection: ${selectedAvatar}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const { data } = await signupUser({
                variables: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    username: username,
                    avatar: avatarURL
                }
            })

            console.log(data)

            const { token } = await data.signup;
            console.log(token)
            Auth.login(token)

        } catch (err) {
            console.log("ERROR. Something went wrong: ", err)
        }
    }

    const onSuccess = res => {
        console.log(res.url);
        setAvatarURL(res.url)
    }

    const inputRefTest = useRef(null);
    const ikUploadRefTest = useRef(null);

    return (
        <>
        <NavIcons />
            <React.Fragment>
                <div className='outerForm'>
                    <form className='signupForm' autoComplete='off' onSubmit={handleSubmit}>
                        <h1>Signup:</h1>

                        <TextField
                            label="FirstName"
                            variant='filled'
                            sx={{ mb: 3 }}
                            fullWidth
                            type='text'
                            placeholder={firstName}
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />

                        <TextField
                            label="LastName"
                            variant='filled'
                            sx={{ mb: 3 }}
                            fullWidth
                            type='text'
                            placeholder={lastName}
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />

                        <TextField
                            label="Email"
                            variant='filled'
                            sx={{ mb: 3 }}
                            fullWidth
                            type='email'
                            placeholder={email}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <TextField
                            label="Password"
                            variant='filled'
                            sx={{ mb: 3 }}
                            fullWidth
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <TextField
                            label="Username"
                            variant='filled'
                            sx={{ mb: 3 }}
                            fullWidth
                            type='text'
                            placeholder={username}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />

                        {/* Throw error if email is already in our database */}
                        {error && (
                            <div>
                                <p className='errorMessage'>{error.message}</p>
                                <p className='errorMessage'>Please navigate to the <Link to={'/login'}>Login Page</Link> to sign in.</p>
                            </div>
                        )}

                        <IKContext
                            publicKey={publicKey}
                            urlEndpoint={urlEndpoint}
                            authenticationEndpoint={authenticationEndpoint}
                        >
                            <h2>Upload Custom Avatar:</h2>
                            <IKUpload
                                // user the username or someID as part of the filename
                                className='uploadImage'
                                fileName="test-upload.png"
                                useUniqueFileName={true}
                                folder={folderDestination}
                                inputRef={inputRefTest}
                                ref={ikUploadRefTest}
                                onSuccess={onSuccess}
                                style={{ display: 'none' }}
                            />

                            {inputRefTest && <button className='customUploadButton button1' onClick={() => inputRefTest.current.click()}>Upload</button>}
                        </IKContext>

                        <h2>Or, select a default avatar:</h2>
                        <div className='avatarGroup'>
                            <div className='avatarWrapper'>
                                <div onClick={(e) => handleAvatarClick(avatar1, e)}>
                                    <img className='avatarSelect Avatar1' src={avatar1} />
                                </div>

                                <div onClick={(e) => handleAvatarClick(avatar2, e)}>
                                    <img className='avatarSelect Avatar2' src={avatar2} />
                                </div>

                                <div onClick={(e) => handleAvatarClick(avatar3, e)}>
                                    <img className='avatarSelect Avatar3' src={avatar3} />
                                </div>

                            </div>
                        </div>

                        <p className='selectedAvatar'></p>

                        {/* Submit Info */}
                        <button className='signupSubmitButton button1' type='submit'>Signup</button>

                    </form>
                </div>
            </React.Fragment>
        </>
    )
}

export default Signup;