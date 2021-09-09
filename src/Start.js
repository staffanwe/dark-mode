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
} from '@material-ui/core';
import React, { useState } from 'react';

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
  field: {
    margin: '5px 0',
    display: 'block',
    textAlign: 'left',
  },
  label: { color: theme.palette.text.primary },
}));

export const Start = () => {
  const classes = useStyles();
  const [alias, setAlias] = useState('');
  const [age, setAge] = useState('');
  const [aliasError, setAliasError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [gender, setGender] = useState('female');

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
    }
  };

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
              <FormControlLabel value="female" classes={{ label: classes.label }} control={<Radio />} label="Female" />
              <FormControlLabel value="male" classes={{ label: classes.label }} control={<Radio />} label="Male" />
              <FormControlLabel value="other" classes={{ label: classes.label }} control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Continue
          </Button>
        </form>
      </Box>
    </Box>
  );
};
