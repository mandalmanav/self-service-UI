import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardGrid from '../MainComponent/DashboardGrid'

class DashboardContainer extends Component {
  constructor(props){
      super(props)
  }
}


const mapStateToProps = (state, props) => {
    return state
}

const mapDispatchToProps = dispatch => ({
    updateTitle: payLoad => dispatch(({
        type: 'UPDATE_DASHBOARD_TITLE',
        payLoad: payLoad
    })),
    addBusinessObject:payLoad => dispatch({
        type:'ADD_BO',
        payLoad
    })
})
export default connect(mapStateToProps,mapDispatchToProps)(DashboardGrid)
