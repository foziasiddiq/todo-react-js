import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { CgDanger } from 'react-icons/cg'

const DeleteModal = (props) => {
	return (
		<Modal.Body className="bg-dark-1 text-center pt-5 text-secondary border-dark-1 border rounded-0">
			<CgDanger className="display-1 mb-5" />
			<h4 className="mb-3">Are you sure ?</h4>
			<p className="mb-3">
				This action is irreversible. Are you sure to perform this action?
			</p>
			<div>
				<Button
					variant="dark"
					className="border-0 me-3 rounded-0"
					onClick={props.handleClose}
				>
					Close
				</Button>
				<Button
					variant="danger"
					className="border-0 rounded-0"
					onClick={() => props.handleDelete()}
				>
					Delete
				</Button>
			</div>
		</Modal.Body>
	)
}

export default DeleteModal
