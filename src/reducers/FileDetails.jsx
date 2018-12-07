const FileDetails = (state = {}, action) => {
    switch (action.type) {
        case 'SET_FILENAME':
            return action.payLoad
            default:
            return state
    }
}   

export default FileDetails