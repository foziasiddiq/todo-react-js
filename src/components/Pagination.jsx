import React from "react";
import { Button } from "react-bootstrap";

const Pagination = ({ itemsPerPage, currentPage, setCurrentPage, filteredTodoList }) => {
    const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const previousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <nav>
            <ul className="pagination my-3">
                <Button
                    className="page-link bg-dark-1 border-dark-1 rounded-0 mx-1"
                    onClick={() => previousPage()}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <Button
                            className="page-link bg-dark-1 border-dark-1 rounded-0 mx-1"
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </Button>
                    </li>
                ))}
                <Button
                    className="page-link bg-dark-1 border-dark-1 rounded-0 mx-1"
                    onClick={() => nextPage()}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </ul>
        </nav>
    );
};

export default Pagination;