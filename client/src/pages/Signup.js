import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { useRef } from 'react';

import { IKContext, IKUpload } from 'imagekitio-react';
const publicKey = 'public_HCJZE+YwKYecvofGGZ+jCfHG1yw=';
const urlEndpoint = 'https://ik.imagekit.io/ofawn8dpgq';

const isProduction = process.env.NODE_ENV === 'production';
const authenticationEndpoint = isProduction
  ? 'https://sleepy-beach-12267-a5c989dbbda6.herokuapp.com/auth'
  : 'http://localhost:3001/auth';

// update the folder to whatever is needed
const folderDestination = '/react-cookbook-avatars';

const Signup = () => {

    const [signupUser] = useMutation(SIGNUP_USER);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [avatarURL, setAvatarURL] = useState("");

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

            const {token} = await data.signup;
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
            <h1>Signup Page</h1>
            <React.Fragment>
                <form autoComplete='off' onSubmit={handleSubmit}>

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

                    <IKContext
                        publicKey={publicKey}
                        urlEndpoint={urlEndpoint}
                        authenticationEndpoint={authenticationEndpoint}
                    >
                        <p>Upload an image</p>
                        <IKUpload

                        // user the username or someID as part of the filename
                            fileName="test-upload.png"
                            useUniqueFileName={true}
                            folder={folderDestination}
                            inputRef={inputRefTest}
                            ref={ikUploadRefTest}
                            onSuccess={onSuccess}
                            // style={{ display: 'none' }}
                        />
                    </IKContext>

                    {/* Submit Info */}
                    <Button variant='outlined' type='submit'>Signup</Button>

                </form>
            </React.Fragment>
        </>
    )
}

export default Signup;