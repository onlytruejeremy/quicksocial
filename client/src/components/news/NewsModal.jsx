import React, { useState, useEffect } from "react";

import { Modal, Button } from "react-bootstrap";

const NewsModal = (props) => {
  const [show, setShow] = useState(true);
  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      setShow(!show);
    }
    setShow(!show);
  };

  useEffect(() => {
    if (show == false) {
      props.display();
    }
  }, [show]);
  const openFull = (e) => {
    e.preventDefault();
    window.open(props.artInfo);
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header className="bg-dark text-white">
        <Modal.Title>Article</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <p className="text-center bg-light">
          <iframe
            is="x-frame-bypass"
            src={props.artInfo}
            title="Article Iframe"
            style={{ height: "70vh", width: "100%" }}
            className="bg-white text-white"
          ></iframe>
        </p>
      </Modal.Body>
      <Modal.Footer className="bg-dark">
        <Button
          variant="outline-warning"
          className="mr-auto"
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          variant="outline-primary"
          className="ml-auto"
          onClick={openFull}
        >
          Go To Site
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewsModal;
