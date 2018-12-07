export default function reducer(state={"list":[],"selected":[],selectedObj:[],loaded:false},action){
    switch(action.type){
            
          case 'UPDATE_COLUMNS':{
            
            return state;
                                 
                                 }
            case 'UPDATE_JOIN':{
            
            return state;
                                 
                                 }
                case 'SELECT_COLUMNS_OBJ':{
            
            return {
                ...state,
                selectedObj:action.payload,
                loaded:true
                    }
                                 
                                 }
            
    
        case 'EMPTY_COLUMNS':{
            
            return action.payload
                                 
                                 }
        case 'FETCH_COLUMNS':{
            
            return action.payload
                                 
                                 }
        case 'FETCH_ALL_COLUMNS':{
          
            
     
            
            return  {...state,list:action.payload,loaded:true
                    }
                                 }
        case 'Column_Loader':{
            
            return { ...state,loaded:false }
        }    
    
        
        case 'SELECT_COLUMNS':{ 
         
            return {...state,selected:action.payload,loaded:true
                   }
                            }
        break;
    }
    return state;
}
