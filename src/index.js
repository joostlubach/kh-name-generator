import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

window.NameGenerator = {
	render(element) {
		ReactDOM.render(<App />, element)
	},

	onNameChosen(name) {}
}