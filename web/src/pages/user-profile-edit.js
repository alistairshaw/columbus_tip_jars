import AuthService from '../utils/auth-service'
import FormErrors from '../components/form-errors'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/use-auth'
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

const UserProfileEdit = () => {
  const classes = useStyles()
  const [formErrors, setFormErrors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [formValues, setFormValues] = useState({
    id: null,
    user_name: '',
    photo_url: '',
  })
  const router = useRouter()
  const { isLoggedIn, getUserProfile, updateUserProfile } = useAuth()

  useEffect(() => {
    if (isLoggedIn){
      // If user is logged in, show loading & fetch their profile data
      console.log('get profile info')
      getUserProfile().then( (res) => {
        console.log('getUserProfile res', res)
        setIsLoading(false)
      }).catch( (err) => {
        console.log('getUserProfile err', err)
        setIsLoading(false)
      })
    } else {
      // If user is logged out, kick them to the sign-in
      router.push('/login')
    }

  }, [isLoggedIn, router, getUserProfile])

  if(isLoading){
    return (
      <span>Loading...</span>
    )
  }

  return (
    <Container>
      <Card className={classes.root}>
        <Formik
          initialValues={formValues}
          onSubmit={(formData, { setSubmitting }) => {
            const newProfile = !formData.id
            return updateUserProfile(newProfile, formData).then(() => {
              setSubmitting(false)
            }).catch(({ response: { data: { errors }} }) => {
              setFormErrors(errors)
              setSubmitting(false)
            })
          }}
          validate={(values) => {
            const errors = {}
            // TODO Add Form Validation Here
            return errors
          }}
        >
          {(formProps) => (
            <div>
              <CardContent>
                <Typography
                  gutterBottom className={classes.title}
                  color={'textPrimary'}
                >
                  Edit Your User Profile
                </Typography>
                <div>
                  <FormControl className={classes.formInputs}>
                    <TextField
                      aria-describedby={'user_name'}
                      error={!!formProps.errors.user_name}
                      helperText={formProps.errors.user_name && formProps.touched.user_name && formProps.errors.user_name}
                      id={'user_name'}
                      label={'Username'}
                      name={'user_name'}
                      onBlur={formProps.handleBlur}
                      onChange={formProps.handleChange}
                      value={formProps.values.user_name}
                    />
                  </FormControl>
                </div>

                <div>
                  <FormControl className={classes.formInputs}>
                    <TextField
                      aria-describedby={'industry'}
                      error={!!formProps.errors.industry}
                      helperText={formProps.errors.industry && formProps.touched.industry && formProps.errors.industry}
                      id={'industry'}
                      label={'Photo'}
                      name={'industry'}
                      onChange={formProps.handleChange}
                      onBlur={formProps.handleBlur}
                      value={formProps.values.industry}
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
                      color={'primary'}
                      disabled={formProps.isSubmitting}
                      onClick={formProps.handleSubmit}
                      size={'small'}
                      type={'submit'}
                      variant={'contained'}
                    >
                      Update
                    </Button>
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

export default UserProfileEdit
