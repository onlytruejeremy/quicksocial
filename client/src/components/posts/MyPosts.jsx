import React from "react";
import { Card, Container, Toast } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
          remove={this.removePost}
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

  removePost = async (id) => {
    let arr = Object.assign([], this.state.cards);
    let index;
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (element.props.id === id) {
        index = i;
      }
    }
    let removed = arr.splice(index, 1);
    let res = await postService.deletePost({ postId: removed[0].props.id });
    if (res.data == "Post Deleted") {
      this.setState({ cards: arr });
      toast.success("Removed Posts");
    } else {
      toast.error("Could Not Remove");
    }
  };
  render() {
    return (
      <Container>
        <Posts newCard={this.addCard} />
        {this.state.cards}
        <ToastContainer />
      </Container>
    );
  }
}

export default withRouter(MyPosts);
