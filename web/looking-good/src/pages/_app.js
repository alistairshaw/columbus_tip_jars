import AuthProvider from 'src/contexts/auth-context'
import Nav from 'src/components/nav'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import appTheme from 'src/utils/theme'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'

export default function App({ Component, pageProps }) {
  const classes = useStyles()

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <AuthProvider>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <div className={classes.root} >
          <Nav />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Component {...pageProps} />
          </main>
        </div>
      </ThemeProvider>
    </AuthProvider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(10),
    background: '#FFFFFF',
  },
  root: {
    display: 'flex',
    color: '#4b4f53',
    fontSize: 16,
  },
  toolbar: theme.mixins.toolbar,
}))
