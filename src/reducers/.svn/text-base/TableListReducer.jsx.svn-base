export default function reducer(state={"list":[],"selected":[],loaded:false},action){
    switch(action.type){
            
        case 'UPDATE_TABLE':{
            
            return{
                ...state,
                loaded:true
            } 
                                 
                                 }
    
        case 'EMPTY_TABLES':{
            
            return action.payload
                                 
                                 }
        case 'FETCH_TABLES':{
            
            return action.payload
                                 
                                 }
        case 'FETCH_ALL_TABLES':{
            
            
     
            
            return  {...state,list:action.payload,loaded:true
                    }
                                 }
    
        
        case 'SELECT_TABLES':{ 
           
            return {...state,selected:action.payload
                   }
                            }
            
        break;
    }
    return state;
}
