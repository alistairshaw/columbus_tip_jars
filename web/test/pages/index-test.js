import IndexPage from 'src/pages/index'
import React from 'react'
import { render } from '@testing-library/react'

describe('<IndexPage />', () => {
  it('renders the text', () => {
    const { getByText } = render(<IndexPage />)
    expect(getByText('Welcome to the Columbus Tip Jars')).toBeInTheDocument()
  })
})
