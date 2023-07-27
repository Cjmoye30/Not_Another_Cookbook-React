import * as React from 'react';
import '../styles/Home.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Auth from '../utils/auth'

const Home = () => {
    return (
        <>
            <h1>HOME PAGE</h1>
            {/* <p>{Auth.getProfile().data._id}</p> */}

            <hr />

            <h2>What is the purpose of this application?</h2>

            <p>This is going to be one of my starting templates that I can pull up and immediately build a website from. Over time, it will begin to take more shape and bring in a lot of components that I like.</p>
            <p>I want to create my own template so that I know exactly what is in the code base, and it will be easier for me to understand rather than cloning a repo from someone who is more advanced than me.</p>
            <p>And lastly, this is also meant to keep my coding sharp as I search for jobs.</p>

            <hr />

            <h2>To-do List:</h2>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Create login page" />
                <FormControlLabel control={<Checkbox />} label="Create signup page" />
                <FormControlLabel control={<Checkbox />} label="Implement Imagekit.io for image uploading" />
                <FormControlLabel control={<Checkbox />} label="Use imagekit to upload avatar images" />
                <FormControlLabel control={<Checkbox />} label="Display avatars in top right part of page if the user is logged in" />
                <FormControlLabel control={<Checkbox />} label="Practice importing components" />
                <FormControlLabel control={<Checkbox />} label="Convert this list to use a map function " />
                <FormControlLabel control={<Checkbox />} label="Update header to show certain routes when logged in or logged out" />
                <FormControlLabel control={<Checkbox />} label="Deploy to heroku and make sure images can be loaded. Follow the steps you did with project 3." />
            </FormGroup>

        </>
    )
}

export default Home;