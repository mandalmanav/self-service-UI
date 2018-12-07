
const savedObjects = (state = {}, action) => {
    switch (action.type) {

        case 'UPDATE_SO':
            let s = state;

            s[action.payLoad.id] = Object.assign(s[action.payLoad.id]||{},action.payLoad)
            return Object.assign({},s)
            break;
        default:
            return state
    }
}
export default savedObjects;