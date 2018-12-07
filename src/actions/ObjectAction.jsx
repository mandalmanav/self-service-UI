import axios from "axios";
import {itemsIsLoading, itemsFetchDataSuccess,itemsHasErrored } from '../actions/Item.jsx';
import makeRequest from './../utilities/MakeRequest';

export function addObject(obj,root,path=""){
   
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        axios({
            method: 'post',
            url: '../../'+"api/"+"self/addBusinessObject",
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
                // if (response.status.code!== 200) {
                //     throw Error(response.status.value);
                // }

                dispatch(itemsIsLoading(false));

       console.log(response.data.data.id);
           
     root.setState({object:{id:response.data.data.id}})
        })
           .catch(() =>    {}   );
    };

}



export function addData(obj,root,path=""){
    obj["businessobject_name"]="SELF_SERVICE_PREPARE_QUERY";
  
    return (dispatch) => {
   
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
                // if (response.status.code!== 200) {
                //     throw Error(response.status.value);
                // }


            
          var a=  {"version":{"name":"vanilla","version":"10.0.1"},"status":{"code":"200","value":"success"},"data":{"result":{"queryInfo":{"totalRows":10,"type":"selected"},"resultSet":[[1,"0-30 Days",1],[1,"30-60 Days",1],[1,"60-90 Days",1],[1,"91+ Days",1],[1,"CURRENT",1],[2,"0-30 Days",2],[2,"30-60 Days",2],[2,"60-90 Days",2],[2,"91+ Days",2],[2,"CURRENT",2]],"metaData":[{"colIndex":0,"colType":"Integer","colName":"sk_tenant"},{"colIndex":1,"colType":"String","colName":"bucket"},{"colIndex":2,"colType":"Integer","colName":"sk_tenant_1"}],"responseStatus":[]}},"error":false};
            
            root.setState({configuration:root.props.configuration})
            root.setState({data:response.data.data.data.result.resultSet})
  //     console.log(response.data.data.id);
           
//     root.setState({object:{id:response.data.data.id}})
        })
           .catch(() =>    {}   );
    };

}



export function addObjectToDashboard(obj){


return {type:"UPDATE_SDO",payLoad:obj}

}
export function updateObjectsOfDashboard(obj){


    return {type:"UPDATE_SDOS",payLoad:obj}
    
    }




export function removeObjectFromDashboard(id){


    return {type:"REMOVE_SDO",payLoad:id}
    
    }
export function updateConfiguration(obj,root,path=""){
  
    return (dispatch) => {
   
        axios({
            method: 'post',
            url: '../../'+"api/"+"self/updateBusinessObject",
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
            debugger;
       })
           .catch(() =>    {}   );
    };

}

