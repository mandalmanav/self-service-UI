
export default function reducer(state = {
	"allowDrag": false,
	"allowResize": false,
	"name": "New Dashboard",
	"currentSelection": 2,
	"description": {
		"text": ""
	},
	"firefilter": true,
	"meta": {
		"animation": "",
		"isTicker": true,
		"text": ""
	},
	"parameters": {
		"pTemp": {
			"isDirty": 1,
			"isVisible": 1,
			"name": "dhgjhfs",
			"value": ["All"],
			"show": ["All"]

		}
	},
	"thumbnailImage": ""
}, action) {
	switch (action.type) {

		case 'WORKBOARD_LIST': {

			return { ...state, list: action.payload, loaded: true };

		}
		case 'ADD_WORKBOARD_TO_LIST': {

			//   return {...state,list:action.payload ,loaded:true };

		}
		case 'WORKBOARD_LIST_LOADER': {

			return { ...state, loaded: false }
		}
		case 'SAVE_WORKBOARD_VALUES': {
			var a = Object.assign({}, state);
			a[action.payLoad.key] = action.payLoad.value;

			return a;

		}
			break;
	}

	return state;
}

