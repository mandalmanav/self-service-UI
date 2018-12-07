import React, { Component } from 'react'
import DraggableLabel from './DraggableLabel'
export default class Dimensions extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(e){
        let id = e.target.id;
        this.props.addToRows(id);
    }
    render() {
        const datasources = this.props.DataSources[0]
        let marginLeft = { marginLeft: "12px",cursor:"pointer" };
        return (
            <div>
                <h3>Dimensions</h3>
                {
                    datasources.tables.map((table) => {

                        return (
                            <div key={table.id}>
                                <div key={table.id}>
                                    {table.alias}
                                </div>
                                {
                                    table.dimensions.map((dim) => {
                                    return <DraggableLabel id={dim.id} key={dim.id} label={dim.alias} handleClick={this.handleClick} />
                                }   )
                                }
                            </div>

                        )

                    })
                }
            </div>
        )
    }
}
