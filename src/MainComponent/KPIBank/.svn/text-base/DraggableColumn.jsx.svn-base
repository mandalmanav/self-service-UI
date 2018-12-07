import React, { Component } from 'react'
import { DragSource } from 'react-dnd';
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}
const sources = {
    beginDrag(props) {
        return props
    }
}
@DragSource('kpibankcolumn', sources, collect)
export default class DraggableColumn extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { isDragging, connectDragSource } = this.props;
        return (
            connectDragSource(
            <li>
                {this.props.column.alias}
            </li>
            )
        )
    }
}
