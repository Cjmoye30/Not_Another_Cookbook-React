import * as React from 'react';
import '../styles/Home.css';
import { Link } from "react-router-dom";
import ProfilesList from '../components/ProfilesList'
import RecipesList from '../components/RecipesList'

const Home = () => {

    return (
        <>
            <div className='homeHeader'>
                <h1>Welcome, to Not Another Cookbook</h1>
                <p>The purpose of this site is to offer an add free, limited user biography site where users can quickly get to or create recipes they enjoy cooking. </p>
                <p>This site stands out in that it is not polluted with coutnless add or annoying bios, and it gets right to the niddy griddy.</p>
                <p>Created by: <Link target='_blank' to='https://github.com/Cjmoye30'>Cambric Moye</Link> </p>
            </div>

            {/* import users list */}
            <div>
                <h2>Peep all of our current users and early endorsers:</h2>
                <ProfilesList />
            </div>
            {/* import recipes list */}
            <div>
            <h2>Peep all of our delicious food right now (obviously more to come - give it time):</h2>
            <RecipesList />
            </div>



            <hr />

            <h3>TODO List:</h3>
            <p>Add in a list of all recipes</p>
            <p>Add in a list of all users</p>
            <p>Add in bio/explanation of website</p>
            <p>Add links for login/signup if nobody is logged in</p>
            <p>Add avatar image to top right of screen</p>
            <p>Move menu to left side of screen (like youtube)</p>
            <p>Delete Recipe</p>
            <p>Add bio field for user profiles - add it into the model just as a string</p>
            <p>Add in inspiration links for each recipe - array of links to navigate to so I can refer back to what site I got the recipe from</p>
            <p>Add notes section for each recipe.</p>
            <p>Loading buttons</p>
            <p>Style</p>
            <p>Deploy</p>
        </>
    )
}

export default Home;