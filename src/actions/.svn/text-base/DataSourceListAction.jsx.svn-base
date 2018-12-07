import axios from 'axios';
import {message} from 'antd';
import makeRequest from './../utilities/MakeRequest';

export function addDatasource(obj,self){
         return (dispatch) => {
       
            makeRequest.post('self/getDataSourceDetails',{data:obj}).then((response) => {
       dispatch({type: "NAME_META",payload:obj.metaDataName})
            function aa(obj,d){
      
            //  self.props.actions.fetchDatasource(obj,d)  
            function aaa(b,self){
                dispatch({type: "UPDATE_DS",payLoad:[b.data]})
                dispatch({type:'UPDATE_TB_DS',payLoad:[b.data.conId]})
             
                var tables={};
                [b.data].map((item)=>{
                     
                    return item.tables.map((item_drill0)=>{
                         
                        item_drill0['dbId']=item.id;
                        item_drill0['dbName']=item.name;
                        item_drill0['dbAlias']=item.alias;
                         return  tables[item_drill0.id]=item_drill0;  
                                                         
                     
                         
                     })
                         
                  
                     
                     
                     
                     })[0]
                dispatch({type: "UPDATE_TB_OBJECT",payLoad:tables})
                
                self.props.history.push("/JointPanel")
               
               }




aaa(obj,self)



            }
                response.data.status.code === "200" ?aa(response.data,self) : null
                response.data.status.code === "400" ? message.error('Required parameter cound not be null') : null
                response.data.status.code === "500" ? message.error('Failed-to-connect') : null
 
              
            })
           // .then((response) => response.json())
           .catch(() =>        dispatch({type: "ADD_DATASOURCE",payload:[]}));
    };
        
}
export function testDatasource(obj){
         return (dispatch) => {
            obj["test"]=1;
           makeRequest.post('self/addConnection',{data:obj}).then((response) => {
              
                response.data.status.code === "200" ? message.success('Connection Successful') : null
                response.data.status.code === "400" ? message.error('Required parameter cound not be null') : null
                response.data.status.code === "500" ? message.error('Failed-to-connect') : null
            })
          
           .catch(() =>        dispatch({type: "TEST_DATASOURCE",payload:[]}));
    };
   
    
    
  
        
}
export function deleteDatasource(){
    return {
        type : "DELETE_DATASOURCE",
        payload: []
      }
        
}

export function fetchAllDatasource(){
    return (dispatch) => {

       
          
          makeRequest.post('self/getConnectionList',{data:{}}).then((response) => {

                response.data.status.code === "200" ? dispatch({type: "FETCH_ALL_DATASOURCE",payload:response.data.data}): null
                response.data.status.code === "400" ? message.error('Required parameter cound not be null') : null
                response.data.status.code === "500" ? message.error('Failed-to-connect') : null
            })
           .catch(() =>        dispatch({type: "FETCH_ALL_DATASOURCE",payload:[]}));
    };

}
export function fetchDatasource(obj,self){
        
    return (dispatch) => {

        makeRequest.post('self/getDataSourceDetails',{data:obj}).then((response) => {
             
               function aa(b,self){
                dispatch({type: "UPDATE_DS",payLoad:[b.data]})
                dispatch({type:'UPDATE_TB_DS',payLoad:[b.data.conId]})
              var tables={};
                [b.data].map((item)=>{
                     
                    return item.tables.map((item_drill0)=>{
                         
                        item_drill0['dbId']=item.id;
                        item_drill0['dbName']=item.name;
                        item_drill0['dbAlias']=item.alias;
                         return  tables[item_drill0.id]=item_drill0;  
                                                         
                     
                         
                     })
                         
                  
                     
                     
                     
                     })[0]
                dispatch({type: "UPDATE_TB_OBJECT",payLoad:tables})
                
               // self.props.history.push("/JointPanel")
               
               }
                response.data.status.code === "200" ? aa(response.data,self) : null
                response.data.status.code === "400" ? message.error('Required parameter cound not be null') : null
                response.data.status.code === "500" ? message.error('Failed-to-connect') : null
        
            })
          
           .catch(() =>        dispatch({type: "FETCH_DATASOURCE",payload:[]}));
    };
        
}
export function selectDatasource(id){
   
    
    return {
        type : "SELECT_DATASOURCE",
        payload: id
      }
        
}
export function fetchDatasourceById(obj,self){
    return (dispatch) => {

        function aa(b,self){
            dispatch({type: "UPDATE_DS",payLoad:[b.data]})
            dispatch({type:'UPDATE_TB_DS',payLoad:[b.data.conId]})
             
            var tables={};
            [b.data].map((item)=>{
                 
                return item.tables.map((item_drill0)=>{
                     
                    item_drill0['dbId']=item.id;
                    item_drill0['dbName']=item.name;
                    item_drill0['dbAlias']=item.alias;
                     return  tables[item_drill0.id]=item_drill0;  
                                                     
                 
                     
                 })
                     
              
                 
                 
                 
                 })[0]
            dispatch({type: "UPDATE_TB_OBJECT",payLoad:tables})
            
           self.props.history.push("/JointPanel")
           
           }
          
          makeRequest.post('self/getDataSourcedetailsById',{data:obj}).then((response) => {

                response.data.status.code === "200" ? aa(response.data,self): null
                response.data.status.code === "400" ? message.error('Required parameter cound not be null') : null
                response.data.status.code === "500" ? message.error('Failed-to-connect') : null
            })
           .catch(() =>        dispatch({type: "FETCH_ALL_DATASOURCE",payload:[]}));
    };

}