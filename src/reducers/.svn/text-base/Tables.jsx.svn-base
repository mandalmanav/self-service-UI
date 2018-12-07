const Tables = (state = {
	"selectedDs": [],
	"selectedIds": [],
	"object": {	},
	"array": []
}, action) => {
    switch (action.type) {
        case 'UPDATE_TB_DS':
            return {...state ,selectedDs :action.payLoad}
break;
        
        case 'UPDATE_TB_LIST':
            return {...state ,selectedIds :action.payLoad}
break;

case 'UPDATE_TB_ARRAY':
return {...state ,array :action.payLoad}
break;

case 'UPDATE_TB_OBJECT':
return {...state ,object :action.payLoad}
break;
default:
            return state;
    }
}
export default Tables;