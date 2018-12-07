
export default function reducer(state={"metaName":"","list":[],"selected":{},"loaded":false},action){
    switch(action.type){
            
       
        case 'DELETE_SELFSERIVCE':{
            
            return action.payload
                                 
                                 }
        case 'UPDATE_SELFSERIVCE':{
            
            return action.payload
                                 
                                 }
    
        case 'NAME_META':{ 
            return {  ...state,
          metaName: action.payload
                
            }
            
            
                            }
        case 'SELECT_SELFSERIVCE':{ 
    let  a=   state.list .filter(value =>
    value.id ==  action.payload
  );
          
            return {  ...state,
          selected: a[0]
                
            }
            
            
                            }
        case 'FETCH_SELFSERIVCE':{ 
            
            return action.payload
            
                            }
        case 'FETCH_ALL_SELFSERIVCE':{ 
         
           return  {
          ...state,
          list: action.payload
        }                       
            
                            }
            case 'ADD_SELFSERIVCE':{ 
              const a=state.list.concat(action.payload);
             
           return  {
          ...state,
          list: a,
          selected:action.payload,
          loaded:true
               
        }    
         //   return action.payload
            
                            }
        break;
    }
    return state;
}
