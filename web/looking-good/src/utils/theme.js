import { createMuiTheme } from '@material-ui/core/styles'
import { pink } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      //main: '#4300FF',
      main: '#2839aa',
    },
    secondary: {
      //main: '#13efc3',
      main: '#13efc3',
    },
    error: {
      main: pink.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: 'Raleway',
  },
  spacing: 4,
})

export default theme
