import React, { Component } from 'react'
import { Button } from 'antd';
import DraggableButton from './DraggableButton'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { DropTarget } from 'react-dnd';
import { Qualifier } from 'ag-grid';

import AddCondition from './../AddCondition'

const squareTarget = {
    drop(props, monitor, component) {

        let item = monitor.getItem();
        let activeBo = props.Dashboard.activeBO;
        let businessObject = props.Dashboard.businessObjects[activeBo];
        if (item.dragSource == "label") {

            let id = item.id;

            if (item.type == props.type) {
                if (props.type == "measure") {


                    if (businessObject.meas.indexOf(id) === -1) {
                        if (businessObject.yAxis !="") {

                        }
                        else {
                            props.setAsYaxis([activeBo, id])
                        }
                        props.addToMeasure([activeBo, id])
                    }
                    props.runQuery();
                }

                else if (props.type == "dimension") {
                    if (businessObject.dims.indexOf(id) === -1) {
                        if (businessObject.xAxis !="") {
                            if (businessObject.mark !="") {
                                if(businessObject.group != ""){

                                }
                                else{
                                    props.setAsGroup([activeBo, id])
                                }

                            }
                            else {
                                props.setAsMark([activeBo, id])
                            }
                        }
                        else {
                            props.setAsXaxis([activeBo, id])
                        }
                        props.addToDimension([activeBo, id])

                    }
                    if(businessObject.meas !=""){
                        props.runQuery()
                    }
                }
                
            }
            else{
                // dropped to condition
                
                component.setState({columnId:item.id,conditionType:item.type,addCondition:true})

            }

        }
        //    else{
        //     if (props.type === "dimension") {
        //         let id = item.columnDetail.id;
        //         if (businessObject.dims.indexOf(id) != -1) {

        //             // props.removeFromDimension(id);
        //             // props.addToDimension(id);
        //             return
        //         }
        //         props.addToDimension(id);
        //         props.removeFromRows(id);
        //     }
        //     else {
        //         if (props.SelectedRows.indexOf(id) != -1) {
        //             props.removeFromRows(id);
        //             props.addToRows(id)
        //             return
        //         }
        //         props.addToRows(id)
        //         props.removeFromColumns(id);

        //     }
        //    }

    }
};
function collect(connect, monitor) {

    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()

    };
}

@DropTarget(['column', 'label'], squareTarget, collect)
export default class ColumnDropSection extends Component {
    constructor(props) {
        super(props)
        this.state={
            addCondition:false,
            conditionType:'',
            columnId:''
        }
        this.removeModal = this.removeModal.bind(this)
    }
    removeModal(){
        this.setState({
            addCondition:false
        })
    }
    render() {
        const style = { border: '1px solid' }
        const flex = { display: "flex" }
        const { connectDropTarget } = this.props;
       
        return (
            connectDropTarget(

                <div id="scrollbar" className={this.props.type == 'measure' ? 'column-two' : (this.props.type == "dimension" ? 'column-one' : 'column-two')}>
                  {this.state.addCondition?<AddCondition  {...this.props} columnId={this.state.columnId} removeModal={this.removeModal} columnType={this.state.conditionType}/>:false}
                    <span className="text">{this.props.label}</span>
                    <ul>
                        {
                            this.props.type == "dimension" ?
                                this.props.selectedDimensions.map((col, index) => {
                                    return (<DraggableButton dragSource='column' {...this.props} removeFromColumns={this.props.removeFromColumns} container="dimension" key={index} columnDetail={col} />)
                                })
                                : (this.props.type == "measure" ? this.props.selectedMeasures.map((row, index) => {
                                    return (<DraggableButton dragSource="column" {...this.props} removeFromRows={this.props.removeFromRows} container="measure" key={index} columnDetail={row} />)
                                }) : 
                                this.props.Dashboard.businessObjects[this.props.Dashboard.activeBO].conditions.map((condition,index) => <DraggableButton dragSource="column"  key={index}  {...this.props}  container="condition" condition={condition}/>)
                            )
                        }
                          <li className="text-drag__placeholder" style={{marginLeft:'10px'}}>Drag column here</li>

                    </ul>
                </div>

                // <div >

                //     <div className="row" style={style}>
                //         <div className="col-md-2">
                //             <b>{this.props.label}</b>
                //         </div>
                //         <div className="col-md-10" style={flex}>
                //             {
                //                 this.props.type == "dimension" ?
                //                     this.props.selectedDimensions.map((col,index) => {
                //                         return (<DraggableButton {...this.props} removeFromColumns={this.props.removeFromColumns}  container="dimension" key={index} columnDetail={col} />)
                //                     })
                //                     : (this.props.type == "measure" ?this.props.selectedMeasures.map((row,index) => {
                //                         return (<DraggableButton {...this.props} removeFromRows={this.props.removeFromRows} container="measure" key={index} columnDetail={row} />)
                //                     }):false)
                //             }

                //         </div>
                //     </div>

                // </div>
            )
        )
    }
}
