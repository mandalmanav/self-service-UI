
const savedDashboardObjects = (state =  {}, action) => {
    switch (action.type) {
       case 'REMOVE_SDO':{
      var a=state;
    
   delete a[action.payLoad];
  
   return Object.assign({}, a);
       }

       break;
        case 'UPDATE_SDO':{
var a=Object.assign({}, state);

   a[action.payLoad.id]=Object.assign(  a[action.payLoad.id]?a[action.payLoad.id]:{}, action.payLoad) ;
            return a;
        }
           
break;
case 'UPDATE_SDOS':{
    var a=Object.assign( state, action.payLoad);
    
                return a;
            }
               
    break;

        default:
            return state
    }
}
export default savedDashboardObjects;