import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { GET_USER, GET_ALL_RECIPES } from '../utils/queries';
import { ADD_FAVORITE_CUISINE, ADD_FAVORITE_RECIPE, ADD_SIGNATURE_RECIPE } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { Link } from "react-router-dom";

export default function BasicSelect() {

    const userId = Auth.getProfile().data._id
    const { loading: userLoading, data: userQueryData, error: userError } = useQuery(
        GET_USER, { variables: { userId: userId } }
    )
    const userData = userQueryData.getUser;
    console.log("user data from updateFavorites!", userData);

    const { loading: recipeLoading, data: recipeQueryData, error: recipeError } = useQuery(GET_ALL_RECIPES)
    const allRecipeData = recipeQueryData?.getAllRecipes || {}
    console.log("all recipe data from updateFavorites!", allRecipeData)

    const [addFavoriteCuisine] = useMutation(ADD_FAVORITE_CUISINE);
    const [addSignatureRecipe] = useMutation(ADD_SIGNATURE_RECIPE);


    const [formData, setFormData] = React.useState({
        favoriteCuisine: userData.favoriteCuisine || '',
        signatureRecipe: userData.signatureRecipe ? userData.signatureRecipe._id : '' || ''
    })

    const handleChange = async (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })

        if (name === 'favoriteCuisine') {
            try {
                const cuisineData = await addFavoriteCuisine({
                    variables: {
                        userId: userId,
                        favoriteCuisine: value
                    }
                })
                console.log("CUISINE DATA FROM handleChange! ", cuisineData)
            } catch (err) {
                console.log("ERROR changing favorite cuisine: ", err)
            }
        }

        if (name === 'signatureRecipe') {
            try {
                const signatureRecipeData = await addSignatureRecipe({
                    variables: {
                        userId: userId,
                        recipeId: value
                    }
                })
                console.log("SIGNATURE RECIPE DATA FROM handleChange! ", signatureRecipeData)
            } catch (err) {
                console.log("ERROR chaging signature recipe", err)
            }
        }
    };

    // Arrays for cuisines, usersRecipes, and allRecipes
    const cuisineOptions = ["", "Italian", "Japanese", "Indian", "Mexican", "Korean", "American"];

    if (userLoading || recipeLoading) {
        return <div>Loading...</div>
    }

    if (userError || recipeError) {
        console.log(userError)
        return <>
            <p>Sorry, something went wrong. Return <Link to='/'>home</Link></p>
        </>
    }

    return (
        <Box>
            {/* Favorite Cusisine */}
            <FormControl fullWidth>
                <InputLabel id="favorite-cuisine-label">Favorite Cuisine</InputLabel>
                <Select
                    labelId="favorite-cuisine-label"
                    id="cuisine-select"
                    value={formData.favoriteCuisine}
                    label="Favorite Cuisine"
                    name='favoriteCuisine'
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                >
                    {cuisineOptions.map((option, index) => (
                        <MenuItem key={index} value={option}> {option} </MenuItem>
                    ))}

                </Select>
            </FormControl>

            {/* Signature Recipe the user has created */}
            <FormControl fullWidth>
                <InputLabel id="signature-recipe-label">Your Signature Recipe</InputLabel>
                <Select
                    labelId="signature-recipe-label"
                    id="signature-recipe-select"
                    value={formData.signatureRecipe}
                    label="Your Signature Recipe"
                    name='signatureRecipe'
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                >

                    {userData.recipes.length === 0 ? (
                        <p>You have no recipes to select from!</p>
                    ) : (
                        <>
                            <MenuItem value={""}>{""}</MenuItem>
                            {userData.recipes.map((recipe, index) => (
                                // add in a thumbnail image?
                                <MenuItem key={index} value={recipe._id}> {recipe.name} </MenuItem>
                            ))}
                        </>
                    )}



                </Select>

            </FormControl>

            {/*  Favorite recipes pulling from eveything in the database */}
            {/* <FormControl fullWidth>
                    <InputLabel id="favorite-recipe-label">Favorite Recipe</InputLabel>
                    <Select
                        labelId="favorite-recipe-label"
                        id="signature-recipe-select"
                        value={formData.favoriteRecipe}
                        label="Your Favorite Recipe"
                        name='favoriteRecipe'
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value={""}>{""}</MenuItem>
                        {allRecipeData.map((recipe, index) => (
                            <MenuItem key={index} value={recipe.name}>{recipe.name}</MenuItem>
                        ))}
                    </Select>

                </FormControl> */}
        </Box >
    );
}