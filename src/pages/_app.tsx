import '@/styles/globals.css'
import Layout from '@/components/Layout'
import App from 'next/app'
import withReduxHoc from '../lib/with-redux.tsx'
import { Provider } from 'react-redux'

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Layout>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>

      </Layout>
    )
  }
}

export default withReduxHoc(MyApp)
