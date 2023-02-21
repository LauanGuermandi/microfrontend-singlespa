import * as React from 'react';
import * as SingleSpa from 'single-spa'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface NavbarProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function Navbar(props: NavbarProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);

    switch(newValue) {
      case 0:
        SingleSpa.navigateToUrl('/')
        break;
      case 1:
        SingleSpa.navigateToUrl('/app1')
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="App1" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Navbar value={value} index={0}>
      </Navbar>
      <Navbar value={value} index={1}>
      </Navbar>
    </Box>
  );
}
