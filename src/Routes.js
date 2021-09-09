import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Start } from './Start.js';
import UserContext from './UserContext.js';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { lightBlue, teal } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: teal,
    secondary: lightBlue,
    type: 'dark',
  },
  typography: {
    fontFamily: 'Urbanist',
  },
});

export const Routes = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserContext>
        <Router>
          <Switch>
            <Route path="/" exact component={Start} />
          </Switch>
        </Router>
      </UserContext>
    </ThemeProvider>
  );
};
