import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/mutations';
import Auth from '../utils/auth';

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
                    avatarURL: avatarURL
                }
            })

            console.log(data)

            const { token } = await data.signupUser;
            Auth.login(token)

        } catch (err) {
            console.log("ERROR. Something went wrong: ", err)
        }
    }

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

                    {/* Submit Info */}
                    <Button variant='outlined' type='submit'>Signup</Button>

                </form>
            </React.Fragment>
        </>
    )
}

export default Signup;