import {
    Box, Container, Typography, TextField, FormControlLabel, Grid, Radio,
    RadioGroup, Paper, Button, Backdrop,
    CircularProgress,
    Chip,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { getUser, setUser } from 'modules/user';
import { useAppDispatch, useAppSelector } from 'hooks';
import { auth } from 'db';
import {  updateUser } from 'db/repository/user';
function UserProfile() {
    const user = useAppSelector(getUser);
    const dispatch = useAppDispatch();
    const currentUser = auth.currentUser;
    const [values, setValues] = useState<any>();
    const [interest, setInterest] = useState('');
    const [backdrop, setBackdrop] = useState(false);
    useEffect(() => {
        if (user) {
            setValues({ ...user });
        }
    }, [user]);
    const handleUpdateProfile = async (e: any) => {
        e.preventDefault();

        if (currentUser && values.interests?.length > 0) {
            setBackdrop(true);
            const user = await updateUser(currentUser.uid, values);
      if (user) {
        dispatch(setUser(user));
        alert('User profile is successfully updated!');
        } else {
        alert('User update process was not successful. Please try again.');
       
      }
      setBackdrop(false);
        } else {
      alert('You need to have at least one interest!');
      
    }
    };
    const handleDeleteInterest = (interest: string) => {
        if (!isFound(interest, values.interests)) {
            alert('You cannot delete a interest that is not in your list.');
          } else {
            const newInterests = values.interests.filter(
              (value: string) => value !== interest
            );
            setValues({ ...values, interests: newInterests });
          }
    };
    const handleChange = (e: any) => {
        setValues({
            ...values,
            [e.target.name]:
                e.target.name === 'age' ? +e.target.value : e.target.value,
        });
    };
    const handleChangeText = (e: any) => {
        setInterest(e.target.value);
      };
      const handleAddInterest = () => {
        let splitStr = interest.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
          splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
    
        const newInterest = splitStr.join(' ');
    
        if (isFound(newInterest, values.interests)) {
          alert('You cannot add same interest twice.');
        } else {
          const newInterests = [...values.interests];
          newInterests.push(newInterest);
          setValues({ ...values, interests: newInterests });
        }
    
        setInterest('');
      };
      const isFound = (value: string, arr: string[]) => {
        const left = value.toLowerCase();
        return arr?.some((right) => left === right.toLowerCase());
    };
    return (
        <>
            <Box
                display='flex'
                flexDirection='column'
                height='100%'
                justifyContent='center'
            >
                <Container maxWidth='sm'>
                    <form onSubmit={handleUpdateProfile}>
                        <Box mb={3}>
                            <Typography color='textPrimary' variant='h5' align='center'>
                                {user?.firstName + ' ' + user?.lastName}'s Profile
                            </Typography>
                        </Box>
                        {values ? (
                            <>
                                <TextField
                                    label='First Name'
                                    margin='normal'
                                    name='firstName'
                                    variant='outlined'
                                    required
                                    fullWidth
                                    onChange={handleChange}
                                    value={values.firstName}
                                />
                                <TextField
                                    label='Last Name'
                                    margin='normal'
                                    name='lastName'
                                    variant='outlined'
                                    required
                                    fullWidth
                                    onChange={handleChange}
                                    value={values.lastName}
                                />
                                <TextField
                                    label='Display Name'
                                    margin='normal'
                                    name='dispalyName'
                                    variant='outlined'
                                    required
                                    fullWidth
                                    onChange={handleChange}
                                    value={values.dispalyName}
                                />
                                <Grid item xs={12}>
                                    <Typography>Gender</Typography>
                                    <RadioGroup
                                        row
                                        aria-labelledby='gender-label'
                                        name='gender'
                                        value={values.gender}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel
                                            value='female'
                                            control={<Radio />}
                                            label='Female'
                                        />
                                        <FormControlLabel
                                            value='male'
                                            control={<Radio />}
                                            label='Male'
                                        />
                                        <FormControlLabel
                                            value='other'
                                            control={<Radio />}
                                            label='Other'
                                        />
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={12}>
                  <Box display='flex' justifyContent='space-between'>
                    <Typography component='h2' variant='h6' gutterBottom>
                      Interests
                    </Typography>
                  </Box>
                  <TextField
                    margin='dense'
                    id='interest'
                    name='interest'
                    inputProps={{ 'data-testid': 'interest-input' }}
                    fullWidth
                    variant='outlined'
                    onChange={handleChangeText}
                    size='small'
                    value={interest}
                  />
                  <Button
                    variant='contained'
                    onClick={handleAddInterest}
                    fullWidth
                    disabled={!interest}
                    component='label'
                    data-testid='test-interest-add-button'
                  >
                    Add
                  </Button>
                  <Paper variant='outlined' sx={{ marginTop: 0.5 }}>
                    <Paper
                      component='ul'
                      elevation={0}
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        margin: 1,
                        padding: 0,
                      }}
                    >
                      {values.interests.length > 0 ? (
                        values.interests.map((interest: string, i: number) => (
                          <li key={i}>
                            <Chip
                              label={interest}
                              sx={{ margin: 0.5 }}
                              onDelete={() => {
                                handleDeleteInterest(interest);
                              }}
                              color='primary'
                            />
                          </li>
                        ))
                      ) : (
                        <Typography variant='inherit' align='center'>
                          Please add a tag to display list.
                        </Typography>
                      )}
                    </Paper>
                  </Paper>
                </Grid>
                <TextField
                  label='Age'
                  margin='normal'
                  name='age'
                  type='number'
                  variant='outlined'
                  inputProps={{ min: 0, max: 120 }}
                  fullWidth
                  onChange={handleChange}
                  value={values.age ? values.age : 0}
                />
                <TextField
                  label='Level of Experience'
                  margin='normal'
                  name='levelOfExperience'
                  type='number'
                  variant='outlined'
                  fullWidth
                  disabled
                  value={values.levelOfExperience}
                />

                            </>
                        ) : null}
                        <Box my={2}>
                        <Grid container justifyContent='center' spacing={2}>
                        <Grid item>
                  <Button
                    color='primary'
                    // disabled={isSubmitting}
                    fullWidth
                    size='large'
                    type='submit'
                    variant='contained'
                  >
                    Update Profile
                  </Button>
                </Grid>
                        </Grid>
                        </Box>
                        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
        open={backdrop}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
                    </form>
                </Container>
            </Box>
        </>
    );
}
export default UserProfile;