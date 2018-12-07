import React, { Component } from 'react'
import {Input} from 'antd'
import MakeRequest from '../../utilities/MakeRequest'
export default class TableLabel extends Component {
    constructor(props){
        super(props)
        this.state = {
            showInput :false,
            label:''
        }
    }
    componentDidMount(){
        this.setState({label:this.props.label})
    }
    showInput(){
        this.setState({showInput:true})
    }
    handleChange(e){
        
        this.setState({label:e.target.value})
        
     }
    handleBlur(){
        this.setState({showInput:false})
    }
    editTableAlias(){
        let props = this.props
        let ds =props.DataSources;
        let tId= ''
        ds.map(datasource =>{
            datasource.tables.map(table =>{
                if(props.Tables.selectedIds.indexOf(table.id)==-1)
                return
                else{
                   if(table.id == props.id){
                       table.alias = this.state.label
                       tId= table.id
                       return
                   }
                }
            })
        })
        props.updateDS(ds)
        this.setState({showInput:false})
        MakeRequest.post('self/updateTableDetails',{
            "data":	{
                "alias":this.state.label,
                "tableId":tId
            }
        })
        .then(success=>{

        })
        .catch(error =>{
            console.error(error)
        })
        
    }
  render() {
    return (
        <h4 style={{ display: this.props.visibleTable ? 'block' : 'none' }}>
        { this.state.showInput?
            <Input autoFocus={true} onBlur={this.handleBlur.bind(this)} onPressEnter={this.editTableAlias.bind(this)} onChange={this.handleChange.bind(this)} style={{ background: "none",border: "none",boxShadow:"none",fontSize: "13px"}} size="small" value={this.state.label} /> 
            :this.state.label            
           }
            <span className="editIcon-pencil" onClick={this.showInput.bind(this)}></span>
        
          { this.state.showInput?false :  
        <span className="editIcon-pencil" onClick={this.showInput.bind(this)}></span>
          }
        </h4>
    )
  }
}
