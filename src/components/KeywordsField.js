import React from 'react'
import PropTypes from 'prop-types'
import AutosizeInput from 'react-input-autosize'
import './KeywordsField.css'

export default class KeywordsField extends React.Component {

	static propTypes = {
		value:    PropTypes.arrayOf(PropTypes.string).isRequired,
		invalid:  PropTypes.bool.isRequired,
		onChange: PropTypes.func.isRequired
	}

	static defaultProps = {
		value:    [],
		invalid:  false,
		onChange: () => undefined
	}

	state = {
		partialKeyword: ''
	}

	splitPartialKeyword(partialKeyword, includeAll) {
		let lastComma = includeAll
			? partialKeyword.length
			: partialKeyword.lastIndexOf(',')

		// Keep the text after the last comma, so users can continue typing.
		this.setState({partialKeyword: partialKeyword.slice(lastComma + 1)})

		// Stop processing if there was no comma.
		if (lastComma === -1) { return }

		// Extract keywords.
		const keywords = partialKeyword
			.slice(0, lastComma)
			.split(',')
			.map(keyword => keyword.trim())
			.filter(keyword => keyword.length > 0)

		// Add the keywords to our value.
		this.addKeywords(keywords)
	}

	addKeywords(keywords) {
		const {value, onChange} = this.props

		const newValue = [...value, ...keywords]
		onChange(newValue)
	}

	removeKeywordAt(index) {
		const keywords = [...this.props.value]
		keywords.splice(index, 1)
		this.props.onChange(keywords)
	}

	removeLastKeyword() {
		const {value} = this.props

		if (value.length === 0) { return }
		this.removeKeywordAt(value.length - 1)
	}

	render() {
		const {value, invalid} = this.props

		return (
			<div className="KeywordsField" onClick={this.onFieldClick.bind(this)}>
				{value.map(this.renderKeyword.bind(this))}
				{this.renderInput()}
				{invalid && <div className="KeywordsField-invalid"/>}
			</div>
		)
	}

	renderKeyword(keyword, index) {
		return (
			<div
				key={index}
				className="KeywordsField-keyword"

				tabIndex={0}
				onClick={this.onRemoveKeywordClick.bind(this, index)}
			>
				<span>{keyword}</span>
				<div className="KeywordsField-keywordRemoveButton">
					x
				</div>
			</div>
		)
	}

	renderInput() {
		return (
			<AutosizeInput
				type="text"
				ref={el => { this.input = el }}
				className="KeywordsField-input"

				value={this.state.partialKeyword}
				onChange={this.onInputChange.bind(this)}
				onBlur={this.onInputBlur.bind(this)}
				onKeyDown={this.onInputKeyDown.bind(this)}
			/>
		)
	}

	onFieldClick() {
		this.input.focus()
	}

	onRemoveKeywordClick(index) {
		this.removeKeywordAt(index)
	}

	onInputChange(e) {
		this.splitPartialKeyword(e.target.value, false)
	}

	onInputBlur() {
		this.splitPartialKeyword(this.state.partialKeyword, true)
	}

	onInputKeyDown(e) {
		const {selectionStart, selectionEnd} = e.target

		if (e.keyCode === 8 && selectionStart === 0 && selectionEnd === 0) {
			this.removeLastKeyword()
			e.preventDefault()
		}
	}

}