import React, { Component } from 'react'
import uuid from 'uuid'
import ReactGridLayout from 'react-grid-layout'
import "../Dashboard/css/gridlayout.css";
import "../Dashboard/css/resizable.css";
import BusinessObject from './BusinessObject'
export default class index extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.addBusinessObject = this.addBusinessObject.bind(this)
    }
    handleChange(e) {
        this.props.updateTitle(e.target.value)
    }
    componentDidMount() {
        console.log(uuid())
    }
    addBusinessObject(){
        this.props.addBusinessObject({
            id:uuid(),
            height:12,
            width:12,
            x:0,
            y:0,
            title:'',
            dims:[],
            meas:[]
        })
    }
    render() {
        // var layout = [
        //     { i: 'a', x: 0, y: 0, w: 4, h: 8,},
        //     { i: 'b', x: 0, y: 0, w: 13, h: 8},
        //     { i: 'c', x: 4, y: 9, w: 4, h: 8 }
        // ];
        var businessObjects = this.props.BusinessObjects;
        
        var layout = businessObjects.map( bo => {
            return {
                i:bo.id,
                x:bo.x,
                y:bo.y,
                h:bo.height,
                w:bo.width
            }
        })
       
        return (
            <div>
                <div className="row">
                    <input type="text" value={this.props.Dashboard.title} id="dashboardTitle" onChange={this.handleChange} />
                    <button className="btn-primary" onClick={this.addBusinessObject} >Add BO</button>
                </div>
                <div className="row">
                    <ReactGridLayout className="layout" layout={layout} cols={48} rowHeight={30} width={1200}>
                       { 
                           businessObjects.map((bo,index) =>{
                               return <div key={bo.id}>
                               <BusinessObject />
                               </div>
                           })
                       
                    
                    }
                    </ReactGridLayout>
                </div>
            </div>
        )
    }
}
