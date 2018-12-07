import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { Input ,Icon} from 'antd';
import MakeRequest from '../../utilities/MakeRequest'
import dimImage from '../../assets/images/dim.png'
import measImage from '../../assets/images/meas.png'
import dateImage from '../../assets/images/date.png'
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
@DragSource('label', sources, collect)
export default class DraggableLabel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            label:'',
            showInput:false
        }
    }
    componentDidMount(){
        this.setState({label:this.props.label})
    }
    editColumnAlias(){
        let props = this.props
        let ds =props.DataSources;
        let column = {}
        ds.map(datasource =>{
            datasource.tables.map(table =>{
                if(props.Tables.selectedIds.indexOf(table.id)==-1)
                return
                else{
                    if(props.type == "measure"){
                        table.measures.map((measure)=>{
                            if(measure.id==props.id)
                            {
                                measure.alias = this.state.label
                                column = measure
                                return
                            }
                                
                        })
                    }
                    else{
                        table.dimensions.map((dimension)=>{
                            if(dimension.id==props.id)
                       {       
                            dimension.alias = this.state.label
                            column = dimension
                            return
                       }
                        })
                    }
                }
            })
        })
        props.updateDS(ds)
        MakeRequest.post('self/updateColumnDetails',{
            data:{
                columnId:column.id,
                alias:column.alias
            }
        })
        .then(success =>{

        })
        .catch(error =>{
            console.error(error)
        })
        this.setState({showInput:false})
    }
    handleChange(e){
        
       this.setState({label:e.target.value})
    }
    showInput(){
        this.setState({showInput:true})
    }
    handleBlur(){
        this.setState({showInput:false})
    }
    
    render() {
        const spanStyle = {
            color: 'green',
            fontSize: '12px',
            margin: '10px'
        }
        let marginLeft = { marginLeft: "12px", cursor: "pointer", border: '1px solid' };
        const { isDragging, connectDragSource } = this.props;
        let aggregationLabel = null;
        if (this.props.aggregation == "cntd") {
            aggregationLabel = "(Count Distinct)"
        }
        return connectDragSource(
            <li onDoubleClick={this.props.handleClick} id={this.props.id} key={this.props.id}>
            <div style={{display: 'inline-block',minWidth: '23px',marginRight: '5px'}}>
                <img src={this.props.dataType=="VARCHAR" ||this.props.type =="STRING"?dimImage: measImage } style={{maxHeight:'100%',maxWidth:'100%'}} />      
            </div>            
            { this.state.showInput?
            <Input autoFocus={true} onBlur={this.handleBlur.bind(this)} onPressEnter={this.editColumnAlias.bind(this)} onChange={this.handleChange.bind(this)} style={{ background: "none",border: "none",boxShadow:"none",fontSize: "13px"}} size="small" value={this.state.label} /> 
            :this.state.label            
           }
           
           {
               this.state.showInput?false :
               
               <span className="editIcon-pencil" onClick={this.showInput.bind(this)}></span>
        //    <i style={{float:"right"}} className="zmdi zmdi-edit">
        //     </i> 
        }
            {aggregationLabel != null ? <span className="countText">{(aggregationLabel)}</span>: false}</li>
            // <div onDoubleClick={this.props.handleClick} style={marginLeft} id={this.props.id} key={this.props.id}>
            //     <span style={spanStyle}> {this.props.dataType == 'String' ? 'Abc' : '#'}</span> {this.props.label} {(aggregationLabel)}
            // </div>

        )
    }
}
