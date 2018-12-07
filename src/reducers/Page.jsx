
export default function reducer(state={loaded:true},action){
    switch(action.type){
            
        
        case 'Page_Loaded':{ 
         
            return {...state,loaded:action.payload}
                            }
        break;
    }
    return state;
}