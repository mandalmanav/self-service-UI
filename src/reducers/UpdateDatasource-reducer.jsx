const initialState={
};
export default function updateDatasourceReducer(state=initialState,action){
    switch(action.type){
        case 'UPDATE_DATASOURCE': return action.payload;
        case 'ADD_DATASOURCE': return action.payload;
        break;
    }
    return state;
}
