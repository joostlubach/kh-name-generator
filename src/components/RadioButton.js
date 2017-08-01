import React from 'react'

export default function RadioButton({className, checked}) {
	return (
		<div className={`RadioButton ${className || ''}`}>
			{checked && <div className="RadioButton-check"/>}
		</div>
	)
}