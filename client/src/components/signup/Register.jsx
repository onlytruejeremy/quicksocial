import React, { useState } from "react";
import { Container, Button, Fade } from "react-bootstrap";
import RegisterForm from "./RegisterForm";
import SignInForm from "./SignInForm";
const Register = (props) => {
  const [formSwap, setFormSwap] = useState(true);
  const swapForm = (e) => {
    e.preventDefault();
    setFormSwap(!formSwap);
  };
  const newSwap = () => {
    setFormSwap(!formSwap);
  };
  return (
    <Container>
      {formSwap ? (
        <Fade in appear>
          <Button variant="outline-dark" onClick={swapForm} className="mt-5">
            Register
          </Button>
        </Fade>
      ) : (
        <Fade in appear>
          <Button variant="outline-dark" onClick={swapForm} className="mt-5">
            Sign In
          </Button>
        </Fade>
      )}
      {formSwap ? <SignInForm /> : <RegisterForm swapForm={newSwap} />}
    </Container>
  );
};

export default Register;
