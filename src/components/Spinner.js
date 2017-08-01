import React from 'react'
import times from 'lodash/times'

export default function Spinner() {
	return (
		<div className="Spinner">
			{times(12, index => <div key={index}/>)}
		</div>
	)
}