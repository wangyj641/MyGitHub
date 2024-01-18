import React from "react"
import initializeStore from '../store/store'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore(initialState) {
  // if (!initialState)
  //   console.log('----------------- initialState is null -----------------')
  if (isServer) {
    console.log('-------------- isServer -------------')
    return initializeStore(initialState)
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

export default (AppComp) => {
  class WithReduxApp extends React.Component {
    constructor(props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    render() {
      const { Component, pageProps, ...rest } = this.props
      //console.log(Component, pageProps, rest)

      return (
        <AppComp
          Component={Component}
          pageProps={pageProps}
          {...rest}
          reduxStore={this.reduxStore}
        />
      )
    }
  }

  WithReduxApp.getInitialProps = async (ctx) => {
    let reduxStore

    if (isServer) {
      const { req } = ctx.ctx
      const session = req.session

      if (session && session.userInfo) {
        console.log(session.userInfo)
        reduxStore = getOrCreateStore({
          user: session.userInfo
        })
      } else {
        console.log('-------------------- fail to get session -------------------')
        reduxStore = getOrCreateStore()
      }
    }
    else {
      reduxStore = getOrCreateStore()
    }

    ctx.reduxStore = reduxStore

    let appProps = {}
    if (typeof AppComp.getInitialProps === "function") {
      appProps = await AppComp.getInitialProps(ctx)
    }

    return {
      ...appProps,
      initialReduxState: reduxStore.getState()
    }
  }

  return WithReduxApp
}
