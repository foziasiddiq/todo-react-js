const initialState = {
	todoList: [],
}

const ListReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_LIST_ITEM':
			return {
				...state,
				todoList: [action.payload, ...state.todoList],
			}
		case 'DELETE_LIST_ITEM':
			return {
				...state,
				todoList: state.todoList.filter(
					(todoItem) => todoItem.id !== action.payload
				),
			}
		case 'FETCH_LIST_ITEM':
			return {
				...state,
				todoList: action.payload,
			}
		case 'UPDATE_LIST_ITEM':
			return {
				...state,
				todoList: action.payload,
			}
		default:
			return state
	}
}

export default ListReducer
