import React, { Component } from 'react'

export default class CalculationLabel extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
        <li onDoubleClick={this.props.handleClick} id={this.props.id} key={this.props.id}>{this.props.label} </li>
          
    )
  }
}
