import React from "react";
import { Card, Button, Form, Collapse } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as userService from "../../services/users";
const RegisterForm = (props) => {
  const registerSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Must be at least three characters")
      .max(20, "Max of twenty characters")
      .required("First Name Is Required"),
    lastName: Yup.string()
      .min(3, "Must be at least three characters")
      .max(20, "Max of twenty characters")
      .required("Last Name Is Required"),
    email: Yup.string()
      .email("Must be an email")
      .min(3, "Must be at least three characters")
      .max(40, "Max of forty characters")
      .required("Email Is Required"),
    password: Yup.string()
      .min(3, "Must be at least three characters")
      .max(20, "Max of twenty characters")
      .required("Password Is Required"),
    confirmPassword: Yup.string()
      .min(3, "Must be at least three characters")
      .max(20, "Max of twenty characters")
      .required("Confirm Password Is Required"),
  });
  const registerFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      if (values.password === values.confirmPassword) {
        try {
          const data = await userService.addUser(values);
          console.log(data);
          if (data.data == "User Exists") {
            toast.warn("Account With That Email Exists");
          } else {
            toast.info("Registered, Sign In Please");
            props.swapForm();
          }
        } catch (error) {
          toast.warn(error);
        }
      } else {
        toast.warn("Passwords Must Match");
      }
    },
  });
  return (
    <Collapse in appear>
      <Card className="bg-dark text-secondary mt-5 border border-primary text-left">
        <Card.Body>
          <Card.Title className="text-center text-white">Register</Card.Title>
          <Form onSubmit={registerFormik.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.firstName}
                type="text"
                placeholder="First Name"
              />
              <span className="text-danger">
                {registerFormik.errors.firstName}
              </span>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.lastName}
                type="text"
                placeholder="Last Name"
              />
              <span className="text-danger">
                {registerFormik.errors.lastName}
              </span>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.email}
                type="email"
                placeholder="Enter email"
              />
              <span className="text-danger">{registerFormik.errors.email}</span>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.password}
                type="password"
                placeholder="Password"
              />
              <span className="text-danger">
                {registerFormik.errors.password}
              </span>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label> Confirm Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.confirmPassword}
                type="password"
                placeholder="Password"
              />
              <span className="text-danger">
                {registerFormik.errors.confirmPassword}
              </span>
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
        <ToastContainer />
      </Card>
    </Collapse>
  );
};

export default RegisterForm;
