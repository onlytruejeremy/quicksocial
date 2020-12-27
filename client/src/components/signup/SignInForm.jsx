import React, { useContext } from "react";
import { Card, Button, Form, Collapse } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as userService from "../../services/users";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

const SignInForm = (props) => {
  const { setCurrentUser, currentUser } = useContext(AuthContext);
  const history = useHistory();
  const registerSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be an email")
      .min(3, "Must be at least three characters")
      .max(40, "Max of forty characters")
      .required("Email Is Required"),
    password: Yup.string().min(3).required("Password Is Required"),
  });
  const SignInFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      userService.loginUser(values).then(async (res) => {
        const userInfo = res.data.accessToken;
        if (userInfo !== null) {
          userService
            .getUserInfo(userInfo)
            .then((res) => {
              setCurrentUser(res.data);
              history.push("/profile");
            })
            .catch((err) => {
              setCurrentUser(null);
            });
        } else {
          setCurrentUser(null);
        }
      });
      setTimeout(() => {
        if (currentUser == null) {
          setErrMessage("Try Different Credentials");
        }
      }, 3000);
    },
  });
  const [errMessage, setErrMessage] = React.useState("");
  return (
    <Collapse in appear>
      <Card className="bg-dark text-secondary mt-5 border border-primary text-left">
        <Card.Body>
          <Card.Title className="text-center text-white">Sign In</Card.Title>
          <Form onSubmit={SignInFormik.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                onChange={SignInFormik.handleChange}
                value={SignInFormik.values.email}
                type="email"
                placeholder="Enter email"
              />
              <span className="text-danger">{SignInFormik.errors.email}</span>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                onChange={SignInFormik.handleChange}
                value={SignInFormik.values.password}
                type="password"
                placeholder="Password"
              />
              <span className="text-danger">
                {SignInFormik.errors.password}
              </span>
              <span className="text-danger">{errMessage}</span>
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

export default SignInForm;
