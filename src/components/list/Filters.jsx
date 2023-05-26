import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';
import ToggleButton from 'react-bootstrap/ToggleButton'

const Filters = ({ handleFilterChange, filters }) => {
    console.log('component filters', filters)
    return (
        <div className='mb-3 border border-secondary py-3 px-2'>
            <h4 className='text-light'>Filters:</h4>
            <div className='d-flex gap-3 text-secondary'>
                <div>
                    <Form.Label>Status:</Form.Label>
                    <Form.Select name="status" className='bg-dark-1 border-dark-1 text-secondary rounded-0' onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </Form.Select>
                </div>
                <div>
                    <Form.Label>Priority:</Form.Label>
                    <Form.Select name="priority" className='bg-dark-1 border-dark-1 text-secondary rounded-0' onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </Form.Select>
                </div>
                <div>
                    <Form.Label>Favorite:</Form.Label>
                    <Form.Select name="favorite" className='bg-dark-1 border-dark-1 text-secondary rounded-0' onChange={handleFilterChange}>
                        <option value="all">All</option>
                        <option value={true}>Favorite</option>
                        <option value={false}>Not Favorite</option>
                    </Form.Select>
                </div>
                <div className='ms-auto'>
                    <Form.Label>Search:</Form.Label>
                    <Form.Control type="text" className='bg-dark-1 border-dark-1 text-secondary rounded-0' placeholder='Search here' name="search" onChange={handleFilterChange} />
                </div>
            </div>
        </div>
    );
};

export default Filters;
