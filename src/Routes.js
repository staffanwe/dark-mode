import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Start } from './Start.js';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { lightBlue, teal } from '@material-ui/core/colors';
import { UserContext } from './UserContext.js';

export const Routes = () => {
  const { mode } = useContext(UserContext);
  const theme = createTheme({
    palette: {
      primary: teal,
      secondary: lightBlue,
      type: mode,
    },
    typography: {
      fontFamily: 'Urbanist',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" exact component={Start} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
