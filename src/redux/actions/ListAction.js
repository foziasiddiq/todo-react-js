export const addListItem = (listItem) => {
	return {
		type: 'ADD_LIST_ITEM',
		payload: listItem,
	}
}

export const updateListItem = (listItem) => {
	return {
		type: 'UPDATE_LIST_ITEM',
		payload: listItem,
	}
}

export const deleteListItem = (listItemId) => {
	return {
		type: 'DELETE_LIST_ITEM',
		payload: listItemId,
	}
}

export const fetchListData = () => {
	const sortList = (tasks) => {
		const completedTaskList = []
		const pendingTaskList = []

		tasks.forEach((task) => {
			task.status === 'completed'
				? completedTaskList.push(task)
				: pendingTaskList.push(task)
		})
		return [...pendingTaskList, ...completedTaskList]
	}

	return (dispatch) => {
		fetch('/task-list.json')
			.then((response) => response.json())
			.then((data) => {
				const transformedData = sortList(data)
				dispatch({
					type: 'FETCH_LIST_ITEM',
					payload: transformedData,
				})
			})
			.catch((error) => {
				dispatch({ type: 'FETCH_DATA_ERROR', payload: error.message })
			})
	}
}
