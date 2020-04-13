import IndexPage from 'src/pages/index'
import React from 'react'
import mount from 'test/support/mount'

describe('<IndexPage />', () => {
  it('renders the text', () => {
    const { getByText } = mount(<IndexPage />)
    expect(getByText('Welcome to Columbus Tip Jars')).toBeInTheDocument()
  })
})
