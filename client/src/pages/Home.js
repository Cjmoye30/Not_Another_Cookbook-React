import * as React from 'react';
import '../styles/Home.css';
import ProfilesList from '../components/ProfilesList'
import RecipesList from '../components/RecipesList'
import { Link } from "react-router-dom";
import Auth from '../utils/auth'
import '../styles/Home.css'
import NavIcons from '../components/NavIcons';

const Home = () => {

    return (
        <>
        <NavIcons />
            <div className='homeHeader'>
                <h1 className='homeTitle'>Welcome, to Not Another Cookbook</h1>
                <p className='homeBio'>Step into a culinary paradise like no other – a haven free from the chaos of ads and tiresome bios. Our mission is to bring you a seamless, limited-user biography site that celebrates the art of cooking. Say farewell to distractions and welcome a focused experience that takes you straight to the heart of what matters: delicious recipes!</p>

                <p className='homeBio'>At our site, every moment counts, and we've meticulously curated a diverse range of recipes to cater to your unique tastes and preferences. From mouthwatering appetizers to irresistible desserts, each dish tells a captivating story through its flavors. Whether you're a seasoned chef or a kitchen novice, we're here to make your culinary journey a delight.</p>

                {Auth.loggedIn() ?
                    (
                        <Link to={`/me`}>
                            <button className='homepagebutton button1'>Dashboard</button>
                        </Link>
                    )
                    :
                    (
                        <div className='homeCTA'>
                            <Link to={`/login`}>
                                <button className='homepagebutton button1'>Login</button>
                            </Link>

                            <Link to={`/signup`}>
                                <button className='homepagebutton button1'>Signup</button>
                            </Link>
                        </div>
                    )}
            </div>

            <div className='homePageImageList'>
                <h1>Recipes from our users:</h1>
                <RecipesList />
            </div>

            <div className='homePageUserList'>
                <h1>Our Users & Early Endorsers:</h1>
                <ProfilesList />
            </div>


            {/* 
                TODO List:
                - Add bio field for user profiles - add it into the model just as a string 

                - Add in inspiration links for each recipe - array of links to navigate to so I can refer back to what site I got the recipe from 

                - Add notes section for each recipe. 

                - have a separate sections just for spices when creating the recipe? not too important

                - Convert the recipe image list into a component and import that on the homepage and then the profile page - all of the code is the same excpet for a query - could possibly do that.

                - Add up/down buttons on the create recipe page

                - increase the height of the instructions fields on create recipe page

                - figure out how to upload multiple images using multer - i think the destination would be the urlEndpoint?

                - Loading buttons?

                - Prevent the user from creating an account before their image is ready and loaded - otherwise an account will be created without an image.

                - add in default avatar selections like you did with project 3

                - Style 
            */}
        </>
    )
}

export default Home;