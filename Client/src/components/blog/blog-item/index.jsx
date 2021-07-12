import React, { Component } from "react";
import { Card } from "react-bootstrap";
import BlogAuthor from "../blog-author/index-blogitem.jsx";
import { Link } from "react-router-dom";
import "./styles.css";
export default class BlogItem extends Component {

  state = {
    title: "",
    category: "",
    cover: "",
    author: "",
    _id: "",
    content: "",
  }


  render() {
    const { title, category, cover, author, _id, content, } = this.props;

    console.log({...this.props.author})

    return (
      <Link to={`/blogs/${_id}`} className="blog-link">
        <Card className="blog-card">
          <Card.Img variant="top" src={this.props.cover} className="blog-cover" />
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <BlogAuthor {...this.props.author} />
          </Card.Footer>
        </Card>
      </Link>
    );
  }
}
