import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { message } from 'antd';

const boxTarget = {
    drop(props, monitor, component) {

        let item = monitor.getItem();
        console.log(item)
        if (item.type == "measure") {
            message.info('You cannot add measures to filters')
            return
        }
        else {
            let column = props.getColumnDetails(props.DataSources, [item.id],props.Tables.selectedIds)[0]
            column["values"] = ["All"]
            props.addToFilters(column)
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
export default class FilterSection extends Component {
    constructor(props) {
        super(props)
        this.removeFromFilters = this.removeFromFilters.bind(this)
    }
    removeFromFilters(e) {
        this.props.removeFromFilters(e.target.id)
    }
    render() {
        let filters = this.props.Dashboard.filters;
        const { connectDropTarget, canDrop, isOver } = this.props;
        return (connectDropTarget(
            <div className="fliters-section">
                <h3>Dashboard Filter</h3>
                <ul  id="scrollbar">
                    {filters.map(filter => {
                        return (<li key={filter.id}>{filter.alias}</li>)
                    })}
                    <li className="text-drag__placeholder">Drag column here</li>
                                               
                </ul>
            </div>
            //   <div style={{height:"200px",border:"1px solid"}}>
            //       Filter
            // { filters.map(filter =>{ 
            //     return(<div key={filter.id}>{filter.alias}<span onClick={this.removeFromFilters} id={filter.id} style={{cursor:'pointer'}}>remove</span></div>)
            // })}
            //   </div>
        )
        )
    }
}
