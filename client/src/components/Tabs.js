import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// Import the components we want to use in the tabs
import CreateRecipe from './CreateRecipe'
import UserRecipes from './UserRecipes';

export default function LabTabs() {

  // by changing the initial value of state which is controlling the tabs, you can change what is going to be selected by default on page load:
  const [value, setValue] = React.useState('recipeList');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // remove the inline styling and use css to center
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered selectionFollowsFocus>
            <Tab label="Your Recipes" value="recipeList" />
            <Tab label="Create New Recipe" value="createRecipe" />
          </TabList>
        </Box>

        {/* within each of the tabs - import a different componet */}
        <TabPanel value="recipeList"> <UserRecipes /> </TabPanel>
        <TabPanel value="createRecipe"> <CreateRecipe /> </TabPanel>
      </TabContext>
    </Box>
  );
}