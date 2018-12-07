import React, { Component } from 'react'
import { connect } from 'react-redux'
import CalculatedFieldComponent from './../MainComponent/CalculatedField'
class CalculatedField extends Component {
    constructor(props){
        super(props)
    }
  
}
const mapStateToProps = (state, props) => {
    return state
}
const mapDispatchToProps = dispatch => ({
    updateDS: payLoad => dispatch(({
        type: 'ADD_CALCULATION',
        payLoad: payLoad
    }))
})

export default connect(mapStateToProps,mapDispatchToProps)(CalculatedFieldComponent)
