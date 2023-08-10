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
            color: 'var(--a3)',
            opacity: '.7'
          },
        },
        // MuiTabIndicator: {
        //   styleOverrides: {
        //     root: {
        //       '&.Mui-selected' : {
        //         backgroundColor: 'red', // Change this to your desired color for the indicator line
        //       }
        //     }
        //   }
        // },
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
            >
              <Tab label="Your Recipes" value="recipeList" />
              <Tab label="Create New Recipe" value="createRecipe" />
            </TabList>
          </ThemeProvider>
        </Box>

        {/* within each of the tabs - import a different componet */}
        <TabPanel value="recipeList"> <UserRecipes /> </TabPanel>
        <TabPanel value="createRecipe"> <CreateRecipe /> </TabPanel>
      </TabContext>
    </Box>
  );
}