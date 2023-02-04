import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login, getClass, getLocation } from '../util/apiCaller.ts';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const userName = {
    email: data.get('email') as string,
    password: data.get('password') as string,
  }
  const token = await login(userName)
  return { userName, token }
};
export default function SignIn() {
  const userContext = React.useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmitWrapper = async (event: React.FormEvent<HTMLFormElement>) => {
    const token = await handleSubmit(event)
    userContext.setUserObject(token)
    const classes = await getClass(token, '17,9,86,8,6,4,48,49,42,10,15')
    const dateClasses = classes.data.classes.reduce((p, c) => {
      if (!p || p.length === 0) return [[c]]
      if (p[p.length - 1][0].start_date !== c.start_date) {
        return [...p, [c]]
      }
      else {
        let b3 = p.pop()
        b3 = [...b3, c]
        return [...p, b3]
      }
    }
      , [])
    const classType = classes.data.classes.map(i=>i.class_type.name).filter((v, i, a) => a.indexOf(v)===i)
    
    const location_list = await getLocation(token)
    const _loc_list = location_list.data.locations
    // console.log(token)
    setTimeout(() => console.log(userContext.userObject), 5000)
    navigate('/viewclass', { state: { jwt: token, list: dateClasses, locations: _loc_list, classType: classType } });
  }
  // useEffect(()=>{
  //   fetch("https://pure360.pure-fitness.com/en/HK?location_ids=17,9,86")
  // }, [])
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmitWrapper} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password? Call pure
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Pay"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        {/* <iframe  is="x-frame-bypass" src="https://pure360.pure-fitness.com/en/HK?location_ids=17,9,86"></iframe> */}
      </Container>
    </ThemeProvider>
  );
}