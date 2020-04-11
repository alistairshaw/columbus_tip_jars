import AuthService from '../utils/auth-service'
import FormErrors from '../utils/form-errors'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { Formik } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
const auth = new AuthService()

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
  const [formErrors, setFormErrors] = useState([])

  useEffect(() => {
    // Update the document title using the browser API
    if (auth.loggedIn()) {
      window.location = '/'
    }
  }, [])

  return (
    <Container>
      <Card className={classes.root}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={({ email, password }, { setSubmitting }) => {
            setFormErrors([])
            return auth.login(email, password).then(() => {
              setSubmitting(false)
              window.location = '/'
            }).catch(({ response: { data: { errors } } }) => {
              setFormErrors(errors)
            })
          }}
          validate={(values) => {
            const errors = {}
            if (!values.email) {
              errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ) {
              errors.email = 'Invalid email address'
            }
            return errors
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <div>
              <CardContent>
                <Typography
                  gutterBottom className={classes.title}
                  color={'textPrimary'}
                >
                  Log In
                </Typography>
                <div>
                  <FormControl className={classes.formInputs}>
                    <TextField
                      aria-describedby={'email'}
                      error={!!errors.email}
                      helperText={errors.email && touched.email && errors.email}
                      id={'email'}

                      label={'Email'}
                      name={'email'}
                      onBlur={handleBlur} onChange={handleChange}
                      value={values.email}
                    />
                  </FormControl>
                </div>

                <div>
                  <FormControl className={classes.formInputs}>
                    <TextField
                      aria-describedby={'password'}
                      error={!!errors.password}
                      helperText={errors.password && touched.password && errors.password}
                      label={'Password'}
                      name={'password'}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type={'password'}
                      value={values.password}
                    />
                  </FormControl>
                </div>
                <FormErrors errors={formErrors} />
              </CardContent>
              <CardActions>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Button
                      className={classes.fullWidth}
                      color={'primary'} disabled={isSubmitting}
                      onClick={handleSubmit}
                      size={'small'}
                      type={'submit'}
                      variant={'contained'}
                    >
                      Log In
                    </Button>
                  </Grid>
                  <Grid
                    item className={classes.fullWidth}
                    xs={12}
                  >
                    Need an account? <a href={'/register'} >Sign Up</a>
                  </Grid>
                </Grid>
              </CardActions>
            </div>
          )}
        </Formik>
      </Card>
    </Container>
  )
}

export default Login

