import React from 'react';
import {
  Container,
  Grid,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
} from '@mui/material';
import db from '../../db';
import { collection, addDoc } from 'firebase/firestore';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { UserData } from 'types';
import { auth } from 'db';
import { getLoggedInUser } from 'db/repository/user';
type UserProfileFormData = {
  fname: string;
  lastname: string;
  dispalyname: string;
  age: number;
  gender: string;
  interest: string;
  description: string;
};

function Dashboard() {
  
  const [user, setUser] = useState<UserData>();
  const maxNumber = 69;
  const { control, reset, handleSubmit } = useForm<UserProfileFormData>();
  const userRef = collection(db, 'users');
  useEffect(() => {
    const getUser = async () => {
      const currentUser = auth.currentUser || { uid: '' };
       const user = await getLoggedInUser({
        uid: currentUser.uid,
        email: '',
        photoURL: '',
        firstName: '',
        lastName: '',
        displayname: '',
        age: 0,
      });
      setUser(user);
    };
    getUser();
  }, []);
  const [values] = useState<UserData>({
    interests: [],
    firstName:'',
    description: '',
    lastName: '',
    displayname: '',
    age: 0,
    gender:'',
    email:'',
    photoURL: ''
    
  });
  
  const getAges = (min: number) => {
    const ages: number[] = [];
    for (var i = 0; i <= 10; i++) {
      ages.push(min + i);
    }
    return ages;
  };
  console.log(auth.currentUser);
  
  const onSubmit = handleSubmit(async (data) => {
    const addValues = {
      ...values,
    };
    data.fname = user?.firstName || data.fname;
    data.lastname = user?.lastName || data.lastname;
    data.dispalyname = user?.displayname || data.dispalyname;
    data.age = user?.age || data.age;
    data.gender =  user?.gender || data.gender || '';
    data.interest = user?.interests[0] || data.interest || '';
    reset();
    await addDoc(userRef, addValues);
  });
  
  return (
    <div className="Dashboard">
     
      
      
      <form id='userForm' onSubmit={onSubmit}>
      <Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={4} >
              <FormControl fullWidth>
                  <Controller
                    name='fname'
                    control={control}
                    render={({ field: { name, value, onChange } }) => (
                      <TextField
                        id='fname'
                        label='First Name'
                        variant='standard'
                        name={name}
                        value={value}
                        onChange={onChange}
                        required
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4} >
              <FormControl fullWidth>
                  <Controller
                    name='lastname'
                    control={control}
                    render={({ field: { name, value, onChange } }) => (
                      <TextField
                        id='lastname'
                        label='Last Name'
                        variant='standard'
                        name={name}
                        value={value}
                        onChange={onChange}
                        required
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4} >
              <FormControl fullWidth>
                  <Controller
                    name='dispalyname'
                    control={control}
                    render={({ field: { name, value, onChange } }) => (
                      <TextField
                        id='dispalyname'
                        label='Display Name'
                        variant='standard'
                        name={name}
                        value={value}
                        onChange={onChange}
                        required
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4} >
                <FormControl fullWidth>
                  <InputLabel id='age-label'>Age</InputLabel>
                  <Controller
                    name='age'
                    control={control}
                    render={({ field: { name, value, onChange } }) => (
                      <Select
                        id='age'
                        labelId='age-label'
                        type='number'
                        label='Age'
                        name={name}
                        value={value}
                        onChange={onChange}
                        defaultValue={user?.age}
                        required
                      >
                        {user &&
                          getAges(user.age).map((r) => (
                            <MenuItem value={r}>{r}</MenuItem>
                          ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={5} >
                <FormControl fullWidth>
                  <FormLabel id='gender-label'>Gender</FormLabel>
                  <Controller
                    name='gender'
                    control={control}
                    render={({ field: { name, value, onChange } }) => (
                      <RadioGroup
                        row
                        aria-labelledby='gender-label'
                        id='gender'
                        name={name}
                        value={value}
                        onChange={onChange}
                        defaultValue={user?.gender}
                      >
                        <FormControlLabel
                          value='female'
                          control={<Radio />}
                          label='Female'
                          disabled={user?.gender === 'male'}
                        />
                        <FormControlLabel
                          value='male'
                          control={<Radio />}
                          label='Male'
                          disabled={user?.gender === 'female'}
                        />
                        <FormControlLabel
                          value='both'
                          control={<Radio />}
                          label='Both'
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={7}>
                <FormControl fullWidth>
                  <InputLabel id='interest-label'>Interest</InputLabel>
                  <Controller
                    name='interest'
                    control={control}
                    render={({ field: { name, value, onChange } }) => (
                      <Select
                        labelId='interest-label'
                        id='interest'
                        type='number'
                        label='Interest'
                        name={name}
                        value={value}
                        onChange={onChange}
                        defaultValue={"Select"}
                        required
                      >
                        {user &&
                          user.interests.map((interest) => (
                            <MenuItem value={interest}>{interest}</MenuItem>
                          ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='description'
                    control={control}
                    render={({ field: { name, value, onChange } }) => (
                      <TextField
                        id='description'
                        label='Description'
                        multiline
                        rows={2}
                        name={name}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
            
          </Container>
          <Button variant='contained' type='submit' form='userForm'>
          Submit
        </Button>
        <Button variant='contained' onClick={() => reset()}>
          Cancel
        </Button>
      </form>
      
      </div>     
  );
}

export default Dashboard;
