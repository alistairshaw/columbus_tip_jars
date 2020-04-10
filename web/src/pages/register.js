import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Container from '@material-ui/core/Container'
import FormErrors from '../utils/form-errors'
import Grid from '@material-ui/core/Grid'
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import { Button } from '@material-ui/core'
import { FormControl } from '@material-ui/core'
import { Formik } from 'formik'
import { makeStyles } from '@material-ui/core/styles'

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

const Register = () => {
  const classes = useStyles()
  const [formErrors, setFormErrors] = useState([])

  return (
    <Container>
      <Card className={classes.root}>
        <Formik
          initialValues={{
            email: '',
            password: '',
            password2: '',
          }}
          onSubmit={({ email, password }, { setSubmitting }) => {
            return axios.post('http://localhost:3000/api/v1/auth/register', {
              user: {
                email,
                password,
              },
            }).then(() => {
              setSubmitting(false)
            }).catch(({ response: { data: { errors } } }) => {
              setFormErrors(errors)
            })
          }}
          validate={(values) => {
            const errors = {}
            if (!values.email) {
              errors.email = 'Required'
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address'
            }

            if (values.password !== values.password2){
              errors.password = 'Your passwords must match'
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
                  Register
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

                <div>
                  <FormControl className={classes.formInputs}>
                    <TextField
                      aria-describedby={'password2'}
                      error={!!errors.password}
                      helperText={errors.password && touched.password && errors.password}
                      label={'Password Again'}
                      name={'password2'}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type={'password'}
                      value={values.password2}
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
                      Sign Up
                    </Button>
                  </Grid>
                  <Grid
                    item className={classes.fullWidth}
                    xs={12}
                  >
                    Already have an account? <a href={'/login'}>Log In</a>
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

export default Register
