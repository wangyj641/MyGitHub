import '@/styles/globals.css'
import Layout from '@/components/Layout'
import App from 'next/app'
import WithReduxHoc from '../lib/with-redux.tsx'
import { Provider } from 'react-redux'
import PageLoading from '@/components/PageLoading'

class MyApp extends App {
  state = {
    context: 'value'
  }

  static async getInitialProps(ctx) {
    const { Component } = ctx
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <PageLoading />
        <Layout>
          <Component {...pageProps} />
        </Layout >
      </Provider>
    )
  }
}

export default WithReduxHoc(MyApp)
