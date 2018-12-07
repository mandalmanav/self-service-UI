export default function reducer(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;
        case 'ITEMS_IS_LOADING':
            return action.isLoading;
        case 'ITEMS_FETCH_DATA_SUCCESS': 
            return action.items
        default:
            return state;
    }
}