import { Box, Button, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
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
  const { toggleMode, mode } = useContext(UserContext);
  const classes = useStyles();
  const [test, setTest] = useState(0);
  const [wrong, setWrong] = useState('');
  const [result, setResult] = useState([]);
  const [shuffledArray, setShuffledArray] = useState([]);
  const [running, setRunning] = useState(false);
  const [currentTimeMs, setCurrentTimeMs] = useState(0);

  const start = () => {
    if (!running) {
      setRunning(true);
      setInterval(() => {
        setCurrentTimeMs((current) => current + 10);
      }, 10);
    }
  };

  const reset = () => {
    setCurrentTimeMs(0);
  };

  const clickWord = (e) => {
    if (e.currentTarget.value === tests[test].word) {
      setWrong('');
      if (test === 4) {
        toggleMode();
      }
      const testResult = { test: test, mode: mode, time: currentTimeMs };
      setResult((prevState) => [...prevState, testResult]);
      if (test < 9) {
        setTest(test + 1);
        reset();
      }
    } else {
      setWrong('Wrong word!');
    }
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  useEffect(() => {
    const arr = shuffle(tests[0].words);
    setShuffledArray(arr);
    if (result.length === 0) {
      start();
    }
    if (result.length === 10) {
      endTest(result);
    }
    // eslint-disable-next-line
  }, [result, endTest]);

  return (
    <Box className={classes.background}>
      <Container maxWidth="lg" className={classes.content}>
        <Typography variant="h4" color="textPrimary" style={{ paddingBottom: '20px' }}>
          {' '}
          Find the word{' '}
          <strong>
            <u>{tests[test].word}</u>
          </strong>
        </Typography>
        <Grid container direction="row">
          {shuffledArray.map((gridWord, i) => {
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
