import * as React from 'react';
import '../styles/Home.css';
import ProfilesList from '../components/ProfilesList'
import RecipesList from '../components/RecipesList'
import { Link } from "react-router-dom";
import Auth from '../utils/auth'
import '../styles/Home.css'

const Home = () => {

    return (
        <>
            <div className='homeHeader'>
                <h1 className='homeTitle'>Welcome, to Not Another Cookbook</h1>
                <p className='homeBio'>Step into a culinary paradise like no other – a haven free from the chaos of ads and tiresome bios. Our mission is to bring you a seamless, limited-user biography site that celebrates the art of cooking. Say farewell to distractions and welcome a focused experience that takes you straight to the heart of what matters: delicious recipes!</p>

                <p className='homeBio'>At our site, every moment counts, and we've meticulously curated a diverse range of recipes to cater to your unique tastes and preferences. From mouthwatering appetizers to irresistible desserts, each dish tells a captivating story through its flavors. Whether you're a seasoned chef or a kitchen novice, we're here to make your culinary journey a delight.</p>

                {Auth.loggedIn() ?
                    (
                        <button className='homepagebutton'>
                            <Link to={`/me`}>Dashboard</Link>
                        </button>
                    )
                    :
                    (
                        <div className='homeCTA'>
                            <button className='homepagebutton'>
                                <Link to={`/login`}>Login</Link>
                            </button>

                            <button className='homepagebutton'>
                                <Link to={`/signup`}>Signup</Link>
                            </button>
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
                Add in a list of all recipes 
                Add in a list of all users 
                Add in bio/explanation of website 
                Add links for login/signup if nobody is logged in 
                Add avatar image to top right of screen 
                Move menu to left side of screen (like youtube) 
                Delete Recipe 
                Add bio field for user profiles - add it into the model just as a string 
                Add in inspiration links for each recipe - array of links to navigate to so I can refer back to what site I got the recipe from 
                Add notes section for each recipe. 

                Convert the recipe image list into a component and import that on the homepage and then the profile page - all of the code is the same excpet for a query - could possibly do that

                Loading buttons?
                Style 
                Deploy  
            */}
        </>
    )
}

export default Home;