import React from "react";
import { Card, Container } from "react-bootstrap";
import { AuthContext } from "../../context/Auth";
import * as postService from "../../services/posts";
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
      .getMyPosts(this.context.currentUser.userId)
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
        />
      );
    });
  };
  addCard = (data) => {
    let cardInfo = data;
    const carded = (cardInfo) => {
      return (
        <PostCard
          img={cardInfo.imageUrl}
          msg={cardInfo.message}
          id={cardInfo.postId}
          user={cardInfo.userId}
          key={cardInfo.postId}
        />
      );
    };
    const justPosts = Object.assign([], this.state.cards);
    justPosts.unshift(carded(cardInfo));
    this.setState({ cards: justPosts });
  };
  render() {
    return (
      <Container>
        <Posts newCard={this.addCard} />
        {this.state.cards}
      </Container>
    );
  }
}

export default MyPosts;
