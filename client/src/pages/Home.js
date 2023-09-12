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
                        <Link className='buttonWrapper' to={`/me`}>
                            <button className='homepagebutton button1'>Dashboard</button>
                        </Link>
                    )
                    :
                    (
                        <div className='homeCTA'>
                            <Link className='buttonWrapper' to={`/login`}>
                                <button className='homepagebutton button1'>Login</button>
                            </Link>

                            <Link className='buttonWrapper' to={`/signup`}>
                                <button className='homepagebutton button2'>Signup</button>
                            </Link>
                        </div>
                    )}
            </div>

            <div className='homePageImageList'>
                <RecipesList />
            </div>

            <div className='homePageUserList'>
                <h1>Our Users & Early Endorsers:</h1>
                <ProfilesList />
            </div>
        </>
    )
}

export default Home;