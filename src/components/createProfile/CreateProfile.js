import { useState } from 'react';
import {Box,Button,InputAdornment,Card,CardContent,CardHeader,Divider,Grid,TextField} from '@mui/material';

const states = [
    {
      value: 'georgia',
      label: 'Georgia'
    },
  ];

const CreateProfile = ({props}) => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        nickname:'',
        age:'',
        height:'',
        education:'',
        state: '',
        activities:'',
        aboutUser:''
      });
    
      const handleChange = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.value
        });
      };

    return (
        <form
        autoComplete="off"
        noValidate
        {...props}
      >
   <Grid
  container
  alignItems="center"
  justify="center"
  width="50%"
  align="center"
 >
        <Card>
          <CardHeader
            subheader="Please fill in your information."
            title="Profile"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={4}
                xs={12}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={4}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={4}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Nickname"
                  name="nickname"
                  onChange={handleChange}
                  required
                  value={values.nickname}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={4}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  onChange={handleChange}
                  type="number"
                  required
                  value={values.age}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={4}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Height"
                  name="height"
                  onChange={handleChange}
                  type="number"
                  endAdornment={<InputAdornment position="end">in.</InputAdornment>}
                  required
                  value={values.height}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={4}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Education"
                  name="education"
                  onChange={handleChange}
                  required
                  value={values.education}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                  variant="outlined"
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  multiline
                  label="Favorite Activities"
                  name="activities"
                  onChange={handleChange}
                  required
                  value={values.activities}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  multiline
                  label="Tell us more about you:"
                  name="aboutUser"
                  onChange={handleChange}
                  required
                  value={values.aboutUser}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          >
            <Button
              color="primary"
              variant="contained"
            >
              Create Profile
            </Button>
          </Box>
        </Card>
        </Grid>
      </form>
    )
}

export default CreateProfile

