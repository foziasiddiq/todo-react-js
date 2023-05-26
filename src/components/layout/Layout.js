import React from 'react'
import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }) => {
	return (
		<div className="bg-dark text-light h-100">
			<Header />
			{children}
			<Footer />
		</div>
	)
}

export default Layout
