import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import "babel-polyfill";
import $ from 'jquery';
import {bindActionCreators} from 'redux';
import { Tree, Transfer, Button ,Modal , Card, TreeSelect, Row, Col,Spin,Menu, Dropdown, Icon,List } from 'antd';



const Option=Select.Option;
class JoinElement extends React.Component {
   state = {
   }

    onCheck = (checkedKeys) => {
    this.setState({ checkedKeys });
    }
    onSelect = (selectedKeys, info) => {
    this.setState({ selectedKeys });
    }
      showModal = () => {
        this.setState({
        visible: true,
        });
    }
    handleOk = (e) => {
      
            this.setState({
        visible: false,
            FirstColumn:"",
       SecondColumn:""
        });
   }
   

    handleCancel = (e) => {
       this.setState({
        visible: false,
        FirstColumn:"",
       SecondColumn:""});
        
        
      
    }
 
    
     componentDidMount() {
         
          
  }
 onChange = (value) => {
    this.setState({ FirstColumn:value });
  }
  onChange1 = (value) => {
    this.setState({ SecondColumn:value });
  }
  handleMenuClick = (value) => {
      console.log("sdd");
  }
  
                onDragStart = (ev, id,a,b,type,tablePname) => {
          
                    
            ev.dataTransfer.setData('text',JSON.stringify({id:id,ColumnPhysicalName:a,ColumnBusinessName:id,TablePhysicalName:tablePname,type:type,block:b}))        
        /*    ev.dataTransfer.setData('id', id);
            ev.dataTransfer.setData('ColumnPhysicalName', a);
            ev.dataTransfer.setData('ColumnBusinessName', id);
            ev.dataTransfer.setData('TablePhysicalName', tablePname);
            ev.dataTransfer.setData('type',type );
            ev.dataTransfer.setData('block',b );
        */            
                    
        }
        
        onDragOver = (ev) => {
            ev.preventDefault();
        }
        
        onDrop = (ev, cat) => {       
          var textobx= JSON.parse(ev.dataTransfer.getData("text"));
        /*    let id = ev.dataTransfer.getData("id");
            let type = ev.dataTransfer.getData("type");
            let ColumnBusinessName = ev.dataTransfer.getData("ColumnBusinessName");
            let ColumnPhysicalName = ev.dataTransfer.getData("ColumnPhysicalName");
            let TablePhysicalName = ev.dataTransfer.getData("TablePhysicalName");
            let block = ev.dataTransfer.getData("block");
        */
            
            let id = textobx.id;
            let type = textobx.type
            let ColumnBusinessName = textobx.ColumnBusinessName;
            let ColumnPhysicalName =textobx.ColumnPhysicalName;;
            let TablePhysicalName = textobx.TablePhysicalName;
            let block = textobx.block;
            
            
            var tasks =this.state.tasks;
            if(block=="dim"||block=="measure")
            {
               tasks[cat][ColumnBusinessName]={ColumnBusinessName,ColumnPhysicalName,type,TablePhysicalName};
                
                
                
            }else{
                
                if(cat=="dim"||cat=="measure"){
                    if(block!="dim" && block!="measure")
                   delete tasks[block][ColumnBusinessName]
                }
                
            }
             this.setState({           
                ...this.state,           
                tasks       
             });  
        }
   
       
   render() {
  
       
         
    return (
        
      
        <div>
    dfsdf 
        </div>

      
    );
  }
}


const mapDispatchToProps=(dispatch)=>{
    
     return {
        actions: bindActionCreators({
  //          updateJoin
         },dispatch)
     }
}
const mapStateToProps=(state)=>{
    return {
         PageLoader : state.Page.loaded,
        url:state.url
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(JoinElement);
