import axios from "axios";
import {message} from 'antd';

export function updateColumns(obj,root,path="",selectedList){
    obj["businessobject_name"]="SELF_SERVICE_UPDATE_COLUMN_LIST_1";
        
    return (dispatch) => {
            dispatch({type: "Page_Loaded",payload:false})
       
        axios({
            method: 'post',
            url: '../../'+"api/"+"self/kettle-service",
            contentType:"application/json",
            data:JSON.stringify({data:obj}),
            async: true,
            dataType: 'json',
            headers:{
                "Accept-Language": sessionStorage.getItem('locale') || 'en',
	            "authorization":'bearer '+sessionStorage.getItem('accessToken'),
	            "content-type": "application/json"
            },
          }).then((response) => {
                
                dispatch({type: "SELECT_COLUMNS",payload:selectedList})
           dispatch({type: "SELECT_COLUMNS_OBJ",payload:root.props.list})
               dispatch({type: "Page_Loaded",payload:true})
    
            response.data.status.code === "200" ? root.props.history.push(root.props.url+"/SelectedTable") : null
            response.data.status.code === "400" ? message.error('Required parameter cound not be null') : null
            response.data.status.code === "500" ? message.error('Failed-to-connect') : null
        })
           .catch(() =>        dispatch({type: "SELECT_COLUMNS",payload:[]}));
    };

}
export function updateJoin(obj,root,path=""){
    obj["businessobject_name"]="SELF_SERVICE_UPDATE_JOINLIST_1";
   
    return (dispatch) => {
               dispatch({type: "Page_Loaded",payload:false})
     
        axios({
            method: 'post',
            url: "../../"+"api/"+"self/kettle-service",
            contentType:"application/json",
            data:JSON.stringify({data:obj}),
            async: true,
            dataType: 'json',
            headers:{
                "Accept-Language": sessionStorage.getItem('locale') || 'en',
	            "authorization":'bearer '+sessionStorage.getItem('accessToken'),
	            "content-type": "application/json"
            },
          }).then((response) => {
            
          if(response.data.status.code === "200"){
                     dispatch({type: "Page_Loaded",payload:true})
     
            root.props.history.push(root.props.url+"/PivotTable");
            dispatch({type: "UPDATE_JOIN",payload:{}})
          }
            
            response.data.status.code === 400 ? message.error('Required parameter cound not be null') : null
            response.data.status.code === 500 ? message.error('Failed-to-connect') : null
        
        })
           .catch(() =>        dispatch({type: "UPDATE_JOIN",payload:[]}));
    };

}
export function emptyTables(){
    return {
        type : "EMPTY_TABLES",
        payload: []
      }
        
}
export function fetchTables(obj){
  
        
            return function(dispatch) {
        
    
     axios.post("/")
      .then((response) => {
         
       dispatch({type: "FETCH_TABLES",payload:response});   
        response.data.status.code === 400 ? message.error('Required parameter cound not be null') : null
        response.data.status.code === 500 ? message.error('Failed-to-connect') : null
         
      })
      .catch((err) => {
    //    dispatch({type: "FETCH_REJECTED", payload: err})
      })
  }
        
}
export function selectTable(obj){
    return {
        type : "SELECT_TABLES",
        payload: obj
      }
        
}

export function fetchAllColumns(obj,root,path=""){
    obj["businessobject_name"]="SELF_SERVICE_GET_COLUMN_LIST_1";
    
    return (dispatch) => {
        dispatch({type: "Column_Loader",payload:false})
     
        axios({
            method: 'post',
            url: "../../"+"api/"+"self/kettle-service",
            contentType:"application/json",
            data:JSON.stringify({data:obj}),
            async: true,
            dataType: 'json',
            headers:{
                "Accept-Language": sessionStorage.getItem('locale') || 'en',
	            "authorization":'bearer '+sessionStorage.getItem('accessToken'),
	            "content-type": "application/json"
            },
          }).then((response) => {
            
           
            
           var temp1= response.data.data.data[Object.keys(response.data.data.data)[0]].resultSet.map(item=>  {return{TablePhysicalName:item[1],TableBusinessName:item[2],ColumnPhysicalName:item[3],ColumnBusinessName:item[3],TypeofField:item[4],DataType:item[5]}})
           
           var a={};
 for(var aa of temp1){
if(!a.hasOwnProperty(aa.TablePhysicalName)){
a[aa.TablePhysicalName]={key:aa.TablePhysicalName,title:aa.TableBusinessName,children:[{title:aa.ColumnBusinessName,key:aa.ColumnPhysicalName,TypeofField:aa.TypeofField,DataType:aa.DataType}]}
}else{
    
    a[aa.TablePhysicalName].children.push({title:aa.ColumnBusinessName,key:aa.ColumnPhysicalName,TypeofField:aa.TypeofField,DataType:aa.DataType})
}}
            root.state.list=Object.values(a);        
   
root.setState({columnView:true});
            
               
               response.data.status.code === "200" ? dispatch({type: "FETCH_ALL_COLUMNS",payload:temp1}) : null
               response.data.status.code === "400" ? message.error('Required parameter cound not be null') : null
               response.data.status.code === "500" ? message.error('Failed-to-connect') : null
            })

                
           .catch(() =>        dispatch({type: "FETCH_ALL_COLUMNS",payload:[]}));
    };

}

