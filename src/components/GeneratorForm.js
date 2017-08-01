import React from 'react'
import PropTypes from 'prop-types'
import {TextField, RadioButtonList, KeywordsField} from '.'
import './GeneratorForm.css'
import store from '../store'
import {Set} from 'immutable'

export default class GeneratorForm extends React.Component {

	static propTypes = {
		className: PropTypes.string
	}

	state = {
		data:    {},
		invalid: new Set()
	}

	componentWillMount() {
		this.subscription = store.subscribe(state => {
			this.setState({data: state.form})
		})
	}

	componentWillUnmount() {
		this.subscription.remove()
	}

	render() {
		const {className} = this.props
		const {invalid, data} = this.state

		return (
			<div className={`GeneratorForm ${className || ''}`}>

				<FormRow label="1. What is your own name?">
					<TextField
						value={data.ownName || ''}
						onChange={value => { this.update({ownName: value}) }}
						invalid={invalid.has('ownName')}
					/>
				</FormRow>

				<FormRow label="2. Choose a theme">
					<RadioButtonList
						choices={[
							{value: 'business', label: "Business-y"},
							{value: 'classic',  label: "Classic / French"},
							{value: 'hip',      label: "Hip"}
						]}
						value={data.theme}
						invalid={invalid.has('theme')}
						onChange={value => { this.update({theme: value}) }}
					/>
				</FormRow>

				<FormRow
					label="3. Enter any keywords for your business"
					instruction="Separate the keywords with comma's."
				>
					<KeywordsField
						value={data.keywords}
						invalid={invalid.has('keywords')}
						onChange={value => { this.update({keywords: value}) }}
					/>
				</FormRow>

			</div>
		)
	}

	update(newData) {
		const {invalid, data} = this.state
		store.setState({form: {...data, ...newData}})
		this.setState({invalid: invalid.subtract(Object.keys(newData))})
	}

	validate() {
		const {data} = this.state

		let invalid = new Set()
		if (data.ownName == null || data.ownName.trim().length === 0) {
			invalid = invalid.add('ownName')
		}

		if (data.theme === 'hip' && data.keywords.length === 0) {
			invalid = invalid.add('keywords')
		}

		this.setState({invalid})
		return invalid.size === 0
	}

}

export function FormRow({label, instruction, children}) {
	return (
		<div className="GeneratorForm-row">
			<div className="GeneratorForm-row-label">
				{label}
			</div>
			<div className="GeneratorForm-row-content">
				{children}
			</div>
			{instruction &&
				<div className="GeneratorForm-row-instruction">
					{instruction}
				</div>
			}
		</div>
	)
}