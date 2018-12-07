import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import "babel-polyfill";
import { bindActionCreators } from 'redux';
import $ from 'jquery';
//import "./css/gridlayout.css";
//import "./css/resizable.css";
//import "./css/jsplumbtoolkit-defaults.css";
//import "./css/main.css";
//import "./css/jsplumbtoolkit-demo.css";
//import "./css/demo.css";
//import { Input,Button } from 'antd';
//import ChartComponent from '../visualization/ChartComponent';
//import { addObjectToDashboard,removeObjectFromDashboard,updateObjectsOfDashboard } from '../../actions/ObjectAction'
import { Object } from 'core-js';
import FilterElement from "./FilterElement.jsx";
import { Menu, Dropdown, Icon } from 'antd';
//import {pinToWorkboard,addWorkboard,saveWorkboardValues} from '../../actions/WorkboardListAction';


const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="#">close</a>
      </Menu.Item>
    </Menu>
  );


class FilterPanel extends React.Component {
    constructor(props) {
        super(props)
        this.fireData=this.fireData.bind(this)
    this.state = {
        srightWidth: 1000
    }

}
  componentDidMount() {
        this.setState({ srightWidth: this.refs['sright'].clientWidth });

    }
    fireData(){
   Object.values(this.refs).forEach(it=>{
       it.fireData();
   })

    }
 render() {
var props=this.props;

        return (


            <div>
{this.props.Dashboard.filters.map(item=>{
  
  return <FilterElement fire={this.fireData}  ref={'p'+item.tName+item.name} obj={item}  {...props}></FilterElement>
        

})}

            </div>
           
        )
    }
    remove(id) {
        this.props.actions.removeObjectFromDashboard(id);
    }

    update(obj){
        this.props.actions.updateObjectsOfDashboard(obj);
        
            }
   
 
    componentDidMount(){
     
      }
pinToworkboard(){
var self=this;

var object=[];
Object.values(self.props.objectList).map((itm)=>{
    var multiGridConfiguration={
        "configuration" : {
            "export" : false,
            "modalView" : false,
            "schedule" : false,
            "title" : "CSO Detailed Savings"
        },
        "height" : "22",
        "itemType" : "",
        "type" : "multi-grid-element",
        "width" : "48",
        "x" : "0",
        "y" : "0"
    }
    var item=Object.assign({},itm);
   var aa= Object.assign({},multiGridConfiguration);
   aa.configuration.title=item.title;
   aa.x=item.position.x;
   aa.y=item.position.y;
   aa.height=item.position.h;
   aa.width=item.position.w;

var obj={"uniqueid":item.id,"name":item.title ,"multigridConfiguration":aa,"objectConfiguration":{x:0,y:0,height:item.position.h-3,width:48,configuration:item.configuration,type:'chart-element',name:item.title,listeners:['pTemp']},"logic":{ "datasourceName":self.props.DataSources[0].dbName , "query":btoa(item.sql)} ,"type":"sql"}


if(item.businessLogicId){
    obj['businessLogicId']=item.businessLogicId;
    
    }
    if(item.bussinessObjectId){
        obj['bussinessObjectId']=item.bussinessObjectId;
        
        }
        
    if(item.multigridId){
        obj['multigridId']=item.multigridId;
        
        }


   object.push(Object.assign({},obj))   

})


var f={ 
    "configuration":JSON.stringify(self.props.workboardConfig),
  "name":self.props.workboardConfig.name,
  "repositoryId":262,
  "objects":object,
    "connectionId":self.props.selectedDs[0]
    
}
if(self.props.workboardConfig.id){
f['workboardId']=self.props.workboardConfig.id;

}
self.props.actions.pinToWorkboard(f ,self,'')

}

    toggleLeftPanel = (e) => {
        this.refs['sleft'].style.width == "" ? this.refs['sleft'].style.width = "0px" : this.refs['sleft'].style.width == "0px" ? this.refs['sleft'].style.width = "240px" : this.refs['sleft'].style.width == "240px" ? this.refs['sleft'].style.width = "0px" : this.refs['sleft'].style.width = "240px"
        this.setState({ srightWidth: this.refs['sright'].clientWidth });
    }
}


// const mapDispatchToProps = (dispatch) => {
//     return {
//         actions: bindActionCreators({
//        //    addWorkboard,saveWorkboardValues,
//          //    addObjectToDashboard,removeObjectFromDashboard,updateObjectsOfDashboard,pinToWorkboard
//         }, dispatch)
//     }
// }
// const mapStateToProps = (state) => {
//     return {
//         list: state.SavedObjects,
//         objectList: state.SavedDashboardObjects,
//         workboardConfig:state.WorkboardList,
//         selectedDs:state.Tables.selectedDs,
//         DataSource:state.DataSources,
//         Dashboard:state.Dashboard,
//         Join:state.Join,
//         Parameters:state.Parameters,

//     }
// }

export default (FilterPanel);
