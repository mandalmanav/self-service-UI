const SelectedColumns  = (state=[],action) =>{
    switch (action.type) {
        case 'ADD_TO_COLUMN':
            return [...state,action.payLoad]
        case 'REM_FROM_COLS':
            return state.filter((item)=>
                item != action.payLoad
            )

        default:
            return state
    }
}
export default SelectedColumns;