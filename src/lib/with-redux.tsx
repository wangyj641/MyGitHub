import { combineReducers, applyMiddleware } from 'redux'
import React from "react"
import createSore from '../store/store'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore(initialState) {
  if (isServer) {
    return createSore(initialState)
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createSore(initialState)
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
      console.log(Component, pageProps, rest)
      if (pageProps) {
        pageProps.test = "123"
      }

      return (
        <AppComp
          Component={Component}
          pageProps={pageProps}
          reduxStore={this.reduxStore}
          {...rest}
        />
      );
    }
  }

  WithReduxApp.getInitialProps = async (ctx) => {
    let appProps = {}
    if (typeof AppComp.getInitialProps === "function") {
      appProps = await AppComp.getInitialProps(ctx)
    }

    const reduxStore = getOrCreateStore()

    return {
      ...appProps,
      initialReduxState: reduxStore.getState()
    }
  }

  return WithReduxApp
}
