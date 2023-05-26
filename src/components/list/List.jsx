import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { FaChevronRight, FaPlus, } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux';
import { addListItem, deleteListItem, fetchListData, updateListItem } from '../../redux/actions/ListAction'
import Task from './Task'
import AddOffCanvas from './modals/AddOffCanvas'
import DeleteModal from './modals/DeleteModal'
import './List.css'
import BreadCrumb from './Breadcrumb'
import Filters from './Filters'
import Spinner from 'react-bootstrap/Spinner';
import Pagination from '../Pagination'


const List = () => {
	const todoList = useSelector(state => state.todoList),
		dispatch = useDispatch(),
		[show, setShow] = useState(false),
		itemObj = {
			title: '',
			description: '',
			status: 'pending',
			priority: 'medium',
			isFavorite: false,
			date: '',
		},
		[canvasShow, setCanvasShow] = useState(false),
		[action, setAction] = useState('add'),
		[deleteItemId, setdeleteItemId] = useState(''),
		[newItem, setNewItem] = useState(itemObj),
		handleClose = () => setShow(false),
		handleShow = () => setShow(true),
		[filters, setFilters] = useState({
			status: '',
			priority: '',
			favorite: 'all',
			search: ''
		}),
		[filteredTodoList, setFilteredTodoList] = useState([]),
		[errorMessage, setErrorMessage] = useState(''),
		[currentPage, setCurrentPage] = useState(1),
		[itemsPerPage, setItemsPerPage] = useState(15),
		breadcrumb = [
			{
				name: 'Tasks',
				icon: '',
				link: '#',
				active: false
			},
			{
				name: 'List',
				icon: <FaChevronRight />,
				link: '#',
				active: true
			}
		],
		indexOfLastItem = currentPage * itemsPerPage,
		indexOfFirstItem = indexOfLastItem - itemsPerPage,
		currentItems = filteredTodoList.slice(indexOfFirstItem, indexOfLastItem)

	const handleCanvasClose = () => {
		setErrorMessage('')
		setNewItem(itemObj)
		setAction('add')
		setCanvasShow(false)
	}

	const handleCanvasShow = (id) => {
		setCanvasShow(true);
		setAction(isNaN(id) ? 'add' : 'update');

		if (!isNaN(id)) {
			const task = todoList.find(item => item.id === id);
			task && setNewItem(task);
		}
	};


	useEffect(() => {
		dispatch(fetchListData());
	}, [])

	useEffect(() => {
		if (todoList.length > 0) setFilteredTodoList(todoList)
	}, [todoList])

	const handleChange = (e) => {
		const inputName = e.target.name
		const value = e.target.value
		setNewItem((prevItem) => ({
			...prevItem,
			[inputName]: value,
		}))
	}

	const updateItems = (newData, id) => {
		const taskIndex = newData.findIndex(item => item.id === id);
		console.log('taskIndex', taskIndex)
		if (taskIndex >= 0) {
			const updatedTask = newData[taskIndex];
			newData.splice(taskIndex, 1);
			updatedTask.status === 'pending'
				? newData.unshift(updatedTask)
				: newData.push(updatedTask);
		}

		return newData;
	};


	const handleDelete = () => {
		deleteItemId && dispatch(deleteListItem(deleteItemId));
		handleClose();
	};


	const handleSubmit = () => {
		const emptyRegex = /^\s*$/;
		const numberRegex = /^\d+$/;

		const errorMessage =
			emptyRegex.test(newItem.title)
				? 'Fields with * are required'
				: numberRegex.test(newItem.title)
					? 'Title cannot be a number'
					: '';

		if (errorMessage) {
			setErrorMessage(errorMessage);
			return false;
		}

		setErrorMessage('');

		const updatedItemValues = {
			title: newItem.title,
			description: newItem.description,
			status: newItem.status,
			priority: newItem.priority,
			date: new Date().toLocaleString(),
			isFavorite: newItem.isFavorite,
		};

		const newItems = todoList.map(listItem =>
			listItem.id === newItem.id ? { ...listItem, ...updatedItemValues } : listItem
		);

		if (action === 'add') {
			dispatch(addListItem({
				id: Date.now(),
				...updatedItemValues,
			}));
		} else if (action === 'update') {
			dispatch(updateListItem(newItems));
		}

		handleCanvasClose();
	};


	const handleItemStatus = (e, itemId) => {
		console.log('e', e.target, itemId)
		const { checked } = e.target;

		const newItems = filteredTodoList.map(item =>
			item.id === itemId ? { ...item, status: checked ? 'completed' : 'pending' } : item
		);

		dispatch(updateListItem(updateItems(newItems, itemId)));
	};

	const handleFavoriteToggle = (e, itemId) => {
		e.stopPropagation();
		const newItems = filteredTodoList.map((item) =>
			item.id === itemId ? { ...item, isFavorite: !item.isFavorite } : item
		);
		dispatch(updateListItem(newItems));
	};

	const handleFilterChange = (e) => {
		const { name, value, checked } = e.target;

		setFilters((prevFilters) => {
			const updatedFilters = {
				...prevFilters,
				[name]: name === 'favorite' ? (value === 'true' ? true : (value === 'all' ? 'all' : false)) : value,
			};

			const filteredTodoList = todoList.filter((item) => {
				if (updatedFilters.status && item.status !== updatedFilters.status) {
					return false;
				}
				if (updatedFilters.priority && item.priority !== updatedFilters.priority) {
					return false;
				}
				if (updatedFilters.favorite !== 'all' && item.isFavorite !== updatedFilters.favorite) {
					return false;
				}
				if (updatedFilters.search && !item.title.toLowerCase().includes(updatedFilters.search.toLowerCase())) {
					return false;
				}
				return true;
			});

			setFilteredTodoList(filteredTodoList);
			return updatedFilters;
		});
	};



	return (
		<Container>
			<div className="border border-dark py-5 px-3">
				<h3 className="text-info">Welcome Back !!</h3>
				<div className="my-3 d-flex justify-content-between align-items-center">
					<BreadCrumb breadcrumb={breadcrumb} />
					<div>
						<Button
							variant="outline-info"
							className="border-0 btn-sm me-3 rounded-0"
							onClick={() => handleCanvasShow()}
						>
							<FaPlus />
						</Button>
					</div>
				</div>
				<Filters handleFilterChange={handleFilterChange} filters={filters} />
				<div className={`w-100 text-center my-5 ${filteredTodoList.length > 0 ? 'd-none' : ''}`}>
					<Spinner animation="border" className='m-auto' style={{ width: '50px', height: '50px' }} variant='success' />
				</div>
				<Task
					data={currentItems}
					handleCanvasShow={handleCanvasShow}
					handleItemStatus={handleItemStatus}
					handleShow={handleShow}
					setdeleteItemId={setdeleteItemId}
					handleFavoriteToggle={handleFavoriteToggle}
				/>
				<Pagination
					filteredTodoList={filteredTodoList}
					itemsPerPage={itemsPerPage}
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
				/>
				<Modal show={show} className="" onHide={handleClose}>
					<DeleteModal handleClose={handleClose} handleDelete={handleDelete} />
				</Modal>
				<Offcanvas
					show={canvasShow}
					onHide={handleCanvasClose}
					placement="end"
					name="end"
					className="bg-dark-1 border-dark-1 text-secondary"
				>
					<AddOffCanvas
						error={errorMessage}
						handleSubmit={handleSubmit}
						handleCanvasClose={handleCanvasClose}
						handleChange={handleChange}
						newItem={newItem}
					/>
				</Offcanvas>
			</div>
		</Container>
	)
}


export default List
