import React, { Component } from 'react'
import DraggableLabel from './DraggableLabel'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DropTarget } from 'react-dnd';

const boxTarget = {
    drop(props, monitor, component) {

        let item = monitor.getItem();
        console.log(item)
    }
};
function collect(connect, monitor) {

    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()

    };
}

@DropTarget('label', boxTarget, collect)
export default class Measures extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(e) {
        let id = e.target.id;
        this.props.addToColumns(id);
    }
    render() {
        const datasources = this.props.DataSources
        let marginLeft = { marginLeft: "12px", cursor: "pointer" };
        const { connectDropTarget } = this.props;
        return (
            connectDropTarget(
                <div>
                    <h3>Measures</h3>
                    {
                        datasources.map((ds) => {
                            return ds.tables.map((table) => {

                                return (
                                    <div key={table.id}>
                                        <div key={table.id}>
                                            {table.alias}
                                        </div>
                                        {
                                            table.measures.map((dim) => {
                                                return <DraggableLabel type="measure" id={dim.id} label={dim.alias} key={dim.id} handleClick={this.handleClick} />
                                            })
                                        }
                                    </div>
                                )

                            })
                        })

                    }
                </div>
            )
        )
    }
}
