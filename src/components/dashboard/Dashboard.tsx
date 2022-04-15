import React from 'react';
import { getinterestList, setinterestList } from 'modules/interests';
import AvatarUpload from 'components/AvatarUpload';
import {
  Container,
  Grid,
  TextField,
  DialogActions,
  Autocomplete,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import db from '../../db';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { UserSaveFormData } from 'types';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getAllInterests, setInterest } from 'db/repository/interests';
import { auth } from 'db';
import { useNavigate } from 'react-router-dom';
let photourlString: string;
type UserProfileFormData = {
  firstName: string;
  lastName: string;
  dispalyName: string;
  age: number;
  gender: string;
  interest: string;
  description: string;
  photoUrl: any;
  levelOfExperience: number;
};

export async function addData(result: string) {
  photourlString = result;
}
function Dashboard() {
  const { control, reset, handleSubmit } = useForm<UserProfileFormData>();
  const interestList = useAppSelector(getinterestList);
  const dispatch = useAppDispatch();
  const [backdrop, setBackdrop] = useState(false);
  const [interesrValues, setInterestValue] = useState('');
  const currentUser = auth.currentUser || { uid: '' };
  const userRef = doc(db, "users", currentUser.uid);
  const navigate = useNavigate();
  useEffect(() => {
    
    if (interestList.length <= 0) {
      const updateInterestList = async () => {
        const data = await getAllInterests();
        dispatch(setinterestList(data));
      };
      updateInterestList().catch((err) => {
        console.error(err);
      });
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [values, setValues] = useState<UserSaveFormData>({
    interests: [],
    firstName:'',
    description: '',
    lastName: '',
    dispalyName: '',
    age: 0,
    gender:'',
    email:'',
    photoURL: '',
    levelOfExperience:[],
    uid: currentUser.uid,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'radio') {
      setValues({
...values,
 'gender' : e.target.value,
      });
    }
    else{
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });
  }
  
  };
  const onSubmit = handleSubmit(async () => {
   
  let interest  = await setInterest(interesrValues);
    const addValues = {
      ...values,
      uid: currentUser.uid,
      };
      setBackdrop(true);
      await setDoc(userRef, {
        userId: currentUser.uid
      });
      await updateDoc(userRef, {
      firstName : addValues.firstName,
      lastName : addValues.lastName,
      dispalyName : addValues.dispalyName,
      gender : addValues.gender,
      age: addValues.age,
      photoURL: photourlString,
      interests : [interest],
      email : auth.currentUser?.email,
      description : addValues.description,
      levelOfExperience : addValues.levelOfExperience,
      userId: currentUser.uid,
      });
    setBackdrop(false);
    alert('user data saved successfully!');
    reset();
    navigate(`/searchProfile`);
  });
  
  return (
    <div className="Dashboard">
     
      <form id='userForm' onSubmit={onSubmit}>
      < AvatarUpload />
        <Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={4} >
            <FormControl fullWidth>
            <Controller
            name='firstName'
            control={control}
            render={({ field: { name, value, onChange } }) => (
              <TextField
                id='firstName'
                label='First Name'
                name={name}
                value={value}
                type='input'
                fullWidth
                variant='standard'
                onChange={handleChange}
                required
              />
              )}
              />
</FormControl> 
            </Grid>
            <Grid item xs={4} >
            <FormControl fullWidth>
            <Controller
            name='lastName'
            control={control}
            render={({ field: { name, value, onChange } }) => (
              <TextField
                id='lastName'
                label='Last Name'
                variant='standard'
                value={value}
                name={name}
                type='input'
                onChange={handleChange}

                required
              />
              )}
              />
</FormControl>
            </Grid>
            <Grid item xs={4} >
              <FormControl fullWidth>
                <Controller
                  name='dispalyName'
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <TextField
                      id='dispalyName'
                      label='Display Name'
                      variant='standard'
                      name={name}
                      value={value}
                      onChange={handleChange}
                      required
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4} >
              <FormControl fullWidth>
                <Controller
                  name='age'
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <TextField id="age"
                      label='Age'
                      type="number"
                      InputProps={{ inputProps: { min: "18", max: "45", step: "1" } }}
                      variant="standard"
                      onChange={handleChange}
                      name={name}
                      value={value}
                      required
                    />

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
                        value='both'
                        control={<Radio />}
                        label='Both'
                      />
                    </RadioGroup>
                  )}
                  
                />
              </FormControl>
            </Grid>
            <Grid item xs={4} >
              <Autocomplete
                freeSolo
                id='interest-combo-box'
                onInputChange={(event, newValue: string) => {
                  setInterestValue(newValue);
                }}
                options={interestList}
                renderInput={(params) => (
                  <TextField {...params} label='Interests' />
                )}
                
              />
            </Grid>
            <Grid item xs={4} >
              <FormControl fullWidth>
                <Controller
                  name='levelOfExperience'
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <TextField id="levelOfExperience"
                      label='Level of Performance'
                      type="number"
                      InputProps={{ inputProps: { min: "0", max: "10", step: "1" } }}
                      variant="standard"
                      onChange={handleChange}
                      name={name}
                      value={value}
                      required
                    />

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
                      onChange={handleChange}
                      required
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

        </Container>
        <DialogActions>
        <Button variant='contained' type='submit' form='userForm'>
          Submit
        </Button>
        <Button variant='contained' onClick={() => reset()}>
          Cancel
        </Button>
        </DialogActions>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
        open={backdrop}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      </form>

    </div>
  );
}

export default Dashboard;
