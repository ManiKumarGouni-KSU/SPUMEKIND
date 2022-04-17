import React, { useEffect, useState }  from 'react';
import { auth } from 'db';
import { GroupSearchFormData } from 'types/index';
import {
    Container,
    Grid,
    Backdrop,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  DialogActions,
  Button,
  Select,
  SelectChangeEvent,
  Typography,
  MenuItem,
  Slider,
  } from '@mui/material';
  import { useForm, Controller } from 'react-hook-form';
  import { useAppDispatch } from 'hooks';
import {getLoggedInUser} from 'db/repository/user';
import {UserData} from 'types/index';
import { getGroupsByCriteria, getUpdateSearchList } from 'db/repository/search';
import { setSearchList } from 'modules/search';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import db from '../../db';
type SearchProfileFormData = {
  age: number;
  gender: string;
  interest: string;
  levelOfExperience: number;
};
function valuetext(value: number) {
  return `${value}`;
}
function SearchProfile(){
  const { control, reset, handleSubmit } = useForm<SearchProfileFormData>();
  const dispatch = useAppDispatch();
  const [backdrop, setBackdrop] = useState(false);
  const [user, setUser] = useState<UserData>();
  const navigate = useNavigate();
  const userRef = collection(db, 'users_search_matches');
  
  const [criteria, setCriteria] = useState<GroupSearchFormData>({
    interest: '',
    age: [0, 45],
    gender: '',
    levelOfExperience: [0, 10],
  });
  useEffect(() => {
    const getUser = async () => {
      const currentUser = auth.currentUser || { uid: '' };
      const user = await getLoggedInUser({
        uid: currentUser.uid,
        firstName: '',
        email: '',
        photoURL: '',
        lastName:'',
        displayname:'',
        age:0,
      });
      setUser(user);
    };
    setCriteria({
      interest: user?.interests[0] ? user?.interests[0] : '',
      age: [0, 45],
      gender: '',
      levelOfExperience: [0, 10],
    });
    getUser()// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const addMatchingProfiles = async (values : UserData) => {
    
    console.log('Add values ');
  await addDoc(userRef, {
  name: values?.firstName +' '+ values?.lastName,
  photoURL: values?.photoURL,
  uid: auth.currentUser?.uid,
  interests: values?.interests,
  userId: values?.userId
});
};
  const saveMatches = async (values : UserData) => {
    const getList = await getUpdateSearchList(values?.uid);
    let updateFlag : boolean = true;
    getList.forEach((doc) =>{  
      console.log('doc?.userId ' + doc.uid); 
      console.log('values?.userId ' + values?.uid); 
      if(doc?.uid === values?.userId){
        updateFlag = false;
      } else { 
        addMatchingProfiles(values);
      }
      });
     
  };
  const onSubmit = handleSubmit(async () => {
    console.log(user?.interests.length + ' list of interests');
    if(user?.interests){
    const currentUser = auth.currentUser || { uid: '' };
    if (currentUser) {
      setBackdrop(true);
      const groupResult = await getGroupsByCriteria(criteria, currentUser.uid);
      groupResult.forEach((doc) =>{
        saveMatches(doc);
      });
      if (groupResult.length === 0) {
        alert(
          'There are no available matching profiles. Please modify your criteria to find match.'
        );
       
      }
      dispatch(setSearchList(groupResult));
      setBackdrop(false);
      if (groupResult.length > 0) {
        navigate(`/swipeCard`);
      }
    } else {
      alert('User is not logged in.');
    }
  }
  else{
    alert(
      'Create your profile and start search profiles'
    );
  }
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCriteria({
      ...criteria,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeInterest = (e: SelectChangeEvent) => {
    setCriteria({
      ...criteria,
      interest: e.target.value as string,
    });
  };

  const handleChangeAge = (e: Event, value: number | number[]) => {
    const myValue = user?.age ? user.age : 0;
    const rangeValue = value as number[];
    if (myValue >= rangeValue[0] && myValue <= rangeValue[1]) {
      setCriteria({
        ...criteria,
        age: rangeValue,
      });
    } else {
      alert(
        `You cannot set range outside of your age. Your age is: ${user?.age}`
      );
      
    }
  };
  const handleChangeLevelOfExperience = (
    e: Event,
    value: number | number[]
  ) => {
    const myValue = user?.levelOfExperience ? user.levelOfExperience : 0;
    const rangeValue = value as number[];
    if (myValue >= rangeValue[0] && myValue <= rangeValue[1]) {
      setCriteria({
        ...criteria,
        levelOfExperience: rangeValue,
      });
    } else {
      alert(
        `You cannot set range outside of your age. Your age is: ${user?.age}`
      );
      
    }
  };
    return (
      <div className="searchProfile">
        <form id='searchForm' onSubmit={onSubmit}>
         <Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
         <Grid container spacing={2}>
         <Grid item xs={4}>
              <Typography>Interest</Typography>
              <Select
                fullWidth
                labelId='interest-select-label'
                name='interest'
                value={criteria.interest}
                onChange={handleChangeInterest}
                data-testid='joinGroup-interest'
              >
                {user?.interests.map((interest, index) => (
                  <MenuItem key={index} value={interest}>
                    {interest}
                  </MenuItem>
                ))}
              </Select>
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
                        control={<Radio required={true}/>}
                        label='Female'
                        
                      />
                      <FormControlLabel
                        value='male'
                        control={<Radio required={true}/>}
                        label='Male'
                        
                      />
                      <FormControlLabel
                        value='both'
                        control={<Radio required={true}/>}
                        label='Both'
                        
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Level of Experience: Between {criteria.levelOfExperience[0]} and{' '}
                {criteria.levelOfExperience[1]}
              </Typography>
              <Slider
                getAriaLabel={() => 'Level of experience range'}
                name='levelOfExperience'
                disabled={user?.levelOfExperience === null}
                max={10}
                value={criteria.levelOfExperience}
                onChange={handleChangeLevelOfExperience}
                valueLabelDisplay='auto'
                getAriaValueText={valuetext}
                data-testid='joinGroup-level-of-experience'
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Age: Between {criteria.age[0]} and {criteria.age[1]}
              </Typography>
              <Slider
                getAriaLabel={() => 'Age range'}
                name='age'
                disabled={user?.age === null}
                max={120}
                value={criteria.age}
                onChange={handleChangeAge}
                valueLabelDisplay='auto'
                getAriaValueText={valuetext}
                data-testid='joinGroup-age'
              />
            </Grid>
         </Grid>
         </Container>
         <DialogActions>
        <Button variant='contained' type='submit' form='searchForm'>
          Search
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

export default SearchProfile;