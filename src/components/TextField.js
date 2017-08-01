import React from 'react'
import PropTypes from 'prop-types'
import './TextField.css'

export default function TextField(props) {
	const {value, invalid, onChange, ...other} = props

	return (
		<div className="TextField">
			<input
				type="text"
				className="TextField-input"

				{...other}
				value={value || ''}
				onChange={e => { onChange(e.target.value) }}
			/>

			{invalid && <div className="TextField-invalid"/>}
		</div>
	)
}

TextField.propTypes = {
	value:    PropTypes.string,
	invalid:  PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired
}

TextField.defaultProps = {
	value:    null,
	invalid:  false,
	onChange: () => undefined
}