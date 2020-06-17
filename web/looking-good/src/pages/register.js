import FormErrors from 'src/components/form-errors'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import useAuth from 'src/hooks/use-auth'
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
import { useRouter } from 'next/router'
import { initGA, logPageView } from "./../utils/analytics"

export default function Register() {
  const classes = useStyles()
  const router = useRouter()
  const [formErrors, setFormErrors] = useState([])
  const { isLoggedIn, register } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/')
    }
    initGA()
    logPageView()
  })

  const initialFormValues = {
    email: '',
    password: '',
    password2: '',
  }

  const onFormSubmit = ({ email, password }, { setSubmitting }) => {
    return register(email, password).then(() => {
      setSubmitting(false)
      router.push('/')
    }).catch(({ response: { data: { errors } } }) => {
      setFormErrors(errors)
    })
  }

  const onFormValidate = (values) => {
    const errors = {}

    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }

    if (values.password !== values.password2){
      errors.password = 'Your passwords must match'
    }

    return errors
  }

  return (
    <Container>
      <Card className={classes.root}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={onFormSubmit}
          validate={onFormValidate}
        >
          {(formProps) => (
            <form onSubmit={formProps.handleSubmit}>
              <CardContent>
                <Typography
                  gutterBottom className={classes.title}
                  color={'textPrimary'}
                >
                  Register
                </Typography>
                <FormControl className={classes.formInputs}>
                  <TextField
                    aria-describedby={'email'}
                    error={!!formProps.errors.email}
                    helperText={formProps.errors.email && formProps.touched.email && formProps.errors.email}
                    id={'email'}
                    label={'Email'}
                    name={'email'}
                    onBlur={formProps.handleBlur} onChange={formProps.handleChange}
                    value={formProps.values.email}
                  />
                </FormControl>
                <FormControl className={classes.formInputs}>
                  <TextField
                    aria-describedby={'password'}
                    error={!!formProps.errors.password}
                    helperText={formProps.errors.password && formProps.touched.password && formProps.errors.password}
                    label={'Password'}
                    name={'password'}
                    onBlur={formProps.handleBlur}
                    onChange={formProps.handleChange}
                    type={'password'}
                    value={formProps.values.password}
                  />
                </FormControl>
                <FormControl className={classes.formInputs}>
                  <TextField
                    aria-describedby={'password2'}
                    error={!!formProps.errors.password}
                    helperText={formProps.errors.password && formProps.touched.password && formProps.errors.password}
                    label={'Password Again'}
                    name={'password2'}
                    onBlur={formProps.handleBlur}
                    onChange={formProps.handleChange}
                    type={'password'}
                    value={formProps.values.password2}
                  />
                </FormControl>
                <FormErrors errors={formErrors} />
              </CardContent>
              <CardActions>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Button
                      className={classes.fullWidth}
                      color={'primary'} disabled={formProps.isSubmitting}
                      onClick={formProps.handleSubmit}
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
                    {'Already have an account? '}
                    <Link href={'/login'} >
                      <a>Log In</a>
                    </Link>
                  </Grid>
                </Grid>
              </CardActions>
            </form>
          )}
        </Formik>
      </Card>
    </Container>
  )
}

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
