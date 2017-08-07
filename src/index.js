import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as actions from './actions'

window.NameGenerator = {
	basePath: '',

	render(element) {
		ReactDOM.render(<App />, element)
	},

	startOver(clearForm) {
		actions.startOver(clearForm)
	},

	onNameChosen(name) {}
}