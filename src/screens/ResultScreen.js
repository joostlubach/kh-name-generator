import React from 'react'
import {Button} from '../components'
import store from '../store'
import * as actions from '../actions'
import './ResultScreen.css'

export default class ResultScreen extends React.Component {

  componentWillMount() {
    this.subscription = store.subscribe(state => {
      this.setState({...state.result, exhausted: state.exhausted})
    })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  render() {
    const {exhausted} = this.state

    return (
      <div className="ResultScreen">
        {exhausted && this.renderExhausted()}
        {!exhausted && this.renderResult()}

        <div className="ResultScreen-buttons">
	        {!exhausted &&
            <Button
	            label="NIEUWE NAAM"
	            onClick={this.onTryAgainClick.bind(this)}
	          />
          }
          <Button
            label="BEGIN OPNIEUW"
            onClick={this.onStartOverClick.bind(this)}
          />
        </div>
      </div>
    )
  }

  renderExhausted() {
    return (
      <div className="ResultScreen-exhausted">
        <div className="ResultScreen-exhaustedLabel">
          Pfoei! Er zijn helemaal geen namen meer over. Probeer wat andere trefwoorden of een andere soort naam!
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