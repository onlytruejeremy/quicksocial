import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card, Button, Fade, Form } from "react-bootstrap";
import NewsModal from "./NewsModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TopNews = (props) => {
  const [arts, setArts] = useState([]);
  const [singleArtData, setSingleArtData] = useState("");
  const newsUrl = "https://www.reddit.com/r/usnews.json?limit=5";
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetch(newsUrl)
      .then((response) => response.json())
      .then((data) => setArts(dataHandler(data)));
  }, []);
  const dataHandler = (data) => {
    return data.data.children.map((item, index) => {
      let title = item.data.title;
      let url = item.data.url;
      let preview = item.data.preview?.images[0].source.url.replace("amp;", "");
      let altImg =
        "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
      let src = item.data.domain;
      let artId = `t3_${item.data.id}`;
      if (!url.includes("reddit")) {
        return (
          <Fade key={index} id={artId} in appear>
            <Card
              className="bg-dark text-light m-5"
              style={{ minHeight: "30vh", minWidth: "300px" }}
            >
              <Card.Img
                className="border border-white"
                src={preview || altImg}
              />
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Button variant="outline-secondary" name={url} onClick={toArt}>
                  View Article
                </Button>
              </Card.Body>
              <Card.Footer>
                <Card.Text className="text-left text-primary">{src}</Card.Text>
              </Card.Footer>
            </Card>
          </Fade>
        );
      }
    });
  };
  const toArt = (e) => {
    e.preventDefault();
    let link = e.target.name;
    setSingleArtData(link);
    setShowModal(true);
  };
  const modalChange = (e) => {
    setShowModal(false);
  };
  const fetchNext = (e) => {
    e.preventDefault();
    const size = arts.length;
    const currentLast = arts[size - 1];
    if (!shouldSearch) {
      fetch(
        `https://www.reddit.com/r/usnews.json?limit=5&after=${currentLast?.props.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setArts(dataHandler(data));
        });
    } else {
      fetch(
        `https://www.reddit.com/r/usnews/search.json?q=${search}&limit=5&after=${currentLast.props.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setArts(dataHandler(data));
        });
    }
    window.scrollTo({
      top: 100,
      behavior: "smooth",
    });
  };
  const fetchPrev = (e) => {
    e.preventDefault();
    const first = arts[1];
    if (!shouldSearch) {
      fetch(
        `https://www.reddit.com/r/usnews.json?limit=5&before=${first?.props.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.data.children[1]) {
            toast.info("Beginning of News!");
          } else {
            setArts(dataHandler(data));
          }
        });
    } else {
      fetch(
        `https://www.reddit.com/r/usnews/search.json?q=${search}&limit=5&before=${first.props.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.data.children[1]) {
            toast.info("Beginning of News!");
          } else {
            setArts(dataHandler(data));
          }
        });
    }
    window.scrollTo({
      top: 100,
      behavior: "smooth",
    });
  };
  const [search, setSearch] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);
  const searchNews = (e) => {
    e.preventDefault();
    if (search === "") {
      toast.info("Need A Search Term To Search");
    } else {
      fetch(`https://www.reddit.com/r/usnews/search.json?limit=5&q=${search}`)
        .then((res) => res.json())
        .then((res) => {
          let data = res;

          setArts(dataHandler(data));
        });
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    setShouldSearch(true);
  };
  return (
    <>
      <Container>
        <Form
          className="d-inline-flex flex-nowrap mt-5 w-75"
          onSubmit={searchNews}
        >
          <Form.Control
            type="text"
            name="search"
            value={search}
            onChange={handleChange}
            placeholder="Search"
            className="mr-sm-2"
          />
          <Button variant="outline-dark" type="submit">
            Search
          </Button>
        </Form>
        {showModal ? (
          <NewsModal artInfo={singleArtData} display={modalChange} />
        ) : (
          ""
        )}
        {arts}
        <ToastContainer />
      </Container>
      {arts.length > 0 ? (
        <Container className="p-1">
          <Card className="w-50 mx-auto p-1 bg-dark border-light m-5">
            <Card.Body className="d-flex flex-row mx-auto wrap-nowrap">
              <Button
                className="mx-5"
                variant="outline-light"
                onClick={fetchPrev}
              >
                Prev
              </Button>
              <Button
                className="mx-5"
                variant="outline-light"
                onClick={fetchNext}
              >
                Next
              </Button>
            </Card.Body>
          </Card>
        </Container>
      ) : (
        ""
      )}
    </>
  );
};
export default TopNews;
