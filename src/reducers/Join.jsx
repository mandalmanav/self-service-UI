const JOIN = (state =  [], action) => {
    switch (action.type) {
        case 'UPDATE_JOIN':
            return action.payload;
break;
        default:
            return state
    }
}
export default JOIN;