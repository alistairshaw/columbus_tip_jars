import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import React, {useState} from 'react'
import Typography from '@material-ui/core/Typography'
import {Button} from '@material-ui/core'
import {
  FormControl,
  Input,
  InputLabel,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: '30px auto 0',
  },
  title: {
    fontSize: 18,
  },
  formInputs: {
    width: '100%',
    marginBottom: 15,
  },
  fullWidth: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
  },
})

const Login = () => {
  const classes = useStyles()
  let [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setForm({...form, [name]: value})
  }

  const handleSubmitLogin = () => {
    //console.log('API Call', form)
    // Make API call here
  }

  return (
    <Container>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            gutterBottom className={classes.title}
            color={'textPrimary'}
          >
            Login
          </Typography>
          <div>
            <FormControl className={classes.formInputs}>
              <InputLabel htmlFor={'email'}>Email address</InputLabel>
              <Input
                aria-describedby={'email'}
                autoComplete={'off'}
                id={'email'}
                name={'email'}
                onChange={(e) => {
                  handleInputChange(e)
                }} value={form.email}
              />
            </FormControl>
          </div>

          <div>
            <FormControl className={classes.formInputs}>
              <InputLabel htmlFor={'password'}>Password</InputLabel>
              <Input
                aria-describedby={'password'}
                name={'password'}
                onChange={(e) => {
                  handleInputChange(e)
                }} value={form.password}
              />
            </FormControl>
          </div>

        </CardContent>
        <CardActions>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                className={classes.fullWidth} color={'primary'}
                onClick={handleSubmitLogin}
                size={'small'}
                variant={'contained'}
              >
                Log In
              </Button>
            </Grid>
            <Grid item xs={12}>
              <a
                className={classes.fullWidth}
                href={'/register'}
              >Sign Up
              </a>
            </Grid>
          </Grid>

        </CardActions>
      </Card>
    </Container>
  )
}

export default Login
