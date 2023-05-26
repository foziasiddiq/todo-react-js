import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Todo App. All rights reserved.
            </p>
            <p className="mb-0">
              Designed with <FaHeart className="text-danger" /> by Fozia Saddique
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
