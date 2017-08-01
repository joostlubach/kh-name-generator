import React from 'react'
import PropTypes from 'prop-types'
import {RadioButton} from '.'
import './RadioButtonList.css'

export default class RadioButtonList extends React.Component {

	static propTypes = {
		value:    PropTypes.string,
		choices:  PropTypes.arrayOf(PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired
		})),
		onChange: PropTypes.func.isRequired
	}

	static defaultProps = {
		onChange: () => undefined
	}

	render() {
		const {choices} = this.props

		return (
			<div className="RadioButtonList">
				{choices.map(this.renderChoice.bind(this))}
			</div>
		)
	}

	renderChoice(choice) {
		const {value, label} = choice
		const selected = value === this.props.value

		return (
			<div
				className="RadioButtonList-choice"
				key={value}
				tabIndex={0}
				onClick={this.onChoiceClick.bind(this, value)}
			>
				<RadioButton
					className="RadioButtonList-choiceRadioButton"
					checked={selected}
				/>
				<span className="RadioButtonList-choiceLabel">
					{label}
				</span>
			</div>
		)
	}

	onChoiceClick(value) {
		this.props.onChange(value)
	}

}