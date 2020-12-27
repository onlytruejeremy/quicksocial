import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import * as postService from "../../services/posts";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/Auth";
const PostCard = (props) => {
  const deletePost = (e) => {
    e.preventDefault();
    props.remove(props.id);
  };
  const [showForm, setShowForm] = React.useState(false);
  const revealForm = (e) => {
    e.preventDefault();
    setShowForm(!showForm);
  };

  const [imageField, setImageField] = React.useState(false);
  const showImage = (e) => {
    e.preventDefault();
    setImageField(!imageField);
  };

  const postSchema = Yup.object().shape({
    message: Yup.string()
      .min(10, "At least 10 characters")
      .max(255, "Max is 255")
      .required(),
    imageUrl: Yup.string()
      .min(10, "At least 10 characters")
      .max(255, "Max is 255")
      .nullable(),
  });
  const postFormik = useFormik({
    initialValues: {
      message: props.msg,
      imageUrl: props.img,
    },
    validationSchema: postSchema,
    onSubmit: async (values) => {
      alert("clicked");
      let payload = {
        postId: props.id,
        message: values.message,
        imageUrl: values.imageUrl == "" ? null : values.imageUrl,
      };
      try {
        const data = await postService.editPost(payload);
        if (data.data == "Edited Post") {
          toast.success("Post Edited");
          setUpdatedImg(values.imageUrl);
          setUpdatedMessage(values.message);
          setShowForm(!showForm);
        } else {
          toast.error("Could Not Edit");
        }
      } catch (error) {
        toast.error("Could Not Edit");
      }
    },
  });

  const [updatedImg, setUpdatedImg] = React.useState(null);
  const [updatedMessage, setUpdatedMessage] = React.useState(null);
  const { currentUser } = React.useContext(AuthContext);
  //editPost
  return (
    <>
      <Card className="w-100 mt-5 mb-5 bg-dark text-white">
        <Card.Img
          className={`p-2`}
          src={updatedImg ? updatedImg : props.img}
          style={{ maxHeight: "300px", objectFit: "contain" }}
        />
        <Card.Body>
          <Card.Text>{updatedMessage ? updatedMessage : props.msg}</Card.Text>
          {showForm ? (
            <Card.Text>
              <Form onSubmit={postFormik.handleSubmit}>
                <Form.Group>
                  <Form.Control
                    name="message"
                    onChange={postFormik.handleChange}
                    value={postFormik.values.message}
                    type="text"
                    placeholder="Thoughts?"
                  />
                  <span className="text-danger">
                    {postFormik.errors.message}
                  </span>
                </Form.Group>
                {imageField ? (
                  <Form.Group>
                    <Form.Control
                      name="imageUrl"
                      onChange={postFormik.handleChange}
                      value={postFormik.values.imageUrl}
                      type="text"
                      placeholder="Url"
                    />
                    <span className="text-danger">
                      {postFormik.errors.imageUrl}
                    </span>
                  </Form.Group>
                ) : (
                  ""
                )}
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Image?"
                    onClick={showImage}
                  />
                </Form.Group>
                <Button
                  variant="outline-primary"
                  className="w-100"
                  type="submit"
                >
                  Post
                </Button>
              </Form>
              <Button
                variant="outline-warning mx-auto mt-2 w-100"
                onClick={revealForm}
              >
                Cancel
              </Button>
            </Card.Text>
          ) : (
            ""
          )}
        </Card.Body>
        {currentUser.userId == props.user && (
          <Card.Footer>
            {showForm ? (
              ""
            ) : (
              <>
                <Button variant="outline-light mx-2" onClick={revealForm}>
                  Edit Post
                </Button>
                <Button variant="outline-danger mx-2" onClick={deletePost}>
                  Delete Post
                </Button>
              </>
            )}
          </Card.Footer>
        )}
        {props.id ? (
          ""
        ) : (
          <Card.Footer className="mr-auto">Posted Just Now</Card.Footer>
        )}
      </Card>
      <ToastContainer />
    </>
  );
};

export default PostCard;
