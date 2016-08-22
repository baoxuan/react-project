import {CHANGE_TYPE,
		SELECT_PAY_TYPE_LOG,
		SELECT_PAY_TYPE} from '../constants';

const initialState = {
		type:"",
		paytypelog:-1,
		paytypelogText:"全部操作",
		paytype:-2,
		paytypeText:"全部产品"
	}

export default function changeType(state = initialState, action){
	switch(action.type){
		case CHANGE_TYPE:
			return Object.assign({}, state, {
				type:action.value
			})
		case SELECT_PAY_TYPE_LOG:
			return Object.assign({}, state, {
				paytypelogText:action.name,
				paytypelog:action.value,
				type:""
			})
		case SELECT_PAY_TYPE:
			return Object.assign({}, state, {
				paytypeText:action.name,
				paytype:action.value,
				type:""
			})
		default:
		 return state
	}

}

