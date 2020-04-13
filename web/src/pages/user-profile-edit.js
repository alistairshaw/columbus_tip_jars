import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormErrors from '../components/form-errors'
import FormLabel from '@material-ui/core/FormLabel'
import MuiAlert from '@material-ui/lab/Alert'
import React, { useEffect, useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
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
import { DropzoneArea } from 'material-ui-dropzone'
import { Formik } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

const useStyles = makeStyles({
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
  successBanner: {
    top: 85,
  },
  formLabel: {
    fontSize: 12,
    marginBottom: 10,
  },
})

const UserProfileEdit = () => {
  const classes = useStyles()
  const [formErrors, setFormErrors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [formValues, setFormValues] = useState({
    id: null,
    user_name: '',
  })

  const router = useRouter()
  const { isLoggedIn, getUserProfile, updateUserProfile } = useAuth()

  useEffect(() => {
    if (isLoggedIn){
      // If user is logged in, show loading & fetch their profile data
      getUserProfile().then( ({ resource }) => {
        setFormValues({
          id: resource.id,
          user_name: resource.user_name,
        })
        setIsLoading(false)
      }).catch( () => {
        setIsLoading(false)
      })
    } else {
      // If user is logged out, kick them to the sign-in
      router.push('/login')
    }

  }, [isLoggedIn, router, getUserProfile, setFormValues])

  const handleChange = (files) => {
    console.log('image upload', files)
    setFormValues({
      ...formValues,
      image: files,
    })
  }

  return (

    <Container>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color={'inherit'} />
      </Backdrop>
      <Card >
        <Formik
          enableReinitialize={true}
          initialValues={formValues}
          onSubmit={(formData, { setSubmitting }) => {
            setIsLoading(true)
            setFormErrors([])
            const newProfile = !formData.id
            return updateUserProfile(newProfile, formData).then(() => {
              setSubmitting(false)
              setIsLoading(false)
              setSaveSuccess(true)
            }).catch(({ response: { data: { errors } } }) => {
              setFormErrors(errors)
              setSubmitting(false)
              setIsLoading(false)
            })
          }}
        >
          {(formProps) => (
            <div>
              <CardContent>
                <Snackbar
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  autoHideDuration={6000}
                  className={classes.successBanner}
                  onClose={() => setSaveSuccess(false)} open={saveSuccess}
                >
                  <MuiAlert
                    elevation={6} severity={'success'}
                    variant={'filled'}
                  >
                    Profile Updated
                  </MuiAlert>
                </Snackbar>
                <Typography
                  gutterBottom className={classes.title}
                  color={'textPrimary'}
                >
                  Edit Your User Profile
                </Typography>
                <form onSubmit={formProps.handleSubmit}>
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
                  <FormControl className={classes.formInputs}>
                    <FormLabel className={classes.formLabel}>
                      Upload a Photo
                    </FormLabel>
                    <DropzoneArea
                      onChange={() => handleChange(this)}
                    />
                  </FormControl>

                </form>
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
