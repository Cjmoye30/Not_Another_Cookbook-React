import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// Import the components we want to use in the tabs
import ProfilesList from './ProfilesList';
import ImageList from './ImageList';

export default function LabTabs() {
  const [value, setValue] = React.useState('userList');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // remove the inline styling and use css to center
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered selectionFollowsFocus>
            <Tab label="Users List" value="userList" />
            <Tab label="Images" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>

        {/* within each of the tabs - import a different componet */}
        <TabPanel value="userList"> <ProfilesList /> </TabPanel>
        <TabPanel value="2"> <ImageList /> </TabPanel>
        <TabPanel value="3">Item Three</TabPanel>

      </TabContext>
    </Box>
  );
}