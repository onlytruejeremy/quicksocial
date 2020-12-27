import React from "react";

import {
  Jumbotron,
  Button,
  CardDeck,
  Card,
  Container,
  CardColumns,
  Alert,
  Row,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
const Main = (props) => {
  const history = useHistory();
  const pageChange = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case "home":
        history.push("/");
        break;
      case "posts":
        history.push("/posts");
        break;
      case "login":
        history.push("/login");
        break;
      case "news":
        history.push("/news");
        break;
      case "connections":
        history.push("/profile");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Container>
        <Jumbotron className="my-5 bg-dark text-white border">
          <h1 className=" m-5">Welcome to Quick Social!</h1>
          <hr />
          <p className="p-5 text-info">
            The simple social media site designed for people who are constantly
            on the go and just want to be able to quickly communicate with
            friends or co-workers.
          </p>
          <p>
            <Button
              variant="outline-light"
              name="connections"
              onClick={pageChange}
              className="mx-auto m-3 p-3"
            >
              Get Started!
            </Button>
          </p>
        </Jumbotron>
        <CardDeck>
          <CardColumns className="mx-auto m-5 d-flex flex-wrap flex-wrap">
            <Card
              className="bg-dark text-info mt-5 w-100 border border-light"
              style={{ minWidth: "200px", maxHeight: "400px" }}
            >
              <Card.Body>
                <Card.Title className="text-light">News Bites</Card.Title>
                <Card.Text className="p-2">
                  Get quick updates about what is going in the world!
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="outline-light"
                  name="news"
                  onClick={pageChange}
                  className="mx-auto m-3"
                >
                  News
                </Button>
              </Card.Footer>
            </Card>
            <Card
              className="bg-dark text-info mt-5 w-100 border border-light"
              style={{ minWidth: "200px", maxHeight: "400px" }}
            >
              <Card.Body>
                <Card.Title className="text-light">Connections</Card.Title>
                <Card.Text className="p-2">
                  Maintain relationships with the people you know!
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="outline-light"
                  name="connections"
                  onClick={pageChange}
                  className="mx-auto m-3"
                >
                  Profile
                </Button>
              </Card.Footer>
            </Card>
            <Card
              className="bg-dark text-info mt-5 w-100 border border-light"
              style={{ minWidth: "200px", maxHeight: "400px" }}
            >
              <Card.Body>
                <Card.Title className="text-light">Posts</Card.Title>
                <Card.Text className="p-2">
                  Stay up to date with what is happening in everyone's lives!
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="outline-light"
                  name="posts"
                  onClick={pageChange}
                  className="mx-auto m-3"
                >
                  Posts
                </Button>
              </Card.Footer>
            </Card>
          </CardColumns>
        </CardDeck>
        <Row className="ml-1 mr-1 mt-5 mb-5 w-100 mx-auto">
          <Card className="bg-dark text-warning mx-auto w-100">
            <Card.Header>
              <h3>Under Development</h3>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <h4 className="mr-auto text-left">What works?</h4>
                <p className="mr-auto text-left">
                  Currently you can register, make posts on your page and view
                  the news!
                </p>
                <h4 className="mr-auto text-left">Next Update</h4>
                <p className="mr-auto text-left">Adding Friends</p>
                <p className="mr-auto text-left">Post Features</p>
                <p className="mr-auto text-left">Login Persistence</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
};
export default Main;
