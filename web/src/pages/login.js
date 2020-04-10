import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Container from '@material-ui/core/Container'
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
  loginBtn: {
    flex: 1,
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
    console.log('API Call', form)
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
        <CardActions align={'right'}>
          <Button
            className={classes.loginBtn}
            onClick={handleSubmitLogin}
            size={'small'}
          >Login
          </Button>
        </CardActions>
      </Card>
    </Container>
  )
}

export default Login
