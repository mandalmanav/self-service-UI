
export default function reducer(state=window.location.pathname+'/app',action){
    switch(action.type){
            
        
        case 'SET_URL':{ 
            return action.payload;  
        }

       default: break;
       
    } 
    return state;
}

