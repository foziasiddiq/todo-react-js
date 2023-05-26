import React from 'react'
import { Badge } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ToggleButton from 'react-bootstrap/ToggleButton'
import { FaCheck, FaChevronDown, FaPen, FaTrashAlt, FaStar, FaRegStar } from 'react-icons/fa'

const CustomAccordianHeader = ({ children, eventKey }) => {
	const decoratedOnClick = useAccordionButton(eventKey, () => console.log())

	return (
		<button
			type="button"
			className="bg-dark border-0 text-secondary w-100"
			onClick={decoratedOnClick}
		>
			{children}
		</button>
	)
}
const Task = (props) => {
	return (
		<>
			{props.data?.map((item, index) => (
				<Accordion key={item.id} defaultActiveKey={index}>
					<Card
						className={`bg-dark-1 text-secondary border-secondary rounded-0 ${
							index + 1 !== props.data.length ? 'border-bottom-0' : ''
						}  ${item.status === 'completed' ? 'task-completed' : ''}`}
					>
						<Card.Header className="bg-dark">
							<CustomAccordianHeader eventKey="0">
								<div className="row  align-items-center">
									<div className={`col-7 bg-dark fw-bolder text-secondary-light d-flex justify-content-start text-start ${item.status === 'completed' ? 'task-completed' : ''}`}>
										{item.title}
									</div>
									<div className="m-auto col-3">
										{item.priority === 'high' ? (
											<Badge bg="outline-danger" className="fw-normal w-80">
												High
											</Badge>
										) : item.priority === 'low' ? (
											<Badge bg="outline-success" className="fw-normal w-80">
												Low
											</Badge>
										) : item.priority === 'medium' ? (
											<Badge bg="outline-warning" className="fw-normal w-80">
												Medium
											</Badge>
										) : null}
									</div>
									<div className="col-2 d-flex gap-3">
										<div className="ms-auto">
											<FaChevronDown />
										</div>
										<div className="favorite-icon" onClick={(e) => props.handleFavoriteToggle(e, item.id)}>
											{item.isFavorite ? <FaStar className='fs-3 text-warning' /> : <FaRegStar className='fs-3' />}
										</div>
										<ToggleButton
											className="me-0 btn-sm ms-3"
											type="checkbox"
											variant="outline-success"
											value="1"
											checked={item.status === 'completed'}
											name={item.status}
											onChange={(e) => props.handleItemStatus(e, item.id)}
											id={`reverse-checkbox-${item.id}`}
										>
											{item.status === 'completed' ? (
												<FaCheck />
											) : (
												<FaCheck className="text-dark" />
											)}
										</ToggleButton>
									</div>
								</div>
							</CustomAccordianHeader>
						</Card.Header>
						<Accordion.Collapse eventKey="0">
							<Card.Body className="border-top border-secondary">
								<div className="d-flex align-items-center mb-3">
									<div className="text-right fw-bold">Description:</div>
									<div className="text-muted small ms-auto m-2">
										{item.date}
									</div>
									<Button
										variant="link"
										className={`p-0  ${
											item.status === 'completed' ? 'd-none' : ''
										}`}
										onClick={() => props.handleCanvasShow(item.id)}
									>
										<FaPen className="text-warning m-2" />
									</Button>
									<FaTrashAlt
										className="text-danger m-2"
										onClick={() => {
											props.handleShow()
											props.setdeleteItemId(item.id)
										}}
									/>
								</div>
								<div>{item.description}</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
			))}
		</>
	)
}

export default Task
