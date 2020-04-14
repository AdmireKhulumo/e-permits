import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const EssentialServicesPromise=import('../components/essentialServices');
const EssentialServices=React.lazy(()=>(EssentialServicesPromise));

const TransportPromise=import('../components/transport');
const Transport=React.lazy(()=>(TransportPromise));

const SpecialPromise=import('../components/special');
const Special=React.lazy(()=>(SpecialPromise));

const UsefulDataPromise=import('../components/usefulData');
const UsefulData=React.lazy(()=>(UsefulDataPromise));



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
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="Essential Services" {...a11yProps(1)} />
          <Tab label="Transport Of Goods" {...a11yProps(2)} />
          <Tab label="Special Permits" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <React.Suspense fallback={<div>Loading......</div>}>
          <UsefulData/>
      </React.Suspense>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <React.Suspense fallback={<div>Loading......</div>}>
          <EssentialServices/>
      </React.Suspense>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <React.Suspense fallback={<div>Loading......</div>}>
          <Transport/>
      </React.Suspense>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <React.Suspense fallback={<div>Loading......</div>}>
           <Special/>
      </React.Suspense>
      </TabPanel>
    </div>
  );
}