import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import EssentialServices from '../components/essentialServices';
import Special from '../components/special';
import Transport from '../components/transport';
import UsefulData from '../components/usefulData';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={4}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#D6FFF7',
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered={true} indicatorColor="secondary" variant='fullWidth'>
          <Tab label="Essential Services" {...a11yProps(0)} />
          <Tab label="Special Permits" {...a11yProps(1)} />
          <Tab label="Transport Services" {...a11yProps(2)} />
          <Tab label="Useful Data" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <EssentialServices/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <h1>Special Here</h1>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Transport/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h1>Useful data here</h1>
      </TabPanel>
    </div>
  );
}