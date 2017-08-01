import React, { Component } from 'react'
import {GeneratorForm, Button} from '../components'
import * as actions from '../actions'
import './FormScreen.css'

export default class FormScreen extends Component {

  generateName() {
    if (this.form == null) { return }
    if (!this.form.validate()) { return }

    actions.generateName()
  }

  render() {
    return (
      <div className="FormScreen">
      	<GeneratorForm
          className="FormScreen-form"
          ref={el => { this.form = el }}
        />

        <div className="FormScreen-buttons">
	        <Button
	          label="GENERATE"
	          onClick={this.onGenerateClick.bind(this)}
	        />
        </div>
      </div>
    )
  }

  onGenerateClick() {
    this.generateName()
  }

}