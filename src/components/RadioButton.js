import React from 'react'
import './RadioButton.css'

export default function RadioButton({className, checked}) {
	return (
		<div className={`RadioButton ${className || ''}`}>
			{checked && <div className="RadioButton-check"/>}
		</div>
	)
}