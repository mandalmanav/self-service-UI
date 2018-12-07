import React, { Component } from 'react'
import DimensionCalculation from './DimensionCalculation'
import MeasureCalculation from './MeasureCalculation'
export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }

  }

  render() {
    let props = this.props
    return (
      <div>
        {
          props.columnType == 'dimension' ? <DimensionCalculation {...props} /> : <MeasureCalculation {...props} />
        }
      </div>
    )
  }
}
