import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Table } from 'antd';

import dimImage from '../../assets/images/dim.png'
import measImage from '../../assets/images/meas.png'
import ReactTable from "react-table";
import "react-table/react-table.css";


class TableVisualization extends React.Component {

  
    render() {
        var columns=[];
        var data=[];
        this.props.data.metaData.forEach((e)=>{
            
            columns.push({
        title: e.colName,
        accessor:String(e.colIndex),
            Header: ()=>{ return<div style={{
                fontSize: "12px",
                fontWeight: "bold",
                height: "24px",
                display:"flex",
                alignItems: "center",

            }}><span> 
                    <img src={["integer", "int", "bigint unsigned", "smallint", "tinyint", "mediumint", "bigint", "decimal", "numeric", "float", "double"].indexOf(e.colType.toLowerCase())>-1?measImage:dimImage  } style={{marginRight:'4px'}} />
                    </span>

                    <span>{e.colName} </span></div> },
        dataIndex: e.colName,
        key: e.colIndex,
        width: 100,
       
    })
            
            
        })  
    
var root=this;
          this.props.data.resultSet.forEach((e,i)=>{
           var aa={}
         
           columns.forEach((a,ii)=>{
          aa[a.key]=e[ii];
        })
aa['key']=i;
        data.push(aa);

            })

        
        
    return (
       
     <ReactTable
                columns={columns}
                data={data}
               
                style={{
                    height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
                  }}
                  showPagination={false}
               
                
            />
           
    );
  }
}


const mapDispatchToProps=(dispatch)=>{
    
     return {
        actions: bindActionCreators({
      //    addData,updateConfiguration
         },dispatch)
     }
}
const mapStateToProps=(state)=>{
    return {
    //    SelectedDataSource:state.DataSourceList.selected,
    //  SelectedServiceObject:state.SelfServiceObjectList.selected,
      //  url:state.url
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(TableVisualization);


