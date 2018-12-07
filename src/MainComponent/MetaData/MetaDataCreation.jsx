import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import "babel-polyfill";
import { Transfer, Button ,Spin } from 'antd';
import {bindActionCreators} from 'redux';
import {fetchAllTable,updateTables ,selectTable} from '../../actions/TableListAction.jsx';
import {fetchAllColumns} from '../../actions/ColumnListAction.jsx';
import {addSelfService} from '../../actions/SelfServiceObjectListAction.jsx';


class MetaDataCreation extends React.Component {
  state = {
    mockData: [],
    targetKeys: [],
      columnView:false,
      list:[]
  }
  componentDidMount() {
            // this.props.actions.addSelfService({"ConnectionId":this.props.SelectedDataSource.id,"Objectame":this.props.SelectMetaName},this)
 
      this.props.actions.fetchAllTable({"serviceId":this.props.SelectedServiceObject.id,"params":{ "SCHEMA_NAME":[this.props.SelectedDataSource.url.split('/').reverse()[0].split('?')[0]]}},this,"../")
     // this.getMock();
  }
fetchColumns =()=>{
    var obj=[]
 
     for( var a of this.props.TableListSelected)
     {
        
         obj.push(a.PhysicalName);
     } 
     this.props.actions.fetchAllColumns({"serviceId":this.props.SelectedServiceObject.id,"params":{"pIsDisplayedTableList":obj, "SCHEMA_NAME":[this.props.SelectedDataSource.url.split('/').reverse()[0].split('?')[0]]}},this,"../")
   
    
}
  getMock = () => {
    const mockData = [
      {
      title: 'FirstComponent Select Over Here',
      key: '0-0',
      },{
      title: '0-1',
      key: '0-1',
      },{
        title: '0-2',
        key: '0-2',
      }];
     
    const targetKeys = [];
    this.setState({ mockData, targetKeys });
  }

  handleChange = (targetKeys) => {
   
    this.setState({ targetKeys });
  }
  setSelectedTables=()=>{
    //e.preventDefault();
    document.body.classList.add('sidebar-hidden');
     var objArray=[]
      var obj=[];
      for (var chr of this.state.targetKeys) {
          objArray.push({PhysicalName:chr,TableBusinessName:chr});
  obj.push(chr);
}
     
      
     this.props.actions.selectTable(objArray); 
     this.props.actions.updateTables({"serviceId":this.props.SelectedServiceObject.id,"params":{"pBusinessName":obj,"pIsDisplayedTableList":obj, "SCHEMA_NAME":[this.props.SelectedDataSource.url.split('/').reverse()[0].split('?')[0]]}},this,"../")
  }

  render() {
    return (
        <div>
     
        </div>
    );
  }
}

const mapDispatchToProps=(dispatch)=>{
    
     return {
         actions: bindActionCreators({
             fetchAllTable,updateTables,selectTable,fetchAllColumns,addSelfService
         },dispatch)
     }
}
const mapStateToProps=(state)=>{
    return {
      url:state.url,
      SelectedDataSource:state.DataSourceList.selected,
      SelectedServiceObject:state.SelfServiceObjectList.selected,
      SelectMetaName:state.SelfServiceObjectList.metaName,
      TableList:state.TableList.list,  
    PageLoader : state.Page.loaded,
        
    ColumnListLoader : state.ColumnList.loaded,
      TableListLoader: state.TableList.loaded,
      TableListSelected:state.TableList.selected   
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(MetaDataCreation);
