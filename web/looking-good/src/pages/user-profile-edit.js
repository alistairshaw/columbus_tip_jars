import Button from '@material-ui/core/Button'
import FormErrors from 'src/components/form-errors'
import FormHelperText from '@material-ui/core/FormHelperText'
import MuiAlert from '@material-ui/lab/Alert'
import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import useAuth from 'src/hooks/use-auth'
import {
  Avatar,
  Backdrop,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from '@material-ui/core'
import { Formik } from 'formik'
import { useRouter } from 'next/router'

const useStyles = makeStyles({
  avatar: {
    width: 250,
    height: 250,
  },
  avatarLabel: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    '& p': {
      position: 'absolute',
      background: 'rgba(255,255,255,0.5)',
      padding: '10px',
      display: 'none',
      fontWeight: 'bold',
      borderRadius: '3px',
    },
    '&:hover': {
      cursor: 'pointer',
      '& p': {
        display: 'block',
      },
    },
  },
  deleteProfileContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteProfileButton: {
    backgroundColor: 'red',
    color: 'white',
  },
  formInputs: {
    width: '100%',
    marginBottom: 30,
  },
  fullWidth: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
  },
  successBanner: {
    top: 85,
  },
})

const onProfileValidate = (formValues) => {
  const errors = {}
  if (!formValues.user_name) {
    errors.user_name = 'Required'
  }
  let urlpattern = RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i',
  )
    
  // video link this don't absolutely need to be required, but more importantly, they should be able to have multiples
  if (!formValues.video_url) {
    errors.video_url = 'Required'
  } else if (urlpattern.exec(formValues.video_url) === null) {
    errors.video_url = 'Invalid URL'
  }
  if (!formValues.tip_url) {
    errors.tip_url = 'Required'
  } else if (urlpattern.exec(formValues.tip_url) === null) {
    errors.tip_url = 'Invalid URL'
  } else if (urlpattern.exec(formValues.tip_url)[1] === undefined) {
    errors.tip_url = 'Please include http:// or https://'
  }

  return errors
}

const blankForm = {
  id: null,
  user_name: '',
  profile_pic: null,
  business_name: '',
  category: 'Stylist',
  specialty: '',
  tip_url: '',
  video_url: '',
  blurb: '',
}

const UserProfileEdit = () => {
  const classes = useStyles()
  const [formErrors, setFormErrors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [formValues, setFormValues] = useState(blankForm)
  const router = useRouter()
  const { isLoggedIn, getUserProfile, updateUserProfile, deleteUserProfile } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      // If user is logged in, show loading & fetch their profile data
      getUserProfile().then(({ resource }) => {
        setFormValues({
          id: resource.id,
          user_name: resource.user_name,
          profile_pic: resource.avatar,
          category: resource.category ?? '',
          business_name: resource.business_name,
          specialty: resource.specialty,
          tip_url: resource.tip_url,
          video_url: resource.video_url,
          blurb: resource.blurb,
        })
        setIsLoading(false)
      }).catch(() => {
        setIsLoading(false)
      })
    } else {
      // If user is logged out, kick them to the sign-in
      router.push('/login')
    }

  }, [isLoggedIn, router, getUserProfile, setFormValues])

  const saveButton = (formData, { setSubmitting }) => {
    setIsLoading(true)
    setFormErrors([])
    const newProfile = !formData.id
    return updateUserProfile(newProfile, formData).then((response) => {
      setSubmitting(false)
      setIsLoading(false)
      setSaveSuccess(true)
      const newFormValues = {
        ...formValues,
        ...response.resource,
        avatar: undefined,
        profile_pic: response.resource.avatar,
      }
      setFormValues(newFormValues)
    }).catch(({ response: { data: { errors } } }) => {
      setFormErrors(errors)
      setSubmitting(false)
      setIsLoading(false)
    })
  }

  const deleteButton = () => {
    setIsLoading(true)
    setFormErrors([])
    deleteUserProfile().then(() => {
      setFormValues(blankForm)
      setIsLoading(false)
    })
  }

  return (

    <Container>
      <Backdrop open={isLoading}>
        <CircularProgress color={'inherit'} />
      </Backdrop>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={saveButton}
        validate={onProfileValidate}
      >
        {(formProps) => (
          <div>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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
            <h1>Welcome!</h1>
            <h2 style={{ marginBottom: 60 }}>
              Tip Columbus lets you show off your skills & best advice and lets everyone else tip you for your excellence!
            </h2>
            <div>
              <Grid container spacing={3}>
                <Grid
                  item
                  lg={3}
                  md={6}
                  xs={12}
                >
                  <FormControl className={classes.formInputs}>
                    <label className={classes.avatarLabel}>
                      <Avatar
                        alt={formProps.values.user_name}
                        className={classes.avatar}
                        src={formProps.values.profile_pic}
                      />
                      <p>Click to Update</p>
                      <input
                        id={'avatar'}
                        name={'avatar'}
                        onChange={(event) => {
                          formProps.setFieldValue('avatar', event.currentTarget.files[0])
                          formProps.submitForm()
                        }}
                        style={{ display: 'none' }}
                        type={'file'}
                      />
                    </label>
                  </FormControl>
                         
                </Grid>
                <Grid
                  item
                  lg={9}
                  md={6}
                  xs={12}
                >
                  <FormControl className={classes.formInputs}>
                    <TextField
                      aria-describedby={'user_name'}
                      error={!!formProps.errors.user_name}
                      helperText={'You can use a nickname if you prefer'}
                      id={'user_name'}
                      label={'Your Name'}
                      name={'user_name'}
                      onBlur={formProps.handleBlur}
                      onChange={formProps.handleChange}
                      value={formProps.values.user_name}
                    />
                  </FormControl>
                  <FormControl className={classes.formInputs}>
                    <TextField
                      aria-describedby={'business_name'}
                      error={!!formProps.errors.business_name}
                      helperText={'If you normally work at business, tell us that business name to make you easier to find'}
                      id={'business_name'}
                      label={'Business Name'}
                      name={'business_name'}
                      onBlur={formProps.handleBlur}
                      onChange={formProps.handleChange}
                      value={formProps.values.business_name}
                    />
                  </FormControl>
                  <FormControl className={classes.formInputs}>
                    <Select
                      aria-describedby={'category'}
                      error={!!formProps.errors.category}
                      name={'category'}
                      onBlur={formProps.handleBlur}
                      onChange={formProps.handleChange}
                      value={formProps.values.category ? formProps.values.category : 'Stylist'}
                    >
                      <MenuItem value={'stylists'}>Stylist</MenuItem>
                      <MenuItem value={'artists'}>Artist</MenuItem>
                      <MenuItem value={'musicians'}>Musician</MenuItem>
                      <MenuItem value={'bartenders'}>Bartender</MenuItem>
                    </Select>
                    <FormHelperText>Choose the relevant category</FormHelperText>
                  </FormControl>
                  <FormControl className={classes.formInputs}>
                    <TextField
                      aria-describedby={'specialty'}
                      error={!!formProps.errors.specialty}
                      helperText={'e.g. Hair Stylist, Muralist, Mixologist, Ninja'}
                      id={'specialty'}
                      label={'Specialty or Title'}
                      name={'specialty'}
                      onBlur={formProps.handleBlur}
                      onChange={formProps.handleChange}
                      value={formProps.values.specialty}
                    />
                  </FormControl>
                  <FormControl className={classes.formInputs}>
                    <TextField
                      aria-describedby={'tip_url'}
                      error={!!formProps.errors.tip_url}
                      helperText={(formProps.errors.tip_url && formProps.errors.tip_url !== 'Required') ? formProps.errors.tip_url : 'e.g. Paypal.me page, venmo link - whatever you\'ve got!)'}
                      id={'tip_url'}
                      label={'Give us a link to tip you'}
                      name={'tip_url'}
                      onBlur={formProps.handleBlur}
                      onChange={formProps.handleChange}
                      value={formProps.values.tip_url}
                    />
                  </FormControl>
                  <h2>Now for the fun part....</h2>
                  <p>
                    Record a simple video for your adoring public. Give them ideas for trying one of your favorite techniques, advice for staying sane/stylish/safe/hydrated/hip while socially distancing – or just tell them what you’ve been up to!
                  </p>
                  <FormControl className={classes.formInputs}>
                    <TextField
                      aria-describedby={'video_url'}
                      error={!!formProps.errors.video_url}
                      helperText={'Facebook, YouTube or Instagram video'}
                      id={'video_url'}
                      label={'Link to your video'}
                      name={'video_url'}
                      onBlur={formProps.handleBlur}
                      onChange={formProps.handleChange}
                      value={formProps.values.video_url}
                    />
                  </FormControl>
                  <p>
                    Give us a few words to preview what we’ll see in your vid and encourage your
                    viewers to share, share, share! Make sure to remind them to tag you and
                    use <strong>#TipColumbus</strong> when they post about how awesome you are!
                  </p>
                  <FormControl className={classes.formInputs}>
                    <TextField
                      aria-describedby={'blurb'}
                      error={!!formProps.errors.blurb}
                      helperText={'A few words to preview what we\'ll see in your vid'}
                      id={'blurb'}
                      label={'Video Description'}
                      multiline={true}
                      name={'blurb'}
                      onBlur={formProps.handleBlur}
                      onChange={formProps.handleChange}
                      value={formProps.values.blurb}
                    />
                  </FormControl>

                  <FormErrors errors={formErrors} />

                  <div>
                    <Button
                      color={'primary'} disabled={isLoading}
                      onClick={formProps.handleSubmit} variant={'contained'}
                    >
                      Save Profile
                    </Button>
                  </div>
                         
                  <div className={classes.deleteProfileContainer}>
                    <Button
                     className={classes.deleteProfileButton} color={'default'}
                     onClick={deleteButton} variant={'contained'}
                    >
                     Delete Profile
                    </Button>
                  </div>
                         
                </Grid>
              </Grid>
            </div>
          </div>
        )}
      </Formik>
    </Container>
  )
}

export default UserProfileEdit
