const datasources = (state = [
    ], action) => {
    switch (action.type) {
        
        case 'UPDATE_DS':
            return action.payLoad

        default:
            return state
    }
}
export default datasources;