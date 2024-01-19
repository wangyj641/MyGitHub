import '@/styles/globals.css'
import Layout from '@/components/Layout'
import App from 'next/app'
import WithReduxHoc from '../lib/with-redux.tsx'
import { Provider } from 'react-redux'
import PageLoading from '@/components/PageLoading'
import Router from 'next/router.js'
import Link from "next/link"
import axios from 'axios'

class MyApp extends App {
  state = {
    context: 'value',
    loading: false
  }

  startLoading = () => {
    console.log('----------------- app start loading -----------------')
    this.setState({
      loading: true
    })
  }

  stopLoading = () => {
    console.log('----------------- app stop loading -----------------')
    this.setState({
      loading: false
    })
  }

  componentDidMount() {
    console.log('----------------- app did mount -----------------')
    Router.events.on('routeChangeStart', this.startLoading)
    Router.events.on('routeChangeComplete', this.stopLoading)
    Router.events.on('routeChangeError', this.stopLoading)
  }

  componentWillUnmount() {
    console.log('----------------- app will unmount -----------------')
    Router.events.off('routeChangeStart', this.startLoading)
    Router.events.off('routeChangeComplete', this.stopLoading)
    Router.events.off('routeChangeError', this.stopLoading)
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
        {this.state.loading ? <PageLoading /> : null}
        <Layout>
          <Link legacyBehavior href="/">
            <a>index</a>
          </Link>
          <Link legacyBehavior href="/detail">
            <a>detail</a>
          </Link>
          <Component {...pageProps} />
        </Layout >
      </Provider>
    )
  }
}

export default WithReduxHoc(MyApp)
