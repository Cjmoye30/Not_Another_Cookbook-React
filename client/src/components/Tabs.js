import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme, ThemeProvider } from '@mui/material';
import '../styles/Home.css'

// Import the components we want to use in the tabs
import CreateRecipe from './CreateRecipe'
import UserRecipes from './UserRecipes';

const theme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'var(--a1)',
            backgroundImage: 'linear-gradient(var(--a1), #191c1e)',
            color: 'var(--a3)',
          },
        },
      },
    },
  },
});

export default function LabTabs() {

  // by changing the initial value of state which is controlling the tabs, you can change what is going to be selected by default on page load:
  const [value, setValue] = React.useState('recipeList');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <ThemeProvider theme={theme}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered selectionFollowsFocus
              TabIndicatorProps={{
                style: {
                  backgroundColor: 'var(--a4)'
                }
              }}
            >
              <Tab label="Your Recipes" value="recipeList" />
              <Tab label="Create New Recipe" value="createRecipe" />
            </TabList>
          </ThemeProvider>
        </Box>

        <TabPanel className='recipeListWrapper' value="recipeList"> <UserRecipes /> </TabPanel>
        <TabPanel className='createRecipeWrapper' value="createRecipe"> <CreateRecipe /> </TabPanel>
      </TabContext>
    </Box>
  );
}