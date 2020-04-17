import AuthProvider from 'src/contexts/auth-context'
import React from 'react'
import appTheme from 'src/utils/theme'
import { ThemeProvider } from '@material-ui/core/styles'
import { render } from '@testing-library/react'

export default function mount(children) {
  return render(
    <AuthProvider>
      <ThemeProvider theme={appTheme}>
        {children}
      </ThemeProvider>
    </AuthProvider>,
  )
}
