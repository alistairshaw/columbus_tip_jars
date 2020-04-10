import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { ServerStyleSheets } from '@material-ui/core/styles'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head lang={'en'}>
          <meta content={'minimum-scale=1, initial-scale=1, width=device-width'} name={'viewport'} />
          <link
            href={'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;0,800;1,400;1,800&display=swap'}
            rel={'stylesheet'}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

Document.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    })

  const initialProps = await NextDocument.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  }
}
