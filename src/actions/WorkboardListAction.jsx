import axios from "axios";
import {message,notification} from 'antd';
import makeRequest from './../utilities/MakeRequest';


export function fetchAllWorkboard(obj,root,path=""){
    
    return (dispatch) => {
        dispatch({type: "WORKBOARD_LIST_LOADER",payload:false})
     
        axios({
            method: 'post',
            url: "../../"+"api/"+"self/getWorkboardList",
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
            
           
      
               
               response.data.status.code === "200" ? dispatch({type: "WORKBOARD_LIST",payload:response.data.data}) : null
               response.data.status.code === "400" ? message.error('Required parameter cound not be null') : null
               response.data.status.code === "500" ? message.error('Failed-to-connect') : null
            }).catch(() =>        dispatch({type: "WORKBOARD_LIST",payload:[]}));

        
            axios({
            method: 'post',
            url: "../../"+"api/"+"self/getRepositoryList",
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
            
        
         root.setState({"RepositoryList":response.data.data });
            
               
               response.data.status.code === "200" ? {} : null
               response.data.status.code === "400" ? message.error('Required parameter cound not be null') : null
               response.data.status.code === "500" ? message.error('Failed-to-connect') : null
            })

                
           .catch(() =>     {}  );
    };

}
export function saveWorkboardValues(obj){
    
        

return {type:"SAVE_WORKBOARD_VALUES",payLoad:obj}
   
}


export function addWorkboard(obj,root,path=""){
    
    return (dispatch) => {
     
     
          
          
          makeRequest.post('self/addNewWorkboard',{data:obj}).then((response) => {
            
           
          if(response.data.status.code === "200"){

            dispatch({type: "SAVE_WORKBOARD_VALUES",payLoad:{id:response.data.data.id}})
 root.pinToworkboard(response.data.data.id)
              
          }
            
               
            })

                
           .catch(() =>        dispatch({type: "ADD_WORKBOARD_TO_LIST",payload:[]}));
    };

}

export function pinToWorkboard(obj,root,path="",callback){
     
   
    return (dispatch) => {
     
          makeRequest.post('self/pinToWorkboardnew',{data:obj}).then(callback)

                
           .catch(() =>       {});
    };

}


