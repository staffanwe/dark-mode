import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
} from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { Tasks } from './Tasks';

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
    textAlign: 'center',
    width: '300px',
  },
  content2: {
    textAlign: 'center',
    width: '600px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  field: {
    margin: '5px 0',
    display: 'block',
    textAlign: 'left',
  },
  label: { color: theme.palette.text.primary },
}));

export const Start = () => {
  const classes = useStyles();
  const [stage, setStage] = useState(0);
  const [alias, setAlias] = useState('');
  const [vision, setVision] = useState('');
  const [computer, setComputer] = useState(null);
  const [experience, setExperience] = useState(null);
  const [age, setAge] = useState('');
  const [aliasError, setAliasError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [gender, setGender] = useState('female');
  const [difficulty, setDifficulty] = useState(null);
  const [difference, setDifference] = useState(null);
  const [preference, setPreference] = useState(null);
  const [testResults, setTestResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAliasError(false);
    setAgeError(false);

    if (alias === '') {
      setAliasError(true);
    }

    if (age === '') {
      setAgeError(true);
    }

    if (alias && age) {
      console.log(alias, age, gender);
      setStage(1);
    }
  };

  const handleResultSubmit = (e) => {
    e.preventDefault();
    const total = {
      alias: alias,
      age: age,
      gender: gender,
      vision: vision,
      computer: computer,
      experience: experience,
      result: testResults,
      answers: { difficulty, difference, preference },
    };
    console.log('FINAL: ', total);
    setStage(4);

    axios.post('https://secure-ocean-83743.herokuapp.com/api/result', total).then(setStage(5));
  };

  const emptyFields = () => alias === '' || age === '';

  const startTest = () => setStage(2);

  const endTest = (result) => {
    setTestResults(result);
    setStage(3);
  };

  if (stage === 0) {
    return (
      <Box className={classes.background}>
        <Box className={classes.content}>
          <Typography className={classes.welcome} variant="h2" color="textPrimary">
            Welcome!
          </Typography>
          <Typography className={classes.info} variant="subtitle1" color="textPrimary">
            Please fill in following information to start.
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              className={classes.field}
              label="Alias"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              error={aliasError}
              onChange={(e) => setAlias(e.target.value)}
            />
            <TextField
              className={classes.field}
              label="Age"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              error={ageError}
              onChange={(e) => setAge(e.target.value)}
            />

            <FormControl className={classes.field} component="fieldset">
              <FormLabel component="legend" required>
                Gender
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={gender}
                row
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="female"
                  classes={{ label: classes.label }}
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel value="male" classes={{ label: classes.label }} control={<Radio />} label="Male" />
                <FormControlLabel value="other" classes={{ label: classes.label }} control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
            <FormLabel component="legend" style={{ textAlign: 'left' }}>
              Do you have any kind of impaired vision? If you do, what kind?
            </FormLabel>
            <TextField
              className={classes.field}
              label=""
              variant="outlined"
              color="secondary"
              fullWidth
              onChange={(e) => setVision(e.target.value)}
            />
            <FormControl className={classes.field} component="fieldset">
              <FormLabel component="legend">
                How much do you use a computer? (1 = Almost nothing, 5 = All day)
              </FormLabel>
              <RadioGroup
                aria-label="computer"
                name="gender1"
                value={computer}
                row
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                onChange={(e) => setComputer(e.target.value)}
              >
                <FormControlLabel value="1" classes={{ label: classes.label }} control={<Radio />} label="1" />
                <FormControlLabel value="2" classes={{ label: classes.label }} control={<Radio />} label="2" />
                <FormControlLabel value="3" classes={{ label: classes.label }} control={<Radio />} label="3" />
                <FormControlLabel value="4" classes={{ label: classes.label }} control={<Radio />} label="4" />
                <FormControlLabel value="5" classes={{ label: classes.label }} control={<Radio />} label="5" />
              </RadioGroup>
            </FormControl>
            <FormControl className={classes.field} component="fieldset">
              <FormLabel component="legend">
                How would you rate your experience with dark mode? (1 = Never used it, 5 = Uses it all the time)
              </FormLabel>
              <RadioGroup
                aria-label="experience"
                name="gender1"
                value={experience}
                row
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                onChange={(e) => setExperience(e.target.value)}
              >
                <FormControlLabel value="1" classes={{ label: classes.label }} control={<Radio />} label="1" />
                <FormControlLabel value="2" classes={{ label: classes.label }} control={<Radio />} label="2" />
                <FormControlLabel value="3" classes={{ label: classes.label }} control={<Radio />} label="3" />
                <FormControlLabel value="4" classes={{ label: classes.label }} control={<Radio />} label="4" />
                <FormControlLabel value="5" classes={{ label: classes.label }} control={<Radio />} label="5" />
              </RadioGroup>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" disabled={emptyFields()}>
              Continue
            </Button>
          </form>
        </Box>
      </Box>
    );
  } else if (stage === 1) {
    return (
      <Box className={classes.background}>
        <Box className={classes.content}>
          <Typography variant="h5" color="textPrimary">
            You will now be given a number of tasks where you will be presented a word. All you got to do is find the
            word in the grid as fast as you can and click it. Ready?{' '}
          </Typography>
          <Button style={{ marginTop: '50px' }} variant="contained" color="primary" onClick={startTest}>
            Ready
          </Button>
        </Box>
      </Box>
    );
  } else if (stage === 2) {
    return <Tasks endTest={endTest} />;
  } else if (stage === 3) {
    return (
      <Box className={classes.background}>
        <Box className={classes.content2}>
          <Typography variant="h5" color="textPrimary">
            Well done! Now please answer these questions and submit your results
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleResultSubmit}>
            <FormControl className={classes.field} component="fieldset">
              <FormLabel component="legend" required>
                How easy was it to find the words? (1 = Very hard, 5 = Very easy)
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={difficulty}
                row
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <FormControlLabel value="1" classes={{ label: classes.label }} control={<Radio />} label="1" />
                <FormControlLabel value="2" classes={{ label: classes.label }} control={<Radio />} label="2" />
                <FormControlLabel value="3" classes={{ label: classes.label }} control={<Radio />} label="3" />
                <FormControlLabel value="4" classes={{ label: classes.label }} control={<Radio />} label="4" />
                <FormControlLabel value="5" classes={{ label: classes.label }} control={<Radio />} label="5" />
              </RadioGroup>
            </FormControl>
            <FormControl className={classes.field} component="fieldset">
              <FormLabel component="legend" required>
                Do you think there was a difference in difficulty using dark mode?
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={difference}
                row
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                onChange={(e) => setDifference(e.target.value)}
              >
                <FormControlLabel
                  value="Harder with light mode"
                  classes={{ label: classes.label }}
                  control={<Radio />}
                  label="Harder with light mode"
                />
                <FormControlLabel
                  value="No difference"
                  classes={{ label: classes.label }}
                  control={<Radio />}
                  label="No difference"
                />
                <FormControlLabel
                  value="Harder with dark mode"
                  classes={{ label: classes.label }}
                  control={<Radio />}
                  label="Harder with dark mode"
                />
              </RadioGroup>
            </FormControl>
            <FormControl className={classes.field} component="fieldset">
              <FormLabel component="legend" required>
                Which mode are you prefering on your devices?
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={preference}
                row
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                onChange={(e) => setPreference(e.target.value)}
              >
                <FormControlLabel
                  value="Light mode"
                  classes={{ label: classes.label }}
                  control={<Radio />}
                  label="Light mode"
                />
                <FormControlLabel
                  value="No preference"
                  classes={{ label: classes.label }}
                  control={<Radio />}
                  label="No preference"
                />
                <FormControlLabel
                  value="Dark mode"
                  classes={{ label: classes.label }}
                  control={<Radio />}
                  label="Dark mode"
                />
              </RadioGroup>
            </FormControl>

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    );
  } else if (stage === 4) {
    <Box className={classes.background}>
      <Box className={classes.content}>
        <Typography variant="h5" color="textPrimary">
          Submitting results
        </Typography>
        <CircularProgress />
      </Box>
    </Box>;
  } else if (stage === 5) {
    return (
      <Box className={classes.background}>
        <Box className={classes.content}>
          <Typography variant="h5" color="textPrimary">
            Thank you for your participation!
          </Typography>
        </Box>
      </Box>
    );
  }
};
