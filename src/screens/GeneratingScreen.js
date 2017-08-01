import React from 'react'
import {Spinner, Button} from '../components'
import './GeneratingScreen.css'

export default class GeneratingScreen extends React.Component {

  render() {
    return (
      <div className="GeneratingScreen">
        <div className="GeneratingScreen-main">
          <Spinner/>
        </div>

        <div className="GeneratingScreen-buttons">
	        <Button
	          label="GENERATING"
	          disabled
	        />
        </div>
      </div>
    )
  }

}