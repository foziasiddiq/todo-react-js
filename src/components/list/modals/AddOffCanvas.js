import React from 'react'
import { Badge } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Offcanvas from 'react-bootstrap/Offcanvas'

const AddOffCanvas = (props) => {
	return (
		<>
			<Offcanvas.Header
				closeButton
				closeVariant="white"
				className="border-0 text-info border-bottom border-dark-1 py-1"
			>
				<Offcanvas.Title>Task Title</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Form>
					<Badge bg="outline-danger" className="w-100 text-center py-2 mb-3">
						{props.error}
					</Badge>
					<Form.Group className="mb-3 h-100" controlId="title">
						<Form.Label>
							Title <span className="text-danger">*</span>
						</Form.Label>
						<Form.Control
							value={props.newItem.title ?? ''}
							type="text"
							className={`bg-dark text-light ${
								props.error !== '' ? 'border-danger' : 'border-dark-1'
							}`}
							placeholder="Task title"
							onChange={(e) => {
								props.handleChange({
									target: { name: 'title', value: e.target.value },
								})
							}}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="description">
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							value={props.newItem.description ?? ''}
							className="bg-dark text-light border-dark-1"
							rows={10}
							placeholder="Write task description"
							onChange={(e) => {
								props.handleChange({
									target: { name: 'description', value: e.target.value },
								})
							}}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="priority">
						<Form.Label>priority</Form.Label>
						<Form.Select
							aria-label="Default select"
							className="bg-dark text-light border-dark-1"
							value={props.newItem.priority ?? 'high'}
							onChange={(e) => {
								props.handleChange({
									target: { name: 'priority', value: e.target.value },
								})
							}}
						>
							<option value="high">High</option>
							<option value="medium">
								Medium
							</option>
							<option value="low">Low</option>
						</Form.Select>
					</Form.Group>
					<Form.Group className="mb-3 mt-auto text-end" controlId="button">
						<Button
							variant="dark"
							className="border-0 me-3 rounded-0"
							onClick={props.handleCanvasClose}
						>
							Close
						</Button>
						<Button
							variant="success"
							className="border-0 rounded-0"
							onClick={() => props.handleSubmit()}
						>
							Save
						</Button>
					</Form.Group>
				</Form>
			</Offcanvas.Body>
		</>
	)
}

export default AddOffCanvas
