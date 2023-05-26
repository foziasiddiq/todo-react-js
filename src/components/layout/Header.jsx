import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Logo from './../../assets/images/logo.png'

const Header = () => {
	return (
		<Navbar
			bg="dark"
			className="d-flex justify-content-between border-bottom border-dark"
		>
			<Container>
				<Navbar.Brand href="#" className="display-3 fw-bold text-light">
					<img
						alt=""
						src={Logo}
						width="30"
						height="25"
						className="d-inline-block align-top me-2"
					/>{' '}
					TODO App
				</Navbar.Brand>
			</Container>
		</Navbar>
	)
}

export default Header
