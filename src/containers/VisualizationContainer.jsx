import React, { Component } from 'react'
import Visualization from '../MainComponent/visualization'
import { connect } from 'react-redux'
class VisualizationContainer extends Component {
  constructor(props){
      super(props)
  }
}

const getColumnDetails = (datasources,idArray,selectedIds) =>{
    let result = []
    for(var i=0;i<idArray.length;i++){
        let colId = idArray[i]
        datasources.map((ds)=>{
            ds.tables.map((table)=>{
                if(selectedIds.indexOf(table.id)==-1){
                    return
                }
                table.dimensions.map((dimension)=>{
                    if(dimension.id==colId)
                        result.push(dimension)
                })
                table.measures.map((measure)=>{
                    if(measure.id==colId)
                        result.push(measure)
                })
            })
            // ds.calculations.map(calc=>{
            //     if(calc.id == colId)
            //         result.push(calc)
            // })
        })
    }
    return result;
    
}

const mapStateToProps = (state, props) => {
    let bo= state.Dashboard.businessObjects[state.Dashboard.activeBO]
     return {
         ...state,
         selectedDimensions:getColumnDetails(state.DataSources,bo?bo.dims:[],state.Tables.selectedIds),
         selectedMeasures:getColumnDetails(state.DataSources,bo?bo.meas:[],state.Tables.selectedIds),
         getColumnDetails
     }
}
const mapDispatchToProps = dispatch => ({
    updateDS: payLoad => dispatch(({
        type: 'UPDATE_DS',
        payLoad: payLoad
    })),
    addToMeasure:payLoad => dispatch ({
        type:'ADD_TO_MEASURE',
        payLoad:payLoad
    }),
    addToDimension:payLoad => dispatch ({
        type:'ADD_TO_DIMENSION',
        payLoad:payLoad
    }),
    removeFromDimension:payLoad => dispatch ({
        type:'REMOVE_FROM_DIMENSION',
        payLoad:payLoad
    }),
    removeFromMeasure:payLoad => dispatch ({
        type:'REMOVE_FROM_MEASURE',
        payLoad:payLoad
    }),
    setAsXaxis:payLoad => dispatch ({
        type:'SET_AS_XAXIS',
        payLoad:payLoad
    }),
    setAsYaxis:payLoad => dispatch ({
        type:'SET_AS_YAXIS',
        payLoad:payLoad
    }),
    setAsGroup:payLoad => dispatch ({
        type:'SET_AS_GROUP',
        payLoad:payLoad
    }),
    setAsMark:payLoad => dispatch ({
        type:'SET_AS_MARK',
        payLoad:payLoad
    }),
    
    addToFilters:payLoad => dispatch({
        type:'ADD_TO_FILTERS',
        payLoad:payLoad
    }),
    removeFromFilters:payLoad => dispatch({
        type:'REMOVE_FROM_FILTERS',
        payLoad
    }),
    addCondition:payLoad => dispatch({
        type:'ADD_TO_CONDITION',
        payLoad
    }),
    removeCondition:payLoad => dispatch({
        type:'REMOVE_FROM_CONDITION',
        payLoad
    }),
    updateBOTitle:payLoad => dispatch({
        type:'UPDATE_BO_TITLE',
        payLoad
    })
    ,
    setConfiguration:payLoad => dispatch({
        type:'SET_CONFIGURATION',
        payLoad
    })
    ,
    setSql:payLoad => dispatch({
        type:'SET_SQL',
        payLoad
    }),
    saveBO:payLoad => dispatch({
        type:'UPDATE_SO',
        payLoad
    }),
    addBO:payLoad => dispatch({
        type:'ADD_BO',
        payLoad
    }),
    setBOActive:payLoad => dispatch({
        type:'SET_BO_ACTIVE',
        payLoad
    }),
    setData:payLoad => dispatch({
        type:'SET_DATA',
        payLoad
    })
   
    
    
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Visualization)

