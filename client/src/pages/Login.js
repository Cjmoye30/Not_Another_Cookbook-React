import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import '../styles/Login.css'
import NavIcons from '../components/NavIcons';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    '&:before': {
                        borderBottom: '3px solid var(--a4)',
                    },
                    '&:hover:not(.Mui-disabled, .Mui-error):before': {
                        borderBottom: '3px solid var(--a4)',
                    },
                    '&.Mui-focused:after': {
                        borderBottom: '3px solid var(--a4)',
                    },
                },
            }
        },

        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: 'var(--a1)'
                },
            }
        },

        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        "color": "var(--a1)"
                    }
                }
            }
        }
    }
})

const Login = () => {

    const [loginUser, { error, data }] = useMutation(LOGIN_USER);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        setEmailError(false)
        setPasswordError(false)

        if (email === '') {
            setEmailError(true)
        }
        if (password === '') {
            setPasswordError(true)
        }

        if (email && password) {
            console.log(email, password)
        }

        try {
            const { data } = await loginUser({
                variables: { email: email, password: password }
            })
            console.log(data);
            const { token } = await data.login;
            console.log(token);
            Auth.login(token)

        } catch (err) {
            console.error(err)
            console.log("ERROR Logging in: ", err)
        }
    }

    return (
        <>
            <NavIcons />
            <React.Fragment>
                <div className='outerForm'>
                    <form className='loginForm' autoComplete="off" onSubmit={handleSubmit}>
                        <h1 className='formTitle'>Login to your Account: </h1>
                        <ThemeProvider theme={theme}>

                            <TextField
                                label="Email"
                                className='loginField'
                                name='email'
                                fullWidth
                                onChange={e => setEmail(e.target.value)}
                                required
                                variant="filled"
                                type="email"
                                sx={{ mb: 3 }}
                                value={email}
                                error={emailError}
                            />

                            <TextField
                                label="Password"
                                className='loginField'
                                fullWidth
                                onChange={e => setPassword(e.target.value)}
                                required
                                variant="filled"
                                type="password"
                                value={password}
                                error={passwordError}
                                sx={{ mb: 3 }}
                            />
                        </ThemeProvider>
                        <button className='button1' type="submit">Login</button>


                        {error && (
                            <div>
                                <p className='errorMessage'>
                                    {error.message.includes('Email not found') ? 'Email not found. Please try again or signup' : ''}
                                </p>

                                <p className='errorMessage'>
                                    {error.message.includes('Incorrect password') ? 'Incorrect password.' : ''}
                                </p>
                            </div>
                        )}

                        <small className='ctaLogin'>Need an account? <Link to="/signup">Register here</Link></small>

                    </form>

                </div>
            </React.Fragment>
        </>
    );
}

export default Login;