import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Container, Col, Row, Card, Button, Form } from "react-bootstrap";
import MyPosts from "../posts/MyPosts";

const Profile = (props) => {
  const history = useHistory();
  const buttonHandler = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case "news":
        history.push("/news");
        break;
      default:
        break;
    }
  };
  return (
    <Container className="mt-5 mx-auto">
      <Row>
        <Col md={4} className="mt-5 mb-5 mr-auto">
          <Card className="bg-dark border border-light text-light">
            <Card.Header className="m-3 p-1">
              <i className="fas fa-user fa-10x text-light"></i>
              <Card.Text className="m-1 p-2">James Smith</Card.Text>
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
        <Col md={8} className="mt-5 mb-5 ml-auto mt-auto">
          <Card className="bg-dark border border-light text-light">
            <Card.Header>
              <Card.Text>Quick Actions</Card.Text>
            </Card.Header>
            <Card.Body>
              <Col>
                <Card.Text>
                  <Button
                    className="m-1"
                    variant="outline-light w-75"
                    name="posts"
                    onClick={buttonHandler}
                    disabled
                  >
                    <i className="fas fa-edit">
                      <small className="p-2" name="posts">
                        All Posts
                      </small>
                    </i>
                  </Button>
                  <Button
                    className="m-1"
                    variant="outline-light w-75"
                    name="news"
                    onClick={buttonHandler}
                  >
                    <i className="fas fa-newspaper">
                      <small className="p-2" name="news">
                        News
                      </small>
                    </i>
                  </Button>
                  <Button
                    className="m-1"
                    variant="outline-light w-75"
                    name="friends"
                    onClick={buttonHandler}
                    disabled
                  >
                    <i className="fas fa-user">
                      <small className="p-2" name="friends">
                        Friends
                      </small>
                    </i>
                  </Button>{" "}
                  <Button
                    className="m-1 w-75"
                    variant="outline-light"
                    name="messages"
                    onClick={buttonHandler}
                    disabled
                  >
                    <i className="fas fa-envelope">
                      <small className="p-2" name="messages">
                        Messages
                      </small>
                    </i>
                  </Button>
                </Card.Text>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <MyPosts />
    </Container>
  );
};

export default withRouter(Profile);
