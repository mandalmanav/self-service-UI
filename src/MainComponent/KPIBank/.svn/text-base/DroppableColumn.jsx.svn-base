import React, { Component } from 'react'
import HTML5Backend from 'react-dnd-html5-backend';
import { DropTarget } from 'react-dnd';
import ArrowiconImg from '../../assets/images/arrowiconImg.png'
const boxTarget = {
    drop(props, monitor, component) {

        let item = monitor.getItem();
        props.connectColumns(item.column.alias,props.attribute.name)
        
    }
}

function collect(connect, monitor) {

    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()

    };
}

@DropTarget('kpibankcolumn', boxTarget, collect)
export default class DroppableColumn extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let props = this.props
        const { connectDropTarget, canDrop, isOver } = props;
        return (
            connectDropTarget(
                <li>
                    {
                        this.props.attribute.name
                        
                    }

                   {
                       this.props.mappedColumn.length?<span><img src={ArrowiconImg} style={{ paddingRight: '10px' }} />{this.props.mappedColumn}</span>:null
                   } 
                    {
                        isOver &&
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: 'yellow',
                        }} />
                    }
                </li>
            )
        )
    }
}
