import styled from '@emotion/styled';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Link, LinkProps } from 'react-router-dom';

const StyledLink = styled(Link)<LinkProps>({
  textDecoration: 'initial',
  color: 'inherit',
});

const TopBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          Weather
        </Typography>
        <StyledLink to="/">
          <Button color="inherit">Home</Button>
        </StyledLink>
        <StyledLink to="about">
          <Button color="inherit">About</Button>
        </StyledLink>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
