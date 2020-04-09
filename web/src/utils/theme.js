import { createMuiTheme } from '@material-ui/core/styles'
import { deepOrange, pink } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4300FF',
    },
    secondary: {
      main: deepOrange[500],
    },
    error: {
      main: pink.A400,
    },
    background: {
      default: '#fff',
    },
  },
})

export default theme
