import React from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as postService from "../../services/posts";
import { AuthContext } from "../../context/Auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Posts = (props) => {
  const { currentUser } = React.useContext(AuthContext);
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
      message: "",
      imageUrl: null,
    },
    validationSchema: postSchema,
    onSubmit: async (values) => {
      // userId
      let payload = {
        userId: currentUser.userId,
        message: values.message,
        imageUrl: values.imageUrl == "" ? null : values.imageUrl,
      };
      try {
        const data = await postService.newPost(payload);
        toast.success(data.data);
        if (data.data) {
          props.newCard(payload);
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });
  const [imageField, setImageField] = React.useState(false);
  const showImage = (e) => {
    e.preventDefault();
    setImageField(!imageField);
  };

  return (
    <>
      <Row>
        <Col md={12} className="mx-auto mb-5">
          <Card className="bg-dark border border-light text-light">
            <Card.Header>
              <Card.Text>Ready to share something?</Card.Text>
            </Card.Header>
            <Card.Body>
              <Card className="bg-dark border border-secondary">
                <Card.Body>
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
                  </Card.Text>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
        <ToastContainer />
      </Row>
    </>
  );
};

export default Posts;
