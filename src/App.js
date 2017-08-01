import React, { Component } from 'react'
import {Logo} from './components'
import {FormScreen, GeneratingScreen, ResultScreen} from './screens'
import store from './store'
import './App.css'

export default class App extends Component {

  componentWillMount() {
    this.subscription = store.subscribe(state => {
      this.setState(state)
    })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Logo/>
        </div>

        <div className="App-main">
          {this.renderScreen()}
        </div>
      </div>
    )
  }

  renderScreen() {
    const {generating, result} = this.state

    if (generating) {
      return <GeneratingScreen/>
    } else if (result != null) {
      return <ResultScreen/>
    } else {
      return <FormScreen/>
    }
  }

}