import '@/styles/globals.css'
import Layout from '@/components/Layout'
import App from 'next/app'
import WithReduxHoc from '../lib/with-redux.tsx'
import { Provider } from 'react-redux'

class MyApp extends App {
  state = {
    context: 'value'
  }

  static async getInitialProps(ctx) {
    console.log('------ app getInitialProps ------')
    const { Component } = ctx
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    console.log('---------------- App getInitialProps ----------------')
    console.log(pageProps)

    return { pageProps }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    console.log('---------------- App render ----------------')
    console.log(reduxStore)
    return (
      <Provider store={reduxStore}>
        <Layout>
          <Component {...pageProps} />
        </Layout >
      </Provider>
    )
  }
}

export default WithReduxHoc(MyApp)
