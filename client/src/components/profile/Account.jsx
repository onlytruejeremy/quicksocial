import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const Account = (props) => {
  return (
    <Container className="m-5 mx-auto">
      <Form className="text-left p-5 bg-dark text-secondary border border-success">
        <h3 className="text-center">Account Info</h3>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            disabled
            name="firstName"
            type="text"
            placeholder="First Name"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            disabled
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            disabled
            name="email"
            type="email"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control disabled type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control disabled type="password" placeholder="Password" />
        </Form.Group>
        <p className="text-center">
          <Button disabled variant="outline-success" type="submit">
            Update Account Info
          </Button>
        </p>
      </Form>
    </Container>
  );
};

export default Account;
