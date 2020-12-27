import React from "react";
import { Card, Button } from "react-bootstrap";

const PostCard = (props) => {
  const editPost = (e) => {
    e.preventDefault();
    alert("Edit Post");
  };
  return (
    <Card className="w-100 mt-5 mb-5 bg-dark text-white">
      {props.img && (
        <Card.Img
          className={`p-2 border border-light`}
          src={props.img}
          style={{ maxHeight: "300px", objectFit: "contain" }}
        />
      )}
      <Card.Body>
        <Card.Text>{props.msg}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="outline-light mx-2" disabled onClick={editPost}>
          Edit Post
        </Button>
        <Button variant="outline-light mx-2" disabled>
          Delete Post
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default PostCard;
