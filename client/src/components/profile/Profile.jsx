import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Container, Col, Row, Card, Button, Form } from "react-bootstrap";
import MyPosts from "../posts/MyPosts";
import { AuthContext } from "../../context/Auth";
import Dash from "../dash/Dash";

const Profile = (props) => {
  const history = useHistory();
  const buttonHandler = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case "news":
        history.push("/news");
        break;
      case "posts":
        alert("posts");
        history.push("/posts");
        break;
      default:
        break;
    }
  };
  const { currentUser } = React.useContext(AuthContext);

  return (
    <Container className="mt-5 mx-auto">
      <Row>
        <Col md={4} className="mt-5 mb-5 mr-auto">
          <Card className="bg-dark border border-light text-light">
            <Card.Header className="m-3 p-1">
              <i className="fas fa-user fa-10x text-light"></i>
              <Card.Text className="m-1 p-2">
                {currentUser.firstName} {currentUser.lastName}
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <Button
                  className="m-1 w-100"
                  name="add"
                  variant="outline-light"
                  onClick={buttonHandler}
                  disabled
                >
                  <i className="fas fa-plus">
                    <small className="p-2">Add</small>
                  </i>
                </Button>
                <Button
                  className="m-1 w-100"
                  name="message"
                  variant="outline-light"
                  onClick={buttonHandler}
                  disabled
                >
                  <i className="fas fa-envelope">
                    <small className="p-2">Message</small>
                  </i>
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Dash />
      </Row>
      <MyPosts />
    </Container>
  );
};

export default withRouter(Profile);
