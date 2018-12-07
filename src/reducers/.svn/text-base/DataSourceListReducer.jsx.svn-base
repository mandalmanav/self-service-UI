
export default function reducer(state={"list":[],"selected":{},"loaded":false},action){
    switch(action.type){
            
         case 'DELETE_DATASOURCE':{
            
            return action.payload
                                 
                                 }
        case 'ADD_DATASOURCE':{
              const a=state.list.concat(action.payload);
                
           return  {
          ...state,
          list: a,seleted:action.payload,
          loaded: true
               
        }    
                                 
                                 }
        case 'FETCH_DATASOURCE':{
            
            return action.payload
                                 
                                 }
        case 'FETCH_ALL_DATASOURCE':{
            
         const a=state.list.concat(action.payload)
           return  {
            ...state,
            list: a,
            loaded:true
        }                       
                                 }
    
        case 'SELECT_DATASOURCE':{ 
            var b=state.list.filter(val=> val.id==action.payload)
     
            return  {
          ...state,
          selected: b[0]
        }
            
                            }
        break;
    }
    return state;
}
