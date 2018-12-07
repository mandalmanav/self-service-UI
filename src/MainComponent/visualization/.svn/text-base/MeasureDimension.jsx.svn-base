import React, { Component } from 'react'
import DraggableLabel from './DraggableLabel'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DropTarget } from 'react-dnd';
import CalculatedField from './../../containers/CalculatedFieldContainer'
import { Icon } from 'antd'
import CalculationLabel from '../visualization/CalculationLabel'
import TableLabel from '../visualization/TableLabel'
import groupIcon from '../../assets/images/grouping.svg';

const boxTarget = {
    drop(props, monitor, component) {

        let item = monitor.getItem();
        if (item.type === props.type) {
            //dragged to itsef
            return
        }
        else {
            let datasources = props.DataSources;
            let obj = { measure: (item.isTransformed ? 'measures' : 'dimensions'), dimension: (item.isTransformed ? 'dimensions' : 'measures') }
            let fact = obj[props.type]
            let aggregation = null
            if (item.type == 'measure') {
                if (item.isTransformed) {

                }
                aggregation = ""
            }
            else {
                if(component.state.addCF)
                return
                if (!item.isTransformed) {
                    if (item.dataType == "String" || item.dataType == "VARCHAR")
                        aggregation = "cntd"
                }
                else {
                    console.log("transfer back")

                }
            }
            datasources.forEach((ds) => {
                ds.tables.forEach((table) => {
                    if (props.Tables.selectedIds.indexOf(table.id) == -1) {
                        return
                    }
                    table[fact].forEach((column) => {
                        if (column.id == item.id) {
                            column.isTransformed = !column.isTransformed
                            column.aggregation = aggregation
                            return
                        }
                    })
                })
            });
            props.updateDS(datasources)

        }
    }
};
function collect(connect, monitor) {

    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()

    };
}

@DropTarget('label', boxTarget, collect)
export default class MeasureDimension extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleTable: false,
            addCF: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.addCalculatedField = this.addCalculatedField.bind(this)
        this.closeCalculatedField = this.closeCalculatedField.bind(this)
        this.toggleTableName = this.toggleTableName.bind(this)
    }
    handleClick(e) {

        let id = e.target.id, props = this.props;
        let activeBo = props.Dashboard.activeBO;
        let businessObject = props.Dashboard.businessObjects[activeBo];
        // props.type=="measure"?props.addToColumns(id):props.addToRows(id);
        if (props.type == "measure") {


            if (businessObject.meas.indexOf(id) === -1) {
                if (businessObject.yAxis != "") {

                }
                else {
                    props.setAsYaxis([activeBo, id])
                }
                props.addToMeasure([activeBo, id])
            }
            props.runQuery()
        }

        else if (props.type == "dimension") {
            if (businessObject.dims.indexOf(id) === -1) {
                if (businessObject.xAxis != "") {
                    if (businessObject.mark != "") {
                        if (businessObject.group != "") {

                        }
                        else {
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
            if (businessObject.meas.length) {
                props.runQuery()
            }
        }

    }
    toggleTableName() {
        this.setState({ visibleTable: !this.state.visibleTable })
    }
    addCalculatedField() {
        this.setState({ addCF: true })
    }
    closeCalculatedField() {

        this.setState({ addCF: false })
    }
    render() {
        let props = this.props
        const datasources = props.DataSources
        const { connectDropTarget, canDrop, isOver } = props;
        let dropStyle = { background: 'fff' }
        const isActive = canDrop && isOver
        if (!canDrop || isOver) {
            dropStyle = {
                background: '#fff'
            }
        }
        else if (canDrop) {
            dropStyle = { background: 'red' }
        }

        return (
            connectDropTarget(
                <div className="measures" style={{borderBottom:'0px solid #efefef' }}>  
               
                    <h3>{props.label} {
                        props.type == "measure" ? <div style={{ top: "1px",
                            height: "24px",
                            right: "34px",
                            padding: "3px 7px"}} className="calculatedfield"> 
                        <span style={{fontSize:'12px'}} onClick={this.addCalculatedField} title="Add calculated field" >+</span>
                  <div>
                        {
                               this.state.addCF ? <CalculatedField removeCalculated={this.closeCalculatedField} {...props} /> : false
                            }
                            </div>
                        </div> : false
                    }<span onClick={this.toggleTableName}> <img style={{ height:'15px'}} src={groupIcon} /></span></h3>
                    <ul  id="scrollbar">
                        {
                            datasources.map((ds) => {

                                return (

                                    ds.tables.map((table, index) => {
                                        if (props.Tables.selectedIds.indexOf(table.id) == -1) {
                                            return
                                        }
                                        return (
                                            <div key={index}>
                                                <TableLabel {...props } visibleTable={this.state.visibleTable} label= {table.alias} id={table.id}/>
                                                {
                                                    (props.type == "measure" ?
                                                        table.measures.map((dim, ind) => {
                                                            return (dim.isTransformed ? false : <DraggableLabel {...props} runQuery={this.props.runQuery} dataType={dim.dataType} aggregation={dim.aggregation} dragSource='label' isTransformed={dim.isTransformed} type={props.type} id={dim.id} label={dim.alias} key={ind} handleClick={this.handleClick} />)
                                                        }) :
                                                        table.dimensions.map((dim, ind) => {
                                                            return (dim.isTransformed ? false : <DraggableLabel {...props} runQuery={this.props.runQuery} dataType={dim.dataType} aggregation={dim.aggregation} dragSource='label' isTransformed={dim.isTransformed} type={props.type} id={dim.id} label={dim.alias} key={ind} handleClick={this.handleClick} />)
                                                        })
                                                    )

                                                }
                                                {
                                                    // render the calculated fields
                                                    (props.type == "measure" ?
                                                        table.dimensions.map((dim, ind) => {
                                                            return (dim.isTransformed ? <DraggableLabel {...props} dragSource='label' runQuery={this.props.runQuery} dataType={dim.dataType} aggregation={dim.aggregation} isTransformed={dim.isTransformed} type={props.type} id={dim.id} label={dim.alias} key={ind} handleClick={this.handleClick} /> : false)
                                                        }) :
                                                        table.measures.map((dim, ind) => {
                                                            return (dim.isTransformed ? <DraggableLabel {...props} dragSource='label' runQuery={this.props.runQuery} dataType={dim.dataType} aggregation={dim.aggregation} isTransformed={dim.isTransformed} type={props.type} id={dim.id} label={dim.alias} key={ind} handleClick={this.handleClick} /> : false)
                                                        })

                                                    )
                                                }
                                            </div>
                                        )

                                    }))

                            })

                        }

                    </ul>
                    {/* {
                        props.type == "measure" ?
                            <div ><span className="calculatedfield" onClick={this.addCalculatedField} >ADD CALCULATED FIELD</span><div> {this.state.addCF ? <CalculatedField removeCalculated={this.closeCalculatedField} {...props} /> : false}
                            </div></div>
                            : false
                        } */}
                   

                </div>
                // <div className="alpha" style={dropStyle}>

                //     {this.state.addCalculatedField ? <CalculatedField removeModal={this.closeCalculatedField} /> : false}
                //     <div style={headingStyle}><div>{props.type == "measure" ? 'Measures' : 'Dimensions'}</div>
                //         {
                //             props.type == "measure" ? <div onClick={this.addCalculatedField} style={f8}>+ Add Calculated Measure</div> : false
                //         }
                //     </div>
                //     {
                //         datasources.map((ds) => {
                //             return ds.tables.map((table, index) => {

                //                 return (
                //                     <div key={index}>
                //                         <div >
                //                             {table.alias}
                //                         </div>
                //                         {
                //                             (props.type == "measure" ?
                //                                 table.measures.map((dim, ind) => {
                //                                     return (dim.isTransformed ? false : <DraggableLabel {...props} dataType={dim.dataType} aggregation={dim.aggregation} isTransformed={dim.isTransformed} type={props.type} id={dim.id} label={dim.alias} key={ind} handleClick={this.handleClick} />)
                //                                 }) :
                //                                 table.dimensions.map((dim, ind) => {
                //                                     return (dim.isTransformed ? false : <DraggableLabel {...props} dataType={dim.dataType} aggregation={dim.aggregation} isTransformed={dim.isTransformed} type={props.type} id={dim.id} label={dim.alias} key={ind} handleClick={this.handleClick} />)
                //                                 })
                //                             )

                //                         }
                //                         {
                //                             // render the 
                //                             (props.type == "measure" ?
                //                                 table.dimensions.map((dim, ind) => {
                //                                     return (dim.isTransformed ? <DraggableLabel {...props} dataType={dim.dataType} aggregation={dim.aggregation} isTransformed={dim.isTransformed} type={props.type} id={dim.id} label={dim.alias} key={ind} handleClick={this.handleClick} /> : false)
                //                                 }) :
                //                                 table.measures.map((dim, ind) => {
                //                                     return (dim.isTransformed ? <DraggableLabel {...props} dataType={dim.dataType} aggregation={dim.aggregation} isTransformed={dim.isTransformed} type={props.type} id={dim.id} label={dim.alias} key={ind} handleClick={this.handleClick} /> : false)
                //                                 })

                //                             )
                //                         }
                //                     </div>
                //                 )

                //             })
                //         })

                //     }
                // </div>
            )
        )
    }
}
