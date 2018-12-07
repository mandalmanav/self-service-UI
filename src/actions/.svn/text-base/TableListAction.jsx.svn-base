import axios from "axios";
import {message} from 'antd';
import makeRequest from './../utilities/MakeRequest';

export function updateTables(obj,root,path=""){
    obj["businessobject_name"]="SELF_SERVICE_UPDATE_TABLE_LIST_1";
    return (dispatch) => {
     makeRequest.post('self/kettle-service',{data:obj}).then((response) => {
            
             if(response.data.status.code ==="200"){
                dispatch({type: "UPDATE_TABLE",payload:{}})
                root.fetchColumns();
             }          
               response.data.status.code === 400 ? message.error('Required parameter cound not be null') : null
               response.data.status.code === 500 ? message.error('Failed-to-connect') : null
        
        })
           .catch(() =>        dispatch({type: "UPDATE_TABLE",payload:[]}));
    };

}
export function emptyTables(){
    return {
        type : "EMPTY_TABLES",
        payload: []
      }
        
}
export function joinsAction(obj,self){
    return (dispatch) => {
        
        
        
        dispatch({type: "UPDATE_JOIN",payload:obj})



var obj1={


    "connectionId":self.props.selectedDs[0],
    "dims": [  
        {
    
            "tId":"users",
            "tName":"users",
            "cId":"*",
            "cName":"*",
            "cAlias":"*",
            "isDerived":false,
            "calculation":"",
            "isTransformed":false,
            "agg":""
        }
    ],
    limit:self.state.largeTableLimit,
    "meas":[ ],
    "conditions":[],
    "Filters":[ ],
    "joins":obj
}  

self.props.actions.fetchAllTable(obj1,self)
}
}
export function fetchTables(obj,selected,mode,limit,self,sh){
  
    var obj1={


        //"connectionId":obj.dbId,
        "connectionId":self.props.selectedDs[0],
     
        "dims": [
            
        ],
        "limit":Number(limit),
        "meas":[ ],
        "conditions":[],
        "Filters":[ ],
        "joins":[]
    }  
    
if(selected=="*"){
    
    obj1.dims=[{
    
        "tId":obj.id,
        "tName":obj.name,
        "cId":"*",
        "cName":"*",
        "cAlias":"*",
        "isDerived":false,
        "calculation":"",
        "isTransformed":false,
        "agg":""
    }]   
}
if(mode=="single"){
    obj1.joins=[]
   
}else{
    obj1.joins=self.props.Join
}



    return (dispatch) => {
    
    
          
          makeRequest.post('queryengine/generateData',{data:obj1}).then((response) => {
          
          if(response.data.hasOwnProperty('data') && response.data.data.hasOwnProperty('metaData')){
            function a(data){
                if(sh){     self.setState({largeTable:data.data});
                self.setState({largeTableActive:true})
           


                }else
                if(mode=="single"){
                    self.setState({singleTable:data.data});
                    self.setState({singleTableActive:true})
                }else{
                 
                    self.setState({largeTable:data.data});
                    self.setState({largeTableActive:true})
                }


            }
            a(response.data)
        }
                response.data.status.code === "200" ? {} : null
                response.data.status.code === "400" ? message.error('Required parameter cound not be null') : null
                response.data.status.code === "500" ? message.error('Failed-to-connect') : null
            })
                
           .catch(() =>        dispatch({type: "FETCH_ALL_TABLES",payload:[]}));
    };
 
}
export function selectTable(obj){
    return {type:"UPDATE_TB_LIST",payLoad:obj}

}

export function fetchAllTable(obj,root){
 
    
    return (dispatch) => {
    
   
          makeRequest.post('queryengine/generateData',{data:obj}).then((response) => {
         
            if(response.data.hasOwnProperty('data') && response.data.data.hasOwnProperty('metaData')){
                function a(data){
                   
                      
                        root.setState({largeTable:data.data});
                    
    
    
                }
                a(response.data)
            }

                response.data.status.code === "200" ? {} : null
                response.data.status.code === "400" ? message.error('Required parameter cound not be null') : null
                response.data.status.code === "500" ? message.error('Failed-to-connect') : null
            })
                
           .catch(() =>        dispatch({type: "FETCH_ALL_TABLES",payload:[]}));
    };

}

