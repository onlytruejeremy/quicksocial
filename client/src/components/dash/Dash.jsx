import React from "react";

import { Col, Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
const Dash = (props) => {
  const history = useHistory();

  const buttonHandler = (e) => {
    e.preventDefault();
    history.push(`${e.target.getAttribute("name")}`);
  };
  return (
    <Col md={props.size ? props.size : 8} className="mt-5 mb-5 mx-auto">
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
                name="profile"
                onClick={buttonHandler}
              >
                <i className="fas fa-home" name="profile">
                  <small className="p-2" name="profile">
                    My Profile
                  </small>
                </i>
              </Button>
              <Button
                className="m-1"
                variant="outline-light w-75"
                name="posts"
                onClick={buttonHandler}
              >
                <i className="fas fa-edit" name="posts">
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
                <i className="fas fa-newspaper" name="news">
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
                <i className="fas fa-user" name="friends">
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
                <i className="fas fa-envelope" name="messages">
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
  );
};

export default Dash;
