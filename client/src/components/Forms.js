// https://www.freecodecamp.org/news/build-dynamic-forms-in-react/

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

const Forms = () => {

    // Creating and using a stateful variable which holds an array of objects where each object has ingredeints and measure
    // default state is empty ('')
    const [inputFields, setInputFields] = useState([
        { ingredient: '', measure: '' },
        { ingredient: '', measure: '' },
        { ingredient: '', measure: '' },
        { ingredient: '', measure: '' },
        { ingredient: '', measure: '' },
    ])

    // handling the changes in the form fields
    // two parameters - index and event
    // index = index of the input field being modified
    // event = contains the data of the input field being modified
    const handleFormChange = (index, event) => {

        // Creating a new array which takes in the currect state of all of the input fields
        let data = [...inputFields];
        // either ingredient or measure at the given index is then updated based on the new value of event.target.value
        data[index][event.target.name] = event.target.value;
        // the updated data array is then set as the new value of inputFields
        setInputFields(data);
    }

    const addField = () => {
        let newField = { ingredient: '', measure: '' };
        setInputFields([...inputFields, newField])
    }

    const handleSubmit = async (event) => {
        console.log(inputFields);
    }

    return (
        <div className="App">
            <React.Fragment>
                <form>
                    {inputFields.map((input, index) => {
                        return (
                            <div className='recipeGroup' key={index}>
                                <TextField
                                    name='ingredient'
                                    label='Ingredient'
                                    sx={{ mb: 3 }}
                                    value={input.ingredient}
                                    onChange={event => handleFormChange(index, event)}
                                />
                                <TextField
                                    name='measure'
                                    label='Measure'
                                    sx={{ mb: 3 }}
                                    value={input.measure}
                                    onChange={event => handleFormChange(index, event)}
                                />
                            </div>
                        )
                    })}
                </form>

                <div className='addFieldsGroup'>
                    <Button variant='outlined' onClick={addField}>Add 1x Field</Button>
                </div>

                <Button onClick={handleSubmit} variant='outlined'>Submit</Button>

            </React.Fragment>
        </div>
    )
}

export default Forms;