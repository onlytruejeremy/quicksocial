import React from "react";
import { Card, Container, Toast } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/Auth";
import * as postService from "../../services/posts";
import Dash from "../dash/Dash";
import PostCard from "./PostCard";
import Posts from "./Posts";
class MyPosts extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      postData: [],
    };
  }
  componentDidMount() {
    postService
      .getAllPosts()
      .then((res) => {
        this.setState({ cards: this.cards(res.data) });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  cards = (data) => {
    return data.map((post) => {
      return (
        <PostCard
          img={post.imageUrl}
          msg={post.message}
          id={post.postId}
          user={post.userId}
          key={post.postId}
          firstName={post.firstName}
          lastName={post.lastName}
        />
      );
    });
  };

  addCard = (data) => {
    let cardInfo = data;
    const newCard = (cardInfo) => {
      return (
        <PostCard
          img={cardInfo.imageUrl}
          msg={cardInfo.message}
          id={cardInfo.postId}
          user={cardInfo.userId}
          key={cardInfo.postId}
          remove={this.removePost}
        />
      );
    };
    const newPosts = Object.assign([], this.state.cards);
    newPosts.unshift(newCard(cardInfo));
    this.setState({ cards: newPosts });
  };
  render() {
    return (
      <Container className="m-5 mx-auto">
        <Dash size={12} />
        <Posts newCard={this.addCard} />
        {this.state.cards}
        <ToastContainer />
      </Container>
    );
  }
}

export default MyPosts;
