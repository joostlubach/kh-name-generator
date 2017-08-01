import React from 'react'
import {Button} from '../components'
import store from '../store'
import * as actions from '../actions'
import './ResultScreen.css'

export default class ResultScreen extends React.Component {

  componentWillMount() {
    this.subscription = store.subscribe(state => {
      this.setState(state.result || {})
    })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  render() {
    return (
      <div className="ResultScreen">
        {this.renderResult()}

        <div className="ResultScreen-buttons">
	        <Button
	          label="NIEUWE NAAM"
	          onClick={this.onTryAgainClick.bind(this)}
	        />
          <Button
            label="BEGIN OPNIEUW"
            onClick={this.onStartOverClick.bind(this)}
          />
        </div>
      </div>
    )
  }

  renderResult() {
    const {name} = this.state

    return (
      <div className="ResultScreen-result">
        <div className="ResultScreen-resultLabel">
          Wat dacht je van:
        </div>
        <div className="ResultScreen-resultName">
          {name}
        </div>
      </div>
    )
  }

  onTryAgainClick() {
    actions.generateName()
  }

  onStartOverClick() {
    actions.startOver()
  }

}