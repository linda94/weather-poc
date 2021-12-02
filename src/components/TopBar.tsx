import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import styles from './topbar.module.css';

const TopBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          Weather
        </Typography>
        <Link to="/" className={styles.home}>
          <Button color="inherit">Home</Button>
        </Link>
        <Link to="about" className={styles.about}>
          <Button color="inherit">About</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
