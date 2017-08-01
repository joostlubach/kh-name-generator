import React from 'react'
import './Button.css'

export default function Button({label, disabled, onClick}) {
	let className = 'Button'
	if (disabled) {
		className += ' Button-disabled'
	}

	return (
		<button className={className} onClick={disabled ? null : onClick}>
			<span className="Button-label">{label}</span>
		</button>
	)
}