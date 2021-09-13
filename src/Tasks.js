import { Box, Button, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { UserContext } from './UserContext';
import { tests } from './Words';

const useStyles = makeStyles((theme) => ({
  background: {
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontWeight: '500',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    margin: '5px 0',
    display: 'block',
    textAlign: 'left',
  },
  label: { color: theme.palette.text.primary },
}));

export const Tasks = ({ endTest }) => {
  const { seconds, reset } = useStopwatch({ autoStart: true });
  const { toggleMode, mode } = useContext(UserContext);
  const classes = useStyles();
  const [test, setTest] = useState(0);
  const [wrong, setWrong] = useState('');
  const [result, setResult] = useState([]);

  const clickWord = (e) => {
    if (e.currentTarget.value === tests[test].word) {
      setWrong('');
      if (test === 2) {
        toggleMode();
      }
      const testResult = { test: test, mode: mode, time: seconds };
      setResult((prevState) => [...prevState, testResult]);
      if (test < 5) {
        setTest(test + 1);
        reset();
      }
    } else {
      setWrong('Wrong word!');
    }
  };

  useEffect(() => {
    if (result.length === 6) {
      endTest(result);
    }
  }, [result, endTest]);

  return (
    <Box className={classes.background}>
      <Container maxWidth="sm" className={classes.content}>
        <Typography variant="h4" color="textPrimary" style={{ paddingBottom: '20px' }}>
          {' '}
          Find the word{' '}
          <strong>
            <u>{tests[test].word}</u>
          </strong>
        </Typography>
        <Grid container direction="row">
          {tests[test].words.map((gridWord, i) => {
            return (
              <Grid key={gridWord} item>
                <Button
                  style={{ margin: '5px', textTransform: 'none' }}
                  variant="outlined"
                  value={gridWord}
                  onClick={clickWord}
                >
                  {gridWord}
                </Button>
              </Grid>
            );
          })}
        </Grid>
        <Typography variant="h6" style={{ color: 'red' }}>
          {' '}
          {wrong}
        </Typography>
      </Container>
    </Box>
  );
};
