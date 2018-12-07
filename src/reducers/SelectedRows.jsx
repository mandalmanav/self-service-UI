const SelectedRows  = (state=[],action) =>{
    switch (action.type) {
        case 'ADD_TO_ROW':
            return [...state,action.payLoad]
        case 'REM_FROM_ROWS':
            return state.filter((item)=>
                item != action.payLoad
            )
        default:
            return state
    }
}
export default SelectedRows;

