import axios from 'axios';
import {message} from 'antd';
import makeRequest from '../utilities/MakeRequest';

/*export   function updateDatasource(updatesource){
    return{
        type : UPDATE_DATASOURCE,
        payload: updatesource.datasource
      }
        
}*/

export function addSelfService(obj,root){
  debugger;
         return (dispatch) => {
      
        axios({
            method: 'post',
            url: "../../"+"api/"+"self/addSelfServiceObject",
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
                dispatch({type: "ADD_SELFSERIVCE",payload:response.data.data})
               root.props.history.push(root.props.url+"/MetaDataCreation")
            } 
                response.data.status.code === "400" ? message.error('Required parameter cound not be null') : null
                response.data.status.code === "500" ? message.error('Failed-to-connect') : null
             
         
              
            })
           // .then((response) => response.json())
           .catch(() =>        dispatch({type: "ADD_SELFSERIVCE",payload:[]}));
    };
   
    
    
  
        
}
export function deleteSelfService(){
    return {
        type : "DELETE_SELFSERIVCE",
        payload: []
      }
        
}

export function fetchAllSelfService(){
    return (dispatch) => {
       
        
          makeRequest.post('self/getDataSourceList',{data:{}}).then((response) => {
               response.data.status.code === "200"? dispatch({type: "FETCH_ALL_SELFSERIVCE",payload:response.data.data}):null
               response.data.status.code === "400" ? message.error('Required parameter cound not be null') : null
               response.data.status.code === "500" ? message.error('Failed-to-connect') : null
              
            })
           .catch(() =>        dispatch({type: "FETCH_ALL_SELFSERIVCE",payload:[]}));
    };

}
export function fetchSelfService(obj){
  
        
    return (dispatch) => {
    
        axios({
            method: 'post',
            url: "../../"+"api/"+"self/getConnectionDetails",
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
            
                response.data.status.code === "200" ?dispatch({type: "FETCH_SELFSERIVCE",payload:response.data}) :null
                response.data.status.code === "400" ? message.error('Required parameter cound not be null') : null
                response.data.status.code === "500" ? message.error('Failed-to-connect') : null
        
              
            })
          
           .catch(() =>        dispatch({type: "FETCH_SELFSERIVCE",payload:[{"name":"dasdsad"},{"name":"1qqqq"}]}));
    };
        
}
export function selectSelfService(obj){
    return {
        type : "SELECT_SELFSERIVCE",
        payload: obj
      }
        
}